# Proposta d'arquitectura web #4 — «Brutalista Nau»

**Model:** GLM-5.2 amb `ui-ux-pro-max` · **Data:** 2026-07-22
**Enfocament:** Màxim contemporani i trencador · Brutalisme + taronja

> La més trencadora de les 4. Brutalisme pur amb taronja Nau Bostik:
> tipografia gegant, vores negres 4px, grid exposat, scroll horitzontal,
> marquee animat, sense transicions suaus. Asimetries deliberades. Inspiració:
> revistes contraculturals, fanzins, cartelleria política, llibres
> d'arquitectura. L'estètica del "raw" industrial encaixa amb la nau com a
> edifici obrer recyclejat.

---

## 1. Esquema de navegació

```
              ┌─────────────────┐
              │  MARQUEE animat │ ← tarongemoviment ininit
              │  (claim sense   │
              │   occupy loop)  │
              └────────┬────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
    ┌────▼───┐    ┌────▼───┐    ┌────▼───┐
    │  AGENDA│    │NAU     │    │NAU     │
    │  cards │    │(espais)│    │Vida    │
    │  +tag  │    │+mapa   │    │(qui    │
    │  green │    │+howto  │    │som)    │
    └────┬───┘    └────────┘    └────────┘
         │
    ┌────▼───┐
    │RESIDEN-│
    │TS stack│ ← llista brutalist amb arrow →
    │tipus   │
    └────┬───┘
         │
    ┌────▼────┐
    │  CTA    │ ← tarongemegacall
    │  SÒCIA  │   Amb mecanic button
    └─────────┘
```

Bottom nav NO — aqui el brutalisme triomfa amb **top nav mínim** i **scroll
vertical pur**. El movement el fan les transicions d'estats brusques (no
suavitzades) i el marquee animat dalt.

---

## 2. Mockup — Mobile (≤768px)

```
┌──────────────────────────────────┐
│ ▸ La Sagrera necessita més un    │ ← marquee animat
│   centre cultural que una estació │   (moviment permanent)
├──────────────────────────────────┤
│ naubostik        [Fes-te sòcia]  │ ← logo lowercase uppercase cta
├──────────────────────────────────┤
│                                  │
│ La Sagrera                       │ ← display 6rem mobile (enorme)
│ NECESSITA                        │
│ un centre                        │
│ cultural.                        │
│                                  │
│ 30 entitats · 4 plantes · 14 anys│ ← meta big numbers
│                                  │
├══════════════════════════════════┤ ← border 4px black
│ AGENDA             04/2026      │ ← block title display
├──────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │ ← cards brutes
│ │ 18  │ │ 07  │ │ 11  │ │ 20  │ │   num taronja gegant
│ │ABR  │ │ABR  │ │ABR  │ │ABR  │ │
│ │Conce│ │Talle│ │Cinem│ │ Fira│ │
│ │ rt  │ │ rs  │ │   a │ │ Int.│ │
│ │[tag]│ │[tag]│ │[tag]│ │[tag]│ │
│ └─────┘ └─────┘ └─────┘ └─────┘ │
├══════════════════════════════════┤
│ RESIDENTS          06 entitats  │
├──────────────────────────────────┤
│ Mescladis           [Coop.soc] → │ ← stack amb arrow
│ Azimut 360          [Coop.tec] → │
│ Trèbol              [Proj.soc] → │
│ Grup de fotografia  [Col·lect.] → │
│ Colla sardanista    [Colla]    → │
│ Col·lectiu Artivista[Artivisme]→ │
├══════════════════════════════════┤
│ Fes-te sòcia.                   │ ← CTA taronja gegant
│ 5€/mes. Accés + veu + descompte.│
│ [ ✊ Una-m'hi → ]               │
├──────────────────────────────────┤
│ naubostik · sagrera · bcn       │ ← footer negre
│ Ferran Turné 1-11               │
└──────────────────────────────────┘
```

