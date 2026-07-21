# Proposta d'arquitectura web #1 — «La Nau App»

**Model:** GLM-5.2 · **Data:** 2026-07-22
**Enfocament:** Mobile-first app-like · Bottom navigation + cards adaptables

> Idea central: el telèfon veu una **app** (bottom nav amb 5 icones, cap
> menú superior, tot a una polzada); l'escriptori veu el mateix contingut
> reorganitzat en **graelles de cards** amples. Sense disseny separat —
> el mateix HTML, dues breakpoints.

---

## 1. Esquema de navegació

```
                    ┌─────────────────────────────────────────┐
                    │              HOME ( /

                    │
                    │  Claim fundacional + Hero visual
                    │  3 activitats destacades
                    │  Accés ràpid a 6 destins
                    └───────────────┬─────────────────────────┘
                                    │
            ┌───────────┬───────────┼───────────┬───────────┐
            │           │           │           │           │
        ┌───▼───┐   ┌───▼───┐   ┌───▼───┐   ┌───▼───┐   ┌───▼───┐
        │AGENDA │   │NAU   │   │ARXIU │   │NAU   │   │UNIR+ │
        │Activ. │   │Espais│   │Foto/ │   │Vida  │   │Sòcia │
        │       │   │      │   │Art   │   │(qui   │   │Apoio │
        │       │   │      │   │      │   │som)  │   │Trans │
        └───┬───┘   └───┬──┘   └───┬──┘   └───┬──┘   └───┬──┘
            │           │          │           │          │
         pròpia      per planta  filtres    història    fes-te
         entitats    lloguer     autor      assemblea    soci
         filtres     reserva    disciplina  equip       donació
                                          comissions  transparença
                                          contacte
```

**Bottom Navigation (5 icones, sempre visible a mobile):**

| Icona | Label | Destí |
|-------|-------|-------|
| 📅 | Agenda | `/activitats/` |
| 🏛 | Nau | `/espais/` |
| 🖼 | Arxiu | `/arxiu/` |
| ℹ️ | Nau Vida | `/qui-som/` |
| ✊ | Unir-m'hi | `/participa/` |

A desktop les mateixes 5 es turbuen com a **nav horitzontal** amb logo a
l'esquerra, CTA “Fes-te sòcia” a la dreta.

---

## 2. Mockup — Mobile (≤768px)

```
┌──────────────────────────────┐
│ ✊ La Sagrera > TAV          │ ← claim sticky translúcid
├──────────────────────────────┤
│                              │
│  [   HERO IMATGE PRÒPIA   ]  │ ← Foto de resident, no Unsplash
│   Crèdit: @grupfotografia   │
│                              │
├──────────────────────────────┤
│  AQUESTA SETMANA            │
│                              │
│  ┌──────────┐ ┌──────────┐  │
│  │ Concert  │ │ Tallers  │  │ ← Cards horitzontals scroll-snap
│  │ 18/4 20h │ │ L-D 18h  │  │
│  │ Sala Pr. │ │ Taller 1 │  │
│  │ [Details]│ │ [Details]│  │
│  └──────────┘ └──────────┘  │
│                              │
├──────────────────────────────┤
│  NAU BOSTIK EN 30s          │
│  > 30 entitats · 4 plantes  │
│  > Autogestionat · Sagrera   │
│  > Fotografia + art urbà     │
│                              │
├──────────────────────────────┤
│  FES-TE SÒCIA               │
│  A partir de 5€/mes          │
│  [✊ Una-me]                 │
├──────────────────────────────┤
│                              │
│  [📅][🏛][🖼][ℹ️][✊]          │ ← Bottom nav fixed
└──────────────────────────────┘
```

**Jerarquia tàctil a mobile:**
1. Hero imatge pròpia + claim.
2. Cards horitzontals amb activitats (scroll-snap).
3. Micro-descripció de la nau.
4. CTA sòcia.
5. Bottom nav fixa.

---

## 3. Mockup — Desktop (≥1100px)

