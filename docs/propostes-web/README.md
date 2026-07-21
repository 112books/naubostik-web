# Propostes d'arquitectura web — Nau Bostik

**Data:** 2026-07-22 · **Model:** GLM-5.2 amb skill `ui-ux-pro-max`

4 propostes de disseny per a la nova web de Nau Bostik. Totes comparteixen:
- Paleta taronja real de la marca (`#e75112`, extreta de `naubostik.com`).
- Tipografia DM Sans (ja al repo) + Space Grotesk (proposta 4).
- Mobile-first + acessibilitat WCAG AA.
- SVG inline (Lucide stroke 1.5px), sense emojis com a icones.
- Sense JS crític per a contingut essencial.

## Previews navegables

Obre aquests fitxers directament al navegador (o via `hugo server`):

- [`/preview/`](../../static/preview/index.html) — índex de les 4 propostes
- [`/preview/proposta-1.html`](../../static/preview/proposta-1.html) — La Nau App
- [`/preview/proposta-2.html`](../../static/preview/proposta-2.html) — Tres Portes
- [`/preview/proposta-3.html`](../../static/preview/proposta-3.html) — La Nau Virtual
- [`/preview/proposta-4.html`](../../static/preview/proposta-4.html) — Brutalista Nau

## Documents

- [`design-system.md`](design-system.md) — sistema de disseny compartit (paleta, tipografia, spacing, components, regles UX)
- [`proposta-1-nau-app.md`](proposta-1-nau-app.md) — esquema + mockup + tipus de continguts
- [`proposta-2-tres-portes.md`](proposta-2-tres-portes.md) — esquema + mockup + tipus de continguts
- [`proposta-3-nau-virtual.md`](proposta-3-nau-virtual.md) — esquema + mockup + tipus de continguts
- [`proposta-4-brutalista.md`](proposta-4-brutalista.md) — esquema + mockup + tipus de continguts

## Comparativa ràpida

| Dimensió | P1 Nau App | P2 Tres Portes | P3 Nau Virtual | P4 Brutalista |
|----------|-----------|----------------|----------------|---------------|
| Metàfora | App mobile | 3 portals per públic | El edifici és la interfície | Raw industrial |
| Mobile | Bottom nav + scroll-snap | 3 cards apilades | Nau vertical scroll | Display gegant + stack |
| Desktop | Hero + grid cards | 3 columnes portal | SVG isomètric + sidebar | Grid exposat 4 col |
| Innovació | Bottom nav (raro al sector) | Intent-based navigation | Visualització de l'edifici | Brutalisme + marquee |
| Risc tècnic | Baix | Mig | Mig (SVG gen) | Baix |
| Cost | S | M | L | S |
| To | Pràctic | Organitzat | Expressiu | Trencador |

## recomanació

- **P1 (Nau App)** — la més sòlida i Executable aviat. Bottom nav + scroll-snap.
- **P2 (Tres Portes)** — la més coherent amb "comunicar què oferim a cada públic".
- **P3 (Nau Virtual)** — la més expressiva de la identitat arquitectònica. Alta recompensa.
- **P4 (Brutalista)** — la més trencadora. Diferencia fortament dels centres convencionals.