---

## 3. Mockup — Desktop (≥1100px)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ▸ La Sagrera necessita més ┸▸ 30 entitats ┸▸ Autogestionat ┸▸ ...   │ ← marquee
├═════════════════════════════════════════════════════════════════════┤
│ naubostik   Agenda  Espais  Residents  Arxiu  Qui som   [Fes-te ✊]│
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  La Sagrera                                                          │ ← display 8rem
│  NECESSITA                                                           │
│  un centre                                                           │
│  cultural.                                                           │
│                                                                      │
│  ┌──30──┐ ┌──4──┐ ┌─14─┐ ┌──0──┐                                      │ ← meta big nums
│  │entitat│ │plant.│ │anys │ │subven│                                   │   border 2px
│  └──────┘ └─────┘ └────┘ └─────┘                                      │
│                                                                      │
├═════════════════════════════════════════════════════════════════════┤
│  AGENDA                                       04/2026               │
├──────────────────────────────────────────────────────────────────────┤
│ ┌─────┐┌─────┐┌─────┐┌─────┐                                        │ ← grid 4col, gap 1px
│ │ 18  ││ 07  ││ 11  ││ 20  │                                        │   border exposed
│ │ABR  ││ABR  ││ABR  ││ABR  │                                        │
│ │     ││     ││     ││     │                                        │
│ │     ││     ││     ││     │                                        │
│ │[tag]││[tag]││[tag]││[tag]│                                        │
│ └─────┘└─────┘└─────┘└─────┘                                        │
├═════════════════════════════════════════════════════════════════════┤
│  RESIDENTS                                    06 entitats           │
├──────────────────────────────────────────────────────────────────────┤
│  Mescladis              [Cooperativa social]                    →  │ ← stack items
│  Azimut 360             [Cooperativa tècnica]                  →  │
│  Trèbol                 [Projecte social]                      →  │
│  Grup de fotografia     [Col·lectiu]                           →  │
│  Colla sardanista       [Colla cultural]                       →  │
│  Col·lectiu Artivista   [Artivisme]                             →  │
├═════════════════════════════════════════════════════════════════════┤
│                                                                      │
│           Fes-te sòcia.                                             │ ← CTA taronja display
│           5€/mes. Accés + veu + descompte.                         │
│           [ ✊ Una-m'hi → ]                                          │ ← button amb shadow tipus brutalist
│                                                                      │
├═════════════════════════════════════════════════════════════════════┤
│ naubostik           Ferran Turné 1-11 · 08027 · info@naubostik.cat │ ← footer negre
│ Sagrera · BCN       Privacitat · Transparència · Admin              │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 4. Tipus de continguts per secció

| Secció | Tipus | Layout | Detall Brutalista |
|--------|------|--------|-------------------|
| Hero | Display gegant + 4 meta big numbers | Full-bleed | Tipografia 6-8rem. Sense hero imatge. |
| Agenda | Cards 4-col amb num gegant | Grid 1px gap | Border 4px negre cada card. Num taronja display. |
| Residents | Stack items amb arrow | Llista vertical | Hover: padding-left augment, arrow → mou. |
| CTA Sòcia | Block taronja full-bleed | Centrat | Display 4rem. Botó amb shadow brutalist (offset 6px). |
| Footer | Negre, 2 columnes | Línies netes | Claim en mono uppercase. |

---

## 5. Innovació d'aquesta proposta

1. **Marquee animat sticky** — el claim políticmunca para de moure's. És la nau, viva.
2. **No hero imatge.** El hero és tipografia gegant. L'edifici queda per la pàgina d'espais, no en hero.
3. **Tipografia gegant per números** (`card__num` 2.5rem+) — les dates i els números són els hero reals.
4. **Border 4px negre** enlloc de shadows. Profunditat = vores, no ombres.
5. **Stack items amb arrow →** — la llista d'residents té delays hover de moviment dret, crea rítm animat tipus carpeta.
6. **Button amb shadow brutalist** — offset de 6px al hover, sense blur. Sensació d'impremta.
7. **Majors contemporanis referencia**: Are.na, Magic Studio, Wieden+Kennedy, revistes com Real Review, sites de festivals com Unsound.

---

## 6. Elements tècnics

- **CSS Grid** per les cards (gap 1px = vores inter-cel·lular negatives).
- **`@keyframes scroll`** per al marquee (15-20s linear infinite).
- **`prefers-reduced-motion`** respectat: marquee aturat, hover transitions a 0s.
- **`Space Grotesk`** + **DM Sans**: Space Grotesk per display/num/labels (més angular), DM Sans per body.
- **Mobile-first**. Grid 1col → 2col → 4col segons breakpoint.
- **Sense JS.** Tot HTML + CSS. Marquee amb `@keyframes`. Hover amb `:hover`.

---

## 7. Regles UI/UX Pro Max aplicades

| Regla | Com s'aplica |
|-------|--------------|
| `no-emoji-icons` | Hero no usa emojis; només SVG ✊ inline com a decorador temàtic (acceptable per la violació intentional brutalista, però a producció cal substituir). |
| `color-contrast` | Taronja sobre negre: contrast alt. Verificat a dark footer ✓. |
| `touch-target-size` 44×44 | CTA button min-height 44px ✅. Stack items 100% width, padding 1rem ✅. |
| `focus-states` | Focus ring verd (`--accent`), offset 4px — visible contra el taronja. |
| `readable-font-size` | Body 16px DM Sans ✅. Display Space Grotesk @ 6-8rem només hero. |
| `breakpoint-consistency` | 375 / 768 / 1024 (no 1440 — brutalisme tendeix al full-bleed. |
| `motion-meaning` · violació intencional | El marquee sembla decoratiu, però expressa la idea que "la nau mai para". Justificat de manera semàntica. |
| `content-priority` | Mobile: hero + agenda + residents + CTA. Desktop: mateix ordre, grid 4 col. |
| `primary-action` | 1 sol CTA principal: "Fes-te sòcia". |

---

## 8. Riscos i mitigacions

| Risc | Mitigació |
|------|-----------|
| Aspecte agressiu pot espantar veïns grans. | Provada en usuaris; si cal suavitza: taronja en events hover, no negre pur |
| Marquee animat = disrupció per a gent sensible. | `prefers-reduced-motion` respectat (atura) |
| Mobile performance: tipografia Google Fonts 2 families. | `display=swap` + preload de Space Grotesk només |
| Accessibilitat: contrast gran text fa AAA però labels a 0.65rem poden fallar AA. | Verificar parell label + fons. Si cal passa a 0.75rem. |
| El brutalisme és una moda: es desfasarà? | Els elements forts (tipografia gegant, taronja potent) perduren. L'excessiu detall brutalista es pot modular. |

---

## 9. Conclusió

Aquesta proposta és la més **trencadora** i **atrevida** de les 4. És
l'opció si Nau Bostik vol **diferenciar-se fortament** dels centres
culturals convencionals (que devenen suaus, genèrics, "gentrified"). És
opció arriscada: pot divisor, sí, però davant un centre autogestionat amb
presència foto + art urbà, l'energia brutalista encaixa.

Quan fer-la: si l'equip vol que la web **expressi identitat** i no
simplement serveixi. Quan **no** fer-la: si l'assemblea vol tradicional.

---

## 10. Preview HTML

`/static/preview/proposta-4.html` — prototip navegable autònom.

Regles UI/UX aplicades:
- Tots els elements interactius ≥44×44px.
- Marquee aturat amb `prefers-reduced-motion: reduce`.
- Focus visible verd sobre taronja.
- Border 4px negre com a sistema de profunditat.
- Space Grotesk display + DM Sans body.