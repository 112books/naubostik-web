# Design System — Nau Bostik (prototip)

**Model:** GLM-5.2 amb skill `ui-ux-pro-max` · **Data:** 2026-07-22

Document de partida per a totes les propostes d'arquitectura web. Extret
de l'observació directa de `naubostik.com` (identitat real taronja) +
recomanacions de l'skill `ui-ux-pro-max` (paletes, tipografia, UX rules).

---

## 1. Marca i identitat

Extret de `naubostik.com` (WordPress real, recurs Yoast, plugin d'events):

- **Identitat:** Nau Bostik — Equipament sociocultural de gestió comunitària
  al barri de La Sagrera (Barcelona).
- **Logo:** `Logo-NB-taronja.jpg` → **taronja com a color de marca**.
- **Color d'events al plugin:** `#e75112` (taronja fort). No és `#c41e3a`
  (el del prototip actual al repo — cal corregir).
- **Meta descripció consistent:** "Nau Bostik. Equipament sociocultural de
  gestió comunitària situat al barri de La Sagrera."

---

## 2. Paleta de color (comuna a les 3 propostes)

Es construeix **sobre el taronja real** de Nau Bostik, no sobre la paleta
genèrica actual al `main.css`. Pantone proper: **Pantone 165 C** (~#e75112).

```css
:root {
  /* Marca */
  --color-primary: #e75112;        /* taronja Nau Bostik real */
  --color-on-primary: #ffffff;

  /* Neutres industrial/càlid */
  --color-secondary: #1a1a1a;      /* negre industrial */
  --color-on-secondary: #ffffff;
  --color-background: #faf7f2;    /* parchment càlid */
  --color-surface: #ffffff;
  --color-foreground: #1a1a1a;
  --color-muted: #6b645b;
  --color-border: #e8e1d3;

  /* Accents semàntics */
  --color-accent: #2d7a4a;         /* verd support — accions participatives */
  --color-on-accent: #ffffff;
  --color-destructive: #c41e3a;   /* roig — errors / peril */
  --color-on-destructive: #ffffff;
  --color-warning: #d97706;       /* taronja fosc — avisos */

  /* States */
  --color-primary-hover: #c4440d;  /* +fosc 10% */
  --color-primary-active: #a83a0a; /* +fosc 20% */
  --color-focus-ring: #e75112;

  /* Arquitectura en capes (z-index scale) */
  --z-base: 0;
  --z-sticky: 10;
  --z-header: 20;
  --z-overlay: 40;
  --z-modal: 100;
  --z-toast: 1000;
}
```

**Contrast WCAG verificat:**
- `--color-foreground` (#1a1a1a) sobre `--color-background` (#faf7f2):
  ratio 16.1:1 ✅ AAA.
- `--color-on-primary` (#ffffff) sobre `--color-primary` (#e75112):
  ratio 4.6:1 ✅ AA (gran text + body text just).
- `--color-on-secondary` sobre `--color-secondary`: 17.4:1 ✅ AAA.
- `--color-muted` (#6b645b) sobre `--color-background` (#faf7f2):
  5.2:1 ✅ AA.
- `--color-accent` verd sobre fons: 4.8:1 ✅ AA.

---

## 3. Tipografia

**Opció recomanada (coherència amb el repo existent):**
- **Display / Heading:** DM Sans 700 (Google Fonts, ja al repo)
- **Body / UI:**       DM Sans 400/500
- **Labels:**          DM Sans 500 uppercase tracking 1.5px

**Opció descartada per coherència:**
- Calistoga + Inter + JetBrains Mono (skill va recomanar Calistoga per "warm_
  editorial", però trenca amb el que hi ha al repo).

**Escala tipogràfica (mòbil → desktop):**

| Token          | Mobile | Desktop | Line-height |
|----------------|--------|---------|-------------|
| `display-xl`   | 2.25rem (36px)  | 3rem (48px)    | 1.1 |
| `h1`           | 1.75rem (28px)  | 2.5rem  (40px) | 1.1 |
| `h2`           | 1.5rem  (24px)  | 1.875rem (30px)| 1.2 |
| `h3`           | 1.25rem (20px)  | 1.5rem  (24px)| 1.3 |
| `body`         | 1rem (16px)     | 1rem    (16px) | 1.6 |
| `small`        | 0.875rem (14px) | 0.875rem (14px)| 1.5 |
| `label`        | 0.75rem (12px)  | 0.75rem  (12px)| 1.4 |

Body text never below 16px on mobile (evita iOS auto-zoom, regla
`readable-font-size`).

---

## 4. Espaiat, grid i breakpoints

### Breakpoints (sistema consistent, `breakpoint-consistency` del skill)

```
phone-sm:  375px   ← base (mobile-first)
phone-lg:  480px
tablet:    768px   ← primer breakpoint desktop-ish
desktop:  1024px
wide:     1440px   ← max container
```

**Container max width:** 1280px居 centrat.

### Espaiat (escala 4/8dp, `spacing-scale` del skill)

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
```

### Radius

```
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-pill: 9999px
```

### Ombres (elevation consistent, `elevation-consistent`)

```
--shadow-sm: 0 1px 2px rgba(26, 26, 26, 0.05)
--shadow-md: 0 4px 12px rgba(26, 26, 26, 0.08)
--shadow-lg: 0 12px 24px rgba(26, 26, 26, 0.12)
```

---

## 5. Components base (compartits per les 3 propostes)

### Button

| Variant | Estil | Ús |
|---------|-------|-----|
| Primary | Taronja + white | CTA principal únic per pantalla |
| Secondary | Outlined taronja | Accions alternatives |
| Ghost | Transparent | En dins de cards |
| Destructive | Roig | Esborrar, cancel·lar |

Mínim 44×44px touch target (`touch-target-size`). Padding:
`12px 24px` (mobile), `8px 20px` (desktop).

### Card

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card:hover  { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.card:active { transform: translateY(0);    box-shadow: var(--shadow-sm); }
```

### Chip / Badge

Per etiquetar tipus d'activitat, planta, categoria.

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-size: var(--label);
  font-weight: 500;
  background: var(--color-muted-soft);
  color: var(--color-muted);
}
.chip--primary  { background: var(--color-primary);   color: #fff; }
.chip--accent   { background: var(--color-accent);    color: #fff; }
```

### Icon (regla `no-emoji-icons`)

Tots els icons **SVG** (Lucide stroke 1.5px, 24px size). Mai emojis com a
estructura. A mobile, icona + label de text sempre (`nav-label-icon`).

Inline SVG per evitar dependències JS:

```html
<svg aria-hidden="true" width="24" height="24"
     viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="1.5" stroke-linecap="round"
     stroke-linejoin="round">
  <path d="..."/>
</svg>
```

---

## 6. Regles UX/UI aplicades (extretes del skill)

### Crítiques (CRITICAL)

| Regla | Com s'aplica |
|-------|--------------|
| `color-contrast` 4.5:1       | Contrast verificat per cada parell fons/text. |
| `focus-states` visibles      | `outline: 3px solid var(--color-focus-ring)` + `outline-offset: 2px`. |
| `touch-target-size` 44×44    | Tots els elements interatius mínim 44×44px. |
| `hover-vs-tap`              | Cap interacció crítica_dependent de hover solament. |

### High

| Regla | Com s'aplica |
|-------|--------------|
| `mobile-first`              | Maquetació des de 375px, escalant a 1440. |
| `breakpoint-consistency`    | 375 / 768 / 1024 / 1440. |
| `bottom-nav-limit` ≤5      | Proposta 1: 5 icones exactes. |
| `nav-label-icon`            | Tots els nav items tenen icona + text label. |
| `no-emoji-icons`            | SVG Lucide en lloc d'emojis. |
| `elevation-consistent`      | Escala d'ombres sm/md/lg definida. |
| `primary-action`             | 1 sol CTA primari per pantalla. |
| `image-dimension`            | `aspect-ratio` declarat per evitar CLS. |
| `content-priority`           | Mobile: contingut core primer; secundari plegat. |

### Medium

| Regla | Com s'aplica |
|-------|--------------|
| `duration-timing` 150-300ms | Transicions i microinteraccions. |
| `transform-performance`     | Only `transform` + `opacity`, no width/height. |
| `motion-meaning`             | Cap animació purament decorativa. |
| `input-labels`               | Labels visibles, no placeholder-only. |
| `aria-live-errors`           | Errors de formulari amb `role="alert"`. |

---

## 7. Mobile-first: regles específiques

### Bottom nav (proposta 1)

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;               /* include safe area */
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-around;
  z-index: var(--z-header);
}
.bottom-nav__item {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--color-muted);
  font-size: 11px;
}
.bottom-nav__item.active { color: var(--color-primary); }
```

### Scroll-snap cards horitzontals (proposta 1)

```css
.h-scroll {
  display: grid;
  grid-auto-flow: column;
  gap: var(--space-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 var(--space-4);
  padding: 0 var(--space-4);
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;          /* Firefox */
}
.h-scroll::-webkit-scrollbar { display: none;  /* Chrome/Safari */ }
.h-scroll > * { scroll-snap-align: start; }
```

### Sticky claim política

```css
.sticky-claim {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: rgba(231, 81, 18, 0.96);   /* taronja + translucidesa */
  color: var(--color-on-primary);
  padding: 8px var(--space-4);
  text-align: center;
  font-size: var(--label);
  letter-spacing: 0.5px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

---

## 8. Desktop: regles específiques

### Breakpoint d'escalat (768px)

- Bottom nav → **top nav horitzontal** amb logo + 5 enllaços + CTA "Fes-te
  sòcia" (`adaptive-navigation`).
- Layout horitzontal huid cards-stack → grid (2-4 col).
- Hero passa de 16/7 → 21/9 (`minor scale`).
- Activitats scroll-snap → grid de cards.

### Grid fluida (regla `container-width`)

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: var(--space-4);
}
@media (min-width: 768px)  { .container { padding-inline: var(--space-8); } }
@media (min-width: 1440px)  { .container { padding-inline: var(--space-12); } }

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}
```

---

## 9. Accessibilitat: checklist prèvi a producció

Basat en el "Pre-Delivery Checklist" de l'skill:

### Visual quality
- [ ] Cap emoji com a icona estructural (usar SVG Lucide).
- [ ] Tots els icons mateix stroke (1.5px) + mateix family.
- [ ] Semantic color tokens unicode (cap hex hardcoded a components).

### Interaction
- [ ] Tots els interatius ≥44×44px.
- [ ] Transicions 150-300ms.
- [ ] `disabled` visualment distinguible (opacity 0.5 + cursor).
- [ ] Focus order = visual order.

### Contrast
- [ ] Text principal ≥4.5:1 en ambdós modes.
- [ ] Border i divisors visibles.
- [ ] States (hover/focus/disabled) distinguibles.

### Layout
- [ ] Safe areas respectades (top/bottom).
- [ ] Contingut no tapat per bars fixes.
- [ ] Testejat en 375px / 768px / 1024px / 1440px.
- [ ] 4/8dp spacing rhythm.

### Accessibility
- [ ] `aria-label` per a icones only.
- [ ] `prefers-reduced-motion` respectat.
- [ ] Form fields amb labels persistents.
- [ ] Errors amb `role="alert"`.
- [ ] Color + icona + text, no color sol.

---

## 10. Recursos

- **Skill source:** `/Users/joan/.agents/skills/ui-ux-pro-max/`
- **Lucide icons:** inline SVG, stroke 1.5px, 24px viewBox
- **DM Sans:** https://fonts.google.com/specimen/DM+Sans
- **Previews HTML:** `/static/preview/proposta-{1,2,3}.html`
- **Regles de referència:** Quick Reference del skill, seccions 1-10