```
┌──────────────────────────────────────────────────────────────────┐
│ [LOGO]   Agenda  Nau  Arxiu  Nau Vida  Unir-m'hi   [Fes-te sòcia]│
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✊ «La Sagrera necessita més un centre cultural que             │
│     una estació d'alta velocitat.»                              │
│                                                                  │
│  [────────────  HERO IMATGE (1200×500)  ───────────── ]         │
│   Crèdit: @grupfotografia · Nau Bostik, 2024                    │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  AQUESTA SETMANA                              Veure agenda →    │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  Concert │ │  Tallers │ │  Cinema  │ │  Fira    │           │
│  │  18/4    │ │  L-D 18h │ │  Div 20h │ │  20/4    │           │
│  │  Sala Pr │ │  Taller 1│ │  Actes   │ │  Exterior│           │
│  │  Ara →   │ │  Ara →   │ │  Ara →   │ │  Ara →   │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  NAU BOSTIK                       │  PARTICIPA                  │
│                                   │                            │
│  30 entitats · 4 plantes · 2000m² │  ✊ Fes-te sòcia (5€/mes) │
│  Autogestionat · Sagrera          │  🏡 Lloga un espai          │
│  Fotografia + art urbà + arquitec.│  📩 Proposa una activitat   │
│                                   │  📬 Butlletí setmanal      │
│  [Coneix la nau →]                │                            │
├──────────────────────────────────────────────────────────────────┤
│  COMUNITAT A LA NAU                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │Mesclad │ │Azimut  │ │Trèbol  │ │Grup    │ │Colla   │        │
│  │is      │ │360     │ │        │ │Fotogra. │ │Sardan. │        │
│  │Coop.   │ │Coop.   │ │Proj.   │ │Col·l.  │ │Colla   │        │
│  │[Veure→]│ │[Veure→]│ │[Veure→]│ │[Veure→]│ │[Veure→]│        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
├──────────────────────────────────────────────────────────────────┤
│  ARXIU DESTACAT                    Veure arxiu →               │
│  [──────── 3 imatges en mosaico ──────── ]                     │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER: Adreça · Contacte · Xarxes · Privacitat · Transparèn. │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Tipus de continguts per secció

| Secció | Tipus de contingut | Layout | Frontmatter |
|--------|-------------------|--------|-------------|
| Home | Hero + 3 cards activitats + micro-resum + CTA sòcia + 5 cards residents + mosaic arxiu | Vertical scroll | `home.html` |
| Agenda | Llista de cards, filtres per entitat/disciplina/espai/data | Grid 2-3 col · scroll snap mobile | `data_inici`, `data_fi`, `espai`, `disciplina` |
| Nau (espais) | Cards per planta amb foto o placeholder | Grid per planta | `planta`, `imatge`, `capacitat`, `superficie` |
| Arxiu | Mosaic滤re de fotos amb filtres per any/autor/disciplina | Grid 3-4 col masonry | `data`, `autor`, `disciplina`, `ubicacio`, `estat` |
| Nau Vida (qui som) | Història + valors + assemblea + equip + comissions | Long-form amb cards laterals | — |
| Unir-m'hi | 4 rutas: sòcia / lloguer / propose / butlletí | Tabs o accordion | — |
| Resident individual | Foto + tipus + horari regular + bio + contacte | Card-expandable | `tipus`, `horari_regular`, `web externa` |
| Transparència | Pressupostos + decisions + manifestos | Taula + documents PDF | — |

---

## 5. Innovació d'aquesta proposta

- **Bottom nav fixa a mobile** — cap home cultural català la fa
  (Hangar, La Escocesa, Can Batlló usen menú burger tradicional).
- **Claim fundacional sticky** al top del viewport, translúcid, sempre
  visible. Recorda el posicionament polític sense drecera.
- **Scroll-snap horitzontal** a les carts d'activitats a mobile = look
  app iOS/Android (Instagram Stories).
- **CTA "Fes-te sòcia"** accessible des de 2 punts (home + nav).
- **Un sol disseny, dues breakpoints** — no disseny separat mobile/desktop.

---

## 6. Elements tècnics

- **CSS:** `position: sticky` per al claim, `scroll-snap-type: x
  mandatory` per als cards, `aspect-ratio` per a imatges, CSS Grid per
  als layouts.
- **JS:** minimal — només filtres client-side i toggle de bottom nav a
  scroll-down (amaga el nav quan es baixa, apareix quan es puja, estil
  Chrome mobile).
- **Hugo:** `home.html` reescrita, 5 nous partials
  (`hero`, `card-activitat`, `card-resident`, `mosaic-arxiu`, `cta-socia`).
- **Sense JS crític** — sense JS el claim, el hero i els cards es
  renderitxen igual (fallback scroll manual).

---

## 7. Verificació contra els requisits

| Requisit | Com es compleix |
|----------|----------------|
| Mobile app-like amb icones | Bottom nav fixa amb 5 icones 👆 |
| Desktop amb cards adaptables | Grid 3-4 columnes, cards fluides |
| Innovadora | Scroll-snap + claim sticky + bottom nav fixa |
| Fàcil accés a tota info | 5 destins clars + search |
| Sorprenent | Cap centre català usa bottom nav; és un patró Instagram/Spotify |