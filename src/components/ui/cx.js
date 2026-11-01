/**
 * Tiny class-name combinator for conditional NativeWind classes.
 * Keeps component markup readable without pulling in clsx.
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default cx;
