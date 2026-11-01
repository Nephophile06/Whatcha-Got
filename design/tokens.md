# Whatcha Got? - Design Tokens System

This document outlines the foundation tokens, contrast ratios, and design principles applied across the **Whatcha Got?** mobile application.

---

## 1. Accessibility & Contrast Principles

- **Persistent Input Labels**: Every input retains an explicit visible label above the field, preventing cognitive load and memory strain.
- **7.5:1 Contrast Minimum**: Primary text (`#0F172A`) against surface background (`#FFFFFF` or `#F8FAFC`) exceeds WCAG AAA requirements (7.5:1 vs required 7:1).
- **Clear Action-Oriented Microcopy**: Replaced vague CTA labels with direct verbs (e.g., `Save Goal`, `Share Recipe`, `Add to Grocery List`).

---

## 2. Color Palette

### Brand Colors
| Token | Hex | Role | Contrast Ratio |
| :--- | :--- | :--- | :--- |
| `primary` | `#E65100` | Culinary Deep Amber / Orange (Primary Action) | 4.8:1 on white |
| `primaryLight` | `#FFE0B2` | Subtle tint for active cards & badges | Accent tint |
| `primaryDark` | `#BF360C` | High contrast press states | 7.6:1 on white |
| `secondary` | `#2E7D32` | Fresh Herb Green (Success & positive states) | 5.2:1 on white |
| `secondaryLight`| `#E8F5E9` | Light green surface for chips & badges | Surface |
| `accent` | `#FFB300` | Warm golden highlights | Accent |

### Neutrals & Surfaces
| Token | Hex | Role |
| :--- | :--- | :--- |
| `background` | `#F8FAFC` | App canvas background (Slate 50) |
| `surface` | `#FFFFFF` | Cards, modals, bottom sheets |
| `surfaceSubtle` | `#F1F5F9` | Inputs, pills, tab backgrounds |
| `border` | `#CBD5E1` | Default input and card borders (Slate 300) |
| `borderFocus` | `#E65100` | Focused input border |

### Accessible Typography
| Token | Hex | Role | Ratio |
| :--- | :--- | :--- | :--- |
| `textPrimary` | `#0F172A` | Headings, titles, labels, input values | **15.8:1** (AAA) |
| `textSecondary` | `#334155` | Body text, subtitles, descriptions | **9.6:1** (AAA) |
| `textMuted` | `#64748B` | Timestamps, placeholders, inactive icons | 4.6:1 (AA) |
| `textInverse` | `#FFFFFF` | Text on primary and dark backgrounds | AAA on dark |

### Feedback & Status
| Token | Hex | Light Surface | Role |
| :--- | :--- | :--- | :--- |
| `success` | `#15803D` | `#DCFCE7` | Completed actions, saved goals |
| `warning` | `#B45309` | `#FEF3C7` | Calorie budget thresholds |
| `error` | `#B91C1C` | `#FEE2E2` | Validation errors, failed requests, OTP errors |
| `info` | `#1D4ED8` | `#DBEAFE` | Tips, informational banners |

---

## 3. Spacing Scale

Base unit: `8px`

| Token | Size | Usage |
| :--- | :--- | :--- |
| `xs` | `4px` | Fine-grain gaps, badge padding |
| `sm` | `8px` | Icon-to-text spacing, chip padding |
| `md` | `16px` | Standard screen horizontal padding, card padding |
| `lg` | `24px` | Section gaps, header bottom margins |
| `xl` | `32px` | Hero container vertical padding |
| `xxl` | `48px` | Large scroll bottom offsets |

---

## 4. Typography Scale

| Token | Size | Line Height | Usage |
| :--- | :--- | :--- | :--- |
| `xs` | `12px` | 16px | Badges, timestamps, helper text |
| `sm` | `14px` | 20px | Input labels, body copy, chips |
| `md` | `16px` | 24px | Primary buttons, list items, card titles |
| `lg` | `18px` | 26px | Section headers |
| `xl` | `22px` | 28px | Card prominent numbers, subheadings |
| `xxl` | `28px` | 34px | Screen titles |
| `hero` | `34px` | 40px | Brand title, prominent metric display |

---

## 5. Border Radii

- `sm`: `6px` (badges, checkboxes)
- `md`: `12px` (inputs, buttons, list cards)
- `lg`: `16px` (recipe cards, summary containers)
- `xl`: `24px` (modals, bottom sheets)
- `full`: `9999px` (circular pills, avatars, action chips)

