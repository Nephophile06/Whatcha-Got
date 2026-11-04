#!/usr/bin/env node
/**
 * Design-fidelity capture + diff.
 *
 * Usage:
 *   node scripts/fidelity.mjs <screen> [state] [--phase before|after]
 *
 * Uses the headless Chrome CDP instance on :9224 (launches one if needed),
 * captures the app at 412x917 CSS px / DPR 1, and compares it with the
 * 1236x2751 (3x) Figma PNG from design/screens.
 *
 * Output: design/diff/<screen>/{design,render,diff,side-by-side}.png,
 * metrics.json, rects.json. Status bars are masked (top 44px, bottom 24px).
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import WebSocket from 'ws';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const W = 412;
const H = 917;
const TOP_MASK = 44;
const BOTTOM_MASK = H - 24;
const APPS = {
  onboarding: { route: '/onboarding', design: 'onboarding.png' },
  welcome: { route: '/welcome', design: 'sign-up-selection.png' },
  'create-account': { route: '/create-account', design: 'create-account.png' },
  'account-created': { route: '/account-created', design: 'account-created-successfully.png' },
  login: { route: '/login', design: 'login.png' },
  'forgot-password': { route: '/forgot-password', design: 'forgot-password.png' },
  otp: { route: '/otp', design: 'otp-verification.png' },
  // The error-state export is 1260×2775 (a 4px white margin around the
  // 412×917 frame at 1x); crop 12px on every side before diffing.
  'otp-error': { route: '/otp?state=error', design: 'otp-error-state.png', crop: 4 },
  'home-loading': { route: '/home-loading', design: 'home-loading-state.png' },
  'home-dashboard': { route: '/home-dashboard', design: 'home-dashboard.png' },
  profile: { route: '/profile', design: 'profile.png' },
  'account-settings': { route: '/account-settings', design: 'account-settings.png' },
};

const args = process.argv.slice(2);
const screen = args[0];
const state = args[1] && !args[1].startsWith('--') ? args[1] : '';
const phaseIdx = args.indexOf('--phase');
const phase = phaseIdx >= 0 ? args[phaseIdx + 1] : 'after';
const sizeIdx = args.indexOf('--size');
const size = sizeIdx >= 0 ? args[sizeIdx + 1] : '';
const [capW, capH] = size ? size.split('x').map(Number) : [W, H];

if (!screen || !APPS[screen]) {
  console.error('Usage: node scripts/fidelity.mjs <screen> [state] [--phase before|after]');
  console.error('Screens:', Object.keys(APPS).join(', '));
  process.exit(1);
}

const outDir = path.join(root, 'design', 'diff', screen);
fs.mkdirSync(outDir, { recursive: true });

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function putJson(url) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method: 'PUT' }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ensureChrome() {
  try {
    await getJson('http://127.0.0.1:9224/json/version');
    return;
  } catch {}
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ];
  const chrome = candidates.find((p) => fs.existsSync(p));
  if (!chrome) throw new Error('Chrome not found');
  spawn(chrome, [
    '--headless=new', '--disable-gpu', '--remote-debugging-port=9224',
    '--user-data-dir=' + path.join(root, '.expo', 'chrome-fidelity'),
    '--window-size=' + W + ',' + H, '--force-device-scale-factor=1',
    'about:blank',
  ], { detached: true, stdio: 'ignore' }).unref();
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    try {
      await getJson('http://127.0.0.1:9224/json/version');
      return;
    } catch {}
  }
  throw new Error('Chrome did not start on :9224');
}

async function capture(url, width = W, height = H) {
  const target = await putJson('http://127.0.0.1:9224/json/new?' + encodeURIComponent(url));
  await sleep(1200);
  const ws = new WebSocket(target.webSocketDebuggerUrl, { maxPayload: 64 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.once('open', res); ws.once('error', rej); });
  let seq = 0;
  const logs = [];
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    seq += 1;
    const id = seq;
    const timer = setTimeout(() => reject(new Error('CDP timeout: ' + method)), 20000);
    const onMsg = (raw) => {
      const msg = JSON.parse(raw.toString());
      if (msg.id === id) {
        clearTimeout(timer);
        ws.off('message', onMsg);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result || {});
      } else if (msg.method === 'Runtime.exceptionThrown' || msg.method === 'Log.entryAdded') {
        logs.push(msg);
      }
    };
    ws.on('message', onMsg);
    ws.send(JSON.stringify({ id, method, params }));
  });

  try {
    await send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: 1, mobile: false,
    });
    await send('Runtime.enable');
    await send('Log.enable');
    // Wait for the bundle to mount and paint. The first web compile can take a
    // while; polling the DOM is more reliable than a fixed delay.
    for (let i = 0; i < 80; i++) {
      const probe = await send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const root = document.getElementById('root');
          return JSON.stringify({
            ready: !!(root && root.children.length),
            text: (document.body && document.body.innerText || '').trim().length,
            html: document.body ? document.body.innerHTML.length : 0,
          });
        })()`,
      });
      const probeValue = JSON.parse(probe.result.value || '{}');
      if (probeValue.ready && probeValue.text > 0) break;
      await sleep(250);
    }
    await sleep(900);
    await send('Runtime.evaluate', {
      awaitPromise: true,
      expression: `(async () => {
        const style = document.createElement('style');
        style.textContent = '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}::-webkit-scrollbar{display:none!important}';
        document.head.appendChild(style);
        try { await document.fonts.ready; } catch {}
        await Promise.all([...document.images].map(i => i.decode ? i.decode().catch(() => {}) : Promise.resolve()));
        window.scrollTo(0, 0);
        return true;
      })()`,
    });
    await sleep(700);
    const metrics = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `JSON.stringify({innerW:innerWidth,innerH:innerHeight,sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight,path:location.pathname+location.search})`,
    });
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    const rects = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const texts = [];
        for (const el of document.querySelectorAll('div,span')) {
          const text = (el.textContent || '').replace(/\\s+/g, ' ').trim();
          if (!text || text.length > 160) continue;
          if ([...el.children].some(c => (c.textContent || '').replace(/\\s+/g, ' ').trim() === text)) continue;
          const r = el.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) continue;
          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none') continue;
          texts.push({text, x:+r.x.toFixed(1), y:+r.y.toFixed(1), w:+r.width.toFixed(1), h:+r.height.toFixed(1), fs:cs.fontSize, fw:cs.fontWeight, color:cs.color});
        }
        const buttons = [...document.querySelectorAll('[role=button],[role=link]')].map(el => {
          const r = el.getBoundingClientRect();
          return {text:(el.textContent||'').replace(/\\s+/g,' ').trim().slice(0,60), x:+r.x.toFixed(1), y:+r.y.toFixed(1), w:+r.width.toFixed(1), h:+r.height.toFixed(1)};
        }).filter(b => b.w > 2 && b.h > 2);
        const inputs = [...document.querySelectorAll('input,textarea')].map(el => {
          const r = el.getBoundingClientRect();
          return {placeholder:el.getAttribute('placeholder')||'', value:el.value||'', x:+r.x.toFixed(1), y:+r.y.toFixed(1), w:+r.width.toFixed(1), h:+r.height.toFixed(1)};
        }).filter(i => i.w > 2 && i.h > 2);
        const imgs = [...document.querySelectorAll('img')].map(el => {
          const r = el.getBoundingClientRect();
          return {src:(el.currentSrc||el.src||'').split('/').pop().slice(0,80), x:+r.x.toFixed(1), y:+r.y.toFixed(1), w:+r.width.toFixed(1), h:+r.height.toFixed(1)};
        }).filter(i => i.w > 2 && i.h > 2);
        return JSON.stringify({texts, buttons, inputs, imgs});
      })()`,
    });
    return {
      png: Buffer.from(shot.data, 'base64'),
      metrics: JSON.parse(metrics.result.value),
      rects: JSON.parse(rects.result.value),
      errors: logs,
    };
  } finally {
    try { ws.close(); } catch {}
    http.request('http://127.0.0.1:9224/json/close/' + target.id).end();
  }
}

function downscale3(src) {
  const dst = new PNG({ width: W, height: H });
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
          const i = ((y * 3 + dy) * 1236 + (x * 3 + dx)) * 4;
          r += src.data[i]; g += src.data[i + 1]; b += src.data[i + 2]; a += src.data[i + 3];
        }
      }
      const o = (y * W + x) * 4;
      dst.data[o] = r / 9; dst.data[o + 1] = g / 9; dst.data[o + 2] = b / 9; dst.data[o + 3] = a / 9;
    }
  }
  return dst;
}

function maskBars(img) {
  for (let y = 0; y < H; y++) {
    if (y >= TOP_MASK && y < BOTTOM_MASK) continue;
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      img.data[i] = 200; img.data[i + 1] = 200; img.data[i + 2] = 200; img.data[i + 3] = 255;
    }
  }
}

function compose(a, b, c) {
  const gap = 8;
  const out = new PNG({ width: W * 3 + gap * 2, height: H });
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W * 3 + gap * 2; x++) {
      const o = (y * out.width + x) * 4;
      let src = null, sx = 0;
      if (x < W) { src = a; sx = x; }
      else if (x >= W + gap && x < W * 2 + gap) { src = b; sx = x - W - gap; }
      else if (x >= W * 2 + gap * 2) { src = c; sx = x - W * 2 - gap * 2; }
      if (!src) {
        out.data[o] = 255; out.data[o + 1] = 255; out.data[o + 2] = 255; out.data[o + 3] = 255;
      } else {
        const i = (y * W + sx) * 4;
        out.data[o] = src.data[i]; out.data[o + 1] = src.data[i + 1];
        out.data[o + 2] = src.data[i + 2]; out.data[o + 3] = 255;
      }
    }
  }
  return out;
}

function updateSummary(entry) {
  const file = path.join(root, 'design', 'diff', 'summary.json');
  const all = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const key = screen + (state ? ':' + state : '');
  const current = all[key] || { screen, state };
  current[phase] = entry.overall;
  current.bands = entry.bands;
  all[key] = current;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(all, null, 2));
  const rows = Object.values(all).sort((a, b) => a.screen.localeCompare(b.screen));
  const md = ['# Design fidelity summary', '',
    'PNG source: design/screens (1236×2751, 3× the 412×917 frame). Status bar (top 44) and bottom 24 masked.',
    '', '| Screen | State | Before % | After % | Top % | Middle % | Bottom % |',
    '|---|---|---:|---:|---:|---:|---:|'];
  for (const r of rows) {
    md.push(`| ${r.screen} | ${r.state || 'default'} | ${r.before ?? '—'} | ${r.after ?? '—'} | ${r.bands?.top ?? '—'} | ${r.bands?.middle ?? '—'} | ${r.bands?.bottom ?? '—'} |`);
  }
  md.push('');
  fs.writeFileSync(path.join(root, 'design', 'diff', 'summary.md'), md.join('\n'));
}

function urlFor(key, value) {
  const base = 'http://localhost:8092';
  if (key === 'home-loading') return base + '/home-loading?freeze=1';
  if (key === 'account-created' && !value) return base + '/account-created?freeze=1';
  if (value === 'error' && (key === 'otp' || key === 'otp-error')) {
    return base + '/otp?state=error';
  }
  // Any other state is rendered through the dev gallery, which mounts the same
  // screen component with mock data and the tab bar where needed.
  if (value) return base + '/_dev/gallery?screen=' + key + '&state=' + value;
  return base + APPS[key].route;
}

async function main() {
  await ensureChrome();
  const { design } = APPS[screen];
  const url = urlFor(screen, state);
  const captureState = (screen === 'otp' || screen === 'otp-error') && state === 'error'
    ? 'otp-error'
    : '';
  const res = await capture(url, capW, capH);

  if (size) {
    const file = path.join(outDir, `${screen}-${capW}x${capH}.png`);
    fs.writeFileSync(file, res.png);
    fs.writeFileSync(file.replace(/.png$/, '-rects.json'), JSON.stringify(res.rects, null, 1));
    fs.writeFileSync(file.replace(/.png$/, '-logs.json'), JSON.stringify(res.errors, null, 1));
    const scroll = await (async () => res.metrics)();
    console.log(JSON.stringify({ screen, size, dom: scroll, consoleErrors: res.errors.length }));
    return;
  }
  const designPath = path.join(root, 'design', 'screens', design);
  let src = PNG.sync.read(fs.readFileSync(designPath));
  const crop = APPS[screen].crop ? APPS[screen].crop * 3 : 0;
  if (crop) {
    const cut = new PNG({ width: src.width - crop * 2, height: src.height - crop * 2 });
    for (let y = 0; y < cut.height; y++) {
      for (let x = 0; x < cut.width; x++) {
        const si = ((y + crop) * src.width + (x + crop)) * 4;
        const oi = (y * cut.width + x) * 4;
        cut.data[oi] = src.data[si]; cut.data[oi + 1] = src.data[si + 1];
        cut.data[oi + 2] = src.data[si + 2];
        // The error export's page background is 70% opaque (alpha 178) although
        // its RGB is the intended wash colour; treating it as transparent made
        // pixelmatch flag the whole wash. Keep the RGB, force the pixels opaque.
        cut.data[oi + 3] = 255;
      }
    }
    src = cut;
  }
  if (src.width !== 1236 || src.height !== 2751) {
    throw new Error(`Expected 1236x2751 design, got ${src.width}x${src.height}: ${designPath}`);
  }
  const designImg = downscale3(src);
  const renderImg = PNG.sync.read(res.png);
  if (renderImg.width !== W || renderImg.height !== H) {
    throw new Error(`Render is ${renderImg.width}x${renderImg.height}; expected 412x917`);
  }
  const a = PNG.sync.read(PNG.sync.write(designImg));
  const b = PNG.sync.read(PNG.sync.write(renderImg));
  maskBars(a); maskBars(b);
  const diff = new PNG({ width: W, height: H });
  const diffPixels = pixelmatch(a.data, b.data, diff.data, W, H, {
    threshold: 0.12, includeAA: false, alpha: 0.35, diffMask: false,
  });
  // grey mask bars in diff
  for (let y = 0; y < H; y++) {
    if (y >= TOP_MASK && y < BOTTOM_MASK) continue;
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      diff.data[i] = 200; diff.data[i + 1] = 200; diff.data[i + 2] = 200; diff.data[i + 3] = 255;
    }
  }
  const area = W * (BOTTOM_MASK - TOP_MASK);
  const overall = +((diffPixels / area) * 100).toFixed(2);
  const bands = {};
  for (const [name, y0, y1] of [['top', TOP_MASK, 335], ['middle', 335, 626], ['bottom', 626, BOTTOM_MASK]]) {
    let n = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        if (diff.data[i] > 200 && diff.data[i + 1] < 120) n++;
      }
    }
    bands[name] = +((n / (W * (y1 - y0))) * 100).toFixed(2);
  }
  const prefix = path.join(outDir, captureState || screen);
  fs.writeFileSync(prefix + '-design.png', PNG.sync.write(designImg));
  fs.writeFileSync(prefix + '-render.png', res.png);
  fs.writeFileSync(prefix + '-diff.png', PNG.sync.write(diff));
  fs.writeFileSync(prefix + '-side-by-side.png', PNG.sync.write(compose(designImg, renderImg, diff)));
  const entry = { screen, state, overall, bands, phase, when: new Date().toISOString() };
  fs.writeFileSync(prefix + '-metrics.json', JSON.stringify({ ...entry, dom: res.metrics, errors: res.errors }, null, 2));
  fs.writeFileSync(prefix + '-rects.json', JSON.stringify(res.rects, null, 1));
  if (phase === 'before' || phase === 'after') updateSummary({ ...entry, overall, bands });
  console.log(JSON.stringify({ screen, state, phase, overall, bands, dom: res.metrics, consoleErrors: res.errors.length }));
}

main().catch((e) => { console.error(e.stack || String(e)); process.exit(1); });
