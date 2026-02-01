# DESIGN-TOKENS.md — Design Tokens Reference

> Ce fichier documente tous les design tokens du système.
> Source de vérité : `tailwind.config.js` + `app/globals.css`

---

## Palette de Couleurs

### Primary (Slate — Gris ardoise)

Utilisé pour : textes, backgrounds, bordures, éléments neutres.

| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| primary-50 | `#F8FAFC` | `bg-primary-50` | Background page (light mode) |
| primary-100 | `#F1F5F9` | `bg-primary-100` | Background hover subtle |
| primary-200 | `#E2E8F0` | `border-primary-200` | Bordures (light mode) |
| primary-300 | `#CBD5E1` | `text-primary-300` | Texte désactivé (dark mode) |
| primary-400 | `#94A3B8` | `text-primary-400` | Texte muted/placeholder |
| primary-500 | `#64748B` | `text-primary-500` | Texte secondaire |
| primary-600 | `#475569` | `text-primary-600` | Texte secondaire (light) |
| primary-700 | `#334155` | `bg-primary-700` | Surface elevated (dark mode) |
| primary-800 | `#1E293B` | `bg-primary-800` | Surface (dark mode) |
| primary-900 | `#0F172A` | `bg-primary-900` | Background (dark mode) |
| primary-950 | `#020617` | `bg-primary-950` | Noir profond |

### Accent (Bleu électrique — du logo)

Utilisé pour : actions principales, liens, focus states, éléments interactifs.

| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| accent-50 | `#EEEEFF` | `bg-accent-50` | Background badges accent |
| accent-100 | `#D4D0FF` | `bg-accent-100` | Hover subtle |
| accent-200 | `#ABA3FF` | `bg-accent-200` | — |
| accent-300 | `#8275FF` | `text-accent-300` | Texte accent (dark mode) |
| accent-400 | `#5947FF` | `bg-accent-400` | — |
| accent-500 | `#1E00FF` | `bg-accent-500` | Accent principal, focus rings |
| accent-600 | `#1800D6` | `bg-accent-600` | Buttons primary |
| accent-700 | `#1200AD` | `bg-accent-700` | Buttons primary hover |
| accent-800 | `#0C0085` | `bg-accent-800` | Buttons primary active |
| accent-900 | `#06005C` | `bg-accent-900` | — |
| accent-950 | `#030033` | `bg-accent-950` | — |

### Secondary (Orange vif — du logo)

Utilisé pour : **CTAs majeurs UNIQUEMENT** (signup, submit, action principale).
⚠️ Usage rare et impactant — max 1-2 éléments par écran.

| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| secondary-50 | `#FFF4ED` | `bg-secondary-50` | — |
| secondary-100 | `#FFE6D5` | `bg-secondary-100` | — |
| secondary-200 | `#FFCAA8` | `bg-secondary-200` | — |
| secondary-300 | `#FFA570` | `bg-secondary-300` | — |
| secondary-400 | `#FF7636` | `bg-secondary-400` | — |
| secondary-500 | `#FF4800` | `bg-secondary-500` | **CTA principal** |
| secondary-600 | `#E63D00` | `bg-secondary-600` | CTA hover |
| secondary-700 | `#BF3200` | `bg-secondary-700` | CTA active |
| secondary-800 | `#992800` | `bg-secondary-800` | — |
| secondary-900 | `#731E00` | `bg-secondary-900` | — |
| secondary-950 | `#4D1400` | `bg-secondary-950` | — |

#### Règles d'usage de l'orange

| Contexte | Utiliser orange ? | Alternative |
|----------|-------------------|-------------|
| CTA principal (hero, signup) | ✅ Oui | — |
| CTA secondaire | ❌ Non | `primary-900` ou outline |
| Liens texte | ❌ Non | `accent-500` (bleu) |
| Badges, pills | ❌ Non | `accent` ou `primary` |
| Icônes | ❌ Non | `primary` ou `accent` |

---

### Semantic Colors

