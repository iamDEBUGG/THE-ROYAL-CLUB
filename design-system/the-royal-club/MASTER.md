# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** The Royal Club
**Generated:** 2026-08-03
**Category:** Premium Community Platform

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (Royal Green) | `#1B4D3E` | `--color-primary` |
| Secondary (Dark Green) | `#0F2E26` | `--color-secondary` |
| Accent (Gold) | `#C9A227` | `--color-accent` |
| Accent Dark (Deep Gold) | `#8B6914` | `--color-accent-dark` |
| Background (Cream) | `#F5F0E6` | `--color-background` |
| Foreground | `#F5F0E6` | `--color-foreground` |
| Destructive | `#DC2626` | `--color-destructive` |

**Color Notes:** Royal Green for surfaces and trust, Gold for premium CTAs and accents, Cream for text on dark surfaces. Never use pure white (#fff) or pure black (#000).

### Typography

- **Heading Font:** Playfair Display (serif, regal, reserved for H1/H2/H3 and display text)
- **Body Font:** Inter (sans-serif, clean, readable for body copy and UI labels)
- **Mood:** regal, trustworthy, premium, community-driven
- **Google Fonts:** [Playfair Display + Inter](https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
```

### Typography Scale

```
H1: Playfair Display, 48px, font-weight 700 (hero, section titles)
H2: Playfair Display, 36px, font-weight 600
H3: Inter, 24px, font-weight 600
Body: Inter, 16px, font-weight 400, line-height 1.6
Small: Inter, 14px, font-weight 400
Label: Inter, 12px, font-weight 500 (badges, metadata)
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `8px` | Tight gaps, icon spacing |
| `--space-sm` | `16px` | Inline spacing, small padding |
| `--space-md` | `24px` | Standard section padding |
| `--space-lg` | `32px` | Large gaps, card padding |
| `--space-xl` | `48px` | Section margins |
| `--space-2xl` | `64px` | Hero padding, major gaps |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.08)` | Subtle lift |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.12)` | Cards, buttons |
| `--shadow-lg` | `0 10px 30px rgba(0,0,0,0.16)` | Modals, dropdowns |
| `--shadow-gold` | `0 4px 20px rgba(201,162,39,0.25)` | Gold-accented elements |

---

## Component Specs

### Buttons

```css
/* Primary Button — Gold CTA */
.btn-primary {
  background: #C9A227;
  color: #0F2E26;
  padding: 12px 24px;
  border-radius: 36px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  filter: brightness(1.1);
  box-shadow: 0 4px 20px rgba(201, 162, 39, 0.35);
}

/* Secondary Button — Outlined Green */
.btn-secondary {
  background: transparent;
  color: #F5F0E6;
  border: 1.5px solid #C9A227;
  padding: 12px 24px;
  border-radius: 22.5px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(201, 162, 39, 0.1);
}
```

### Cards

```css
.card {
  background: rgba(27, 77, 62, 0.25);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(201, 162, 39, 0.15);
  border-radius: 12px;
  padding: 24px;
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  border-color: rgba(201, 162, 39, 0.35);
  transform: translateY(-2px);
}
```

---

## Style Guidelines

**Style:** Regal Glassmorphism — semi-transparent dark green surfaces with gold accent borders, translucent blur effects, and warm cream typography.

**Key Effects:** Backdrop blur for glassmorphism, subtle gold border glows on hover, smooth 200-300ms transitions, scroll-driven canvas animation for the hero.

**Animation Principle:** Smooth, purposeful (not gratuitous) — scroll-driven hero only.

---

## Anti-Patterns (Do NOT Use)

- ❌ Pure white (#fff) or pure black (#000) — use Cream and Dark Green
- ❌ Emojis as icons — use SVG icons from Lucide
- ❌ Drop shadows on dark surfaces — use border glows instead
- ❌ Missing cursor:pointer on clickable elements
- ❌ Instant state changes — always use 150-300ms transitions
- ❌ Invisible focus states — focus rings must be visible (gold)
- ❌ Gratuitous animation — motion must convey meaning

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use Lucide SVG instead)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation (gold ring)
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