#### Success (Vert)
| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| success-50 | `#F0FDF4` | `bg-success-50` | Background badge success |
| success-500 | `#22C55E` | `text-success-500` | Icônes success |
| success-600 | `#16A34A` | `bg-success-600` | Buttons success |
| success-700 | `#15803D` | `bg-success-700` | Buttons success hover |

#### Warning (Jaune/Ambre)
| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| warning-50 | `#FEFCE8` | `bg-warning-50` | Background badge warning |
| warning-500 | `#EAB308` | `text-warning-500` | Icônes warning |
| warning-600 | `#CA8A04` | `bg-warning-600` | — |
| warning-700 | `#A16207` | `text-warning-700` | Texte badge warning |

#### Error (Rouge)
| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| error-50 | `#FEF2F2` | `bg-error-50` | Background badge error |
| error-500 | `#EF4444` | `text-error-500` | Icônes error |
| error-600 | `#DC2626` | `bg-error-600` | Buttons danger |
| error-700 | `#B91C1C` | `bg-error-700` | Buttons danger hover |

#### Info (Bleu)
| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| info-50 | `#EFF6FF` | `bg-info-50` | Background badge info |
| info-500 | `#3B82F6` | `text-info-500` | Icônes info |
| info-600 | `#2563EB` | `bg-info-600` | — |
| info-700 | `#1D4ED8` | `text-info-700` | Texte badge info |

---

## Dark Mode Mappings

| Token sémantique | Light Mode | Dark Mode |
|------------------|------------|-----------|
| `--color-background` | `#F8FAFC` (primary-50) | `#0F172A` (primary-900) |
| `--color-surface` | `#FFFFFF` | `#1E293B` (primary-800) |
| `--color-surface-elevated` | `#FFFFFF` | `#334155` (primary-700) |
| `--color-border` | `#E2E8F0` (primary-200) | `#334155` (primary-700) |
| `--color-border-muted` | `#F1F5F9` (primary-100) | `#1E293B` (primary-800) |
| `--color-text-primary` | `#0F172A` (primary-900) | `#F8FAFC` (primary-50) |
| `--color-text-secondary` | `#475569` (primary-600) | `#CBD5E1` (primary-300) |
| `--color-text-muted` | `#94A3B8` (primary-400) | `#64748B` (primary-500) |
| `--color-text-inverse` | `#FFFFFF` | `#0F172A` (primary-900) |

---

## Typography

### Font Family

```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Sizes

| Token | Taille | Line-height | Tailwind | Usage |
|-------|--------|-------------|----------|-------|
| text-xs | 0.75rem (12px) | 1rem (16px) | `text-xs` | Labels, captions, badges |
| text-sm | 0.875rem (14px) | 1.25rem (20px) | `text-sm` | Body small, helper text |
| text-base | 1rem (16px) | 1.5rem (24px) | `text-base` | Body text |
| text-lg | 1.125rem (18px) | 1.75rem (28px) | `text-lg` | Body large |
| text-xl | 1.25rem (20px) | 1.75rem (28px) | `text-xl` | Subheadings |
| text-2xl | 1.5rem (24px) | 2rem (32px) | `text-2xl` | Headings H3 |
| text-3xl | 2rem (32px) | 2.25rem (36px) | `text-3xl` | Headings H2 |
| text-4xl | 2.5rem (40px) | 2.5rem (40px) | `text-4xl` | Headings H1 |

### Font Weights

| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| normal | 400 | `font-normal` | Body text |
| medium | 500 | `font-medium` | Buttons, labels |
| semibold | 600 | `font-semibold` | Subheadings |
| bold | 700 | `font-bold` | Headings |

---

## Spacing

| Token | Valeur | Pixels | Tailwind | Usage |
|-------|--------|--------|----------|-------|
| space-1 | 0.25rem | 4px | `p-1`, `m-1`, `gap-1` | Micro spacing |
| space-2 | 0.5rem | 8px | `p-2`, `m-2`, `gap-2` | Tight spacing |
| space-3 | 0.75rem | 12px | `p-3`, `m-3`, `gap-3` | Compact spacing |
| space-4 | 1rem | 16px | `p-4`, `m-4`, `gap-4` | Default spacing |
| space-6 | 1.5rem | 24px | `p-6`, `m-6`, `gap-6` | Comfortable spacing |
| space-8 | 2rem | 32px | `p-8`, `m-8`, `gap-8` | Generous spacing |
| space-12 | 3rem | 48px | `p-12`, `m-12` | Section spacing |
| space-16 | 4rem | 64px | `p-16`, `m-16` | Large section spacing |

---

## Border Radius

| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| radius-sm | 4px | `rounded-sm` | Chips, small elements |
| radius-md | 8px | `rounded-md` | Buttons, inputs |
| radius-lg | 12px | `rounded-lg` | Cards, modals |
| radius-xl | 16px | `rounded-xl` | Large cards |
| radius-full | 9999px | `rounded-full` | Badges, avatars, pills |

---

## Shadows

### Light Mode

| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| shadow-sm | `0 1px 2px rgba(0,0,0,0.04)` | `shadow-sm` | Subtle elevation |
| shadow-md | `0 2px 8px rgba(0,0,0,0.06)` | `shadow-md` | Cards default |
| shadow-lg | `0 4px 16px rgba(0,0,0,0.08)` | `shadow-lg` | Cards hover, dropdowns |
| shadow-xl | `0 8px 32px rgba(0,0,0,0.10)` | `shadow-xl` | Modals, popovers |

### Dark Mode

| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| shadow-dark-sm | `0 1px 2px rgba(0,0,0,0.2)` | `dark:shadow-dark-sm` | Subtle elevation |
| shadow-dark-md | `0 2px 8px rgba(0,0,0,0.3)` | `dark:shadow-dark-md` | Cards default |
| shadow-dark-lg | `0 4px 16px rgba(0,0,0,0.4)` | `dark:shadow-dark-lg` | Cards hover |
| shadow-dark-xl | `0 8px 32px rgba(0,0,0,0.5)` | `dark:shadow-dark-xl` | Modals |

---

## Transitions

| Token | Durée | Tailwind | Usage |
|-------|-------|----------|-------|
| transition-fast | 150ms | `duration-150` | Micro-interactions (scale, opacity) |
| transition-normal | 200ms | `duration-200` | Default transitions |
| transition-slow | 300ms | `duration-300` | Modals, overlays |

### Easing

```css
/* Default easing (utilisé partout) */
transition-timing-function: ease-out;

/* Pour les animations d'entrée */
animation-timing-function: ease-out;
```

---

## Breakpoints

| Token | Valeur | Usage |
|-------|--------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Extra large |

---

## Z-Index Scale

| Token | Valeur | Usage |
|-------|--------|-------|
| z-0 | 0 | Base layer |
| z-10 | 10 | Dropdowns |
| z-20 | 20 | Sticky headers |
| z-30 | 30 | Fixed elements |
| z-40 | 40 | Overlays |
| z-50 | 50 | Modals, dialogs |

---

## CSS Variables Reference

Toutes les variables CSS disponibles dans `:root` et `.dark` :

```css
/* Colors */
--color-primary-{50-900}
--color-accent-{50-700}
--color-success, --color-warning, --color-error, --color-info

/* Surfaces */
--color-background
--color-surface
--color-surface-elevated
--color-border
--color-border-muted

/* Text */
--color-text-primary
--color-text-secondary
--color-text-muted
--color-text-inverse

/* Shadows */
--shadow-sm, --shadow-md, --shadow-lg, --shadow-xl

/* Spacing */
--space-{1,2,3,4,6,8,12,16}

/* Radius */
--radius-sm, --radius-md, --radius-lg, --radius-full

/* Transitions */
--transition-fast, --transition-normal, --transition-slow
```

---

*Source de vérité : `tailwind.config.js` + `app/globals.css`*
*Dernière mise à jour : 2026-01-31*
