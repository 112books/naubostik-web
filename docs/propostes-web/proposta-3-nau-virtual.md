# Proposta d'arquitectura web #3 — «La Nau Virtual»

**Model:** GLM-5.2 · **Data:** 2026-07-22
**Enfocament:** Innovadora i sorprenent · Planta virtual interactiva

> Idea central: la web **és la nau**. El visitant hi entra i recorre les
> plantes virtualment. La home és una **visualització isomètrica** de la
> nau (com un mapa de videojoc); fer clic a una sala et porta al seu
> contingut. A mobile és una llista vertical de plantes amb mini-cards
> expands; a desktop és la projecció isomètrica gran. La innovació: cap
> centre cultural fa això — és patró de museus d'arquitectura (Hakovox,
| Barbican) i festivals (Sónar+D). La nau **és** la interfície.

---

## 1. Esquema de navegació

```
                         ┌──────────────────────────────┐
                         │         HOME ( /

                         │
                         │  = La NAU en planta isomètrica
                         │  = Click sala → contingut
                         └──────────────┬───────────────┘
                                        │
            ┌───────────────────────────┼─────────────────────────────┐
            │                           │                             │
       ┌────▼───┐                 ┌─────▼────┐                 ┌─────▼────┐
       │PLANTA  │                 │  SEARCH  │                 │  ACCIONS │
       │BAIXA   │                 │  × Nau   │                 │  (sticky │
       │        │                 │  × (overlay)                 │  fuselatge)│
       └────┬───┘                 └─────┬────┘                 └─────┬────┘
            │                           │                            │
       ┌────▼───┐                 ┌─────▼────┐                 ┌─────▼────┐
       │PRIMERA │                 │ Agenda    │                 │ Fes-te   │
       │PLANTA  │                 │ Residents │                 │ sòcia    │
       └────┬───┘                 │ Espais    │                 │ Lloguer  │
            │                     │ Arxiu     │                 │ Proposa  │
       ┌────▼───┐                 │ Notícies  │                 │ Butlletí │
       │SEGONA │                 └───────────┘                 │ Transpar.│
       │PLANTA  │                                               └──────────┘
       └────┬───┘
            │
       ┌────▼───┐
       │TERCERA│
       │PLANTA │
       └────────┘
```

**Triple model de navegació:**
1. **La nau** (visual):click a sala → pàgina.
2. **Cercador** (overlay desplegable): tipus Spotlight macOS.
3. **Accions** (sticky dreta, vertical): botons de accions rápides.

A desktop, les 3 conviuen. A mobile, la nau és la viewport principal;
search i accions són icones dalt.

---

## 2. Mockup — Mobile (≤768px)

```
┌──────────────────────────────┐
│ [≡]        NAU BOSTIK   [🔍][✊]│
├──────────────────────────────┤
│                              │
│ ✊ La Sagrera > TAV          │
│                              │
├──────────────────────────────┤
│                              │
│  ENTRA A LA NAU              │
│                              │
│  ┌──────────────────────────┐│
│  │      ▲ TERCERA           ││ ← planta 3 (calla)
│  │      │                   ││
│  │  ┌───┴────┐              ││
│  │  │Sala    │              ││
│  │  │Actes   │              ││
│  │  └────────┘              ││
│  │      │                   ││
│  │      ▲ SEGONA            ││ ← planta 2
│  │      │                   ││
│  │  ┌───┴────┐              ││
│  │  │Biblio. │              ││
│  │  │Tallers │              ││
│  │  └────────┘              ││
│  │      │                   ││
│  │      ▲ PRIMERA           ││ ← planta 1
│  │  ┌───┴────┐              ││
│  │  │Sala    │              ││
│  │  │Principal│             ││
│  │  └────────┘              ││
│  │      │                   ││
│  │      ▼ PLANTA BAIXA      ││ ← PB (entrada)
│  │  ┌────────┐ ┌─────────┐  ││
│  │  │Pati    │ │Polival.1│  ││
│  │  │Exterior│ │         │  ││
│  │  └────────┘ └─────────┘  ││
│  └──────────────────────────┘│
│                              │
├──────────────────────────────┤
│  AQUESTA SETMANA (resum)     │
│  > Concert 18/4 20h · Sala  │
│  > Tallers Dl-Ds · Taller 1 │
│                              │
├──────────────────────────────┤
│  FES-TE SÒCIA  [✊]          │
└──────────────────────────────┘
```

Mobile la **nau vertical** funciona com a scroll-experience. Cada sala és
un card mini-expandable: tap → mostra horaris + propera activitat +
«Veure més».

---

## 3. Mockup — Desktop (≥1100px)

```
┌──────────────────────────────────────────────────────────────────┐
│ [LOGO]  NAU BOSTIK                            [🔍]  [✊ Sòcia]    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  «La Sagrera necessita més un centre cultural                    │
│   que una estació d'alta velocitat.»                            │
│                                                                  │
├─────────────────────────────────────────┬────────────────────────┤
│                                         │                        │
│   [           PROJECCIÓ ISOMÈTRICA      │  AQUESTA SETMANA       │
│      DE LA NAU (1200×600,(grafisme      │                        │
│      il·lustrat, no foto)]             │  ┌────────────────┐    │
│                                         │  │ Concert 18/4    │    │
│         ┌────┐                          │  │ Sala Principal   │    │
│        ╱│Acte│╲ TERCERA                 │  │ 20h · Donatiu   │    │
│       ╱ └────┘ ╲                        │  └────────────────┘    │
│      ╱           ╲                      │  ┌────────────────┐    │
│     ╱  ┌────┐     ╲                     │  │ Tallers Dl-Ds    │    │
│    ╱   │Bib.│      ╲ SEGONA            │  │ Taller 1         │    │
│   ╱    └────┘       ╲                    │  │ 18-21h          │    │
│  ╱                   ╲                   │  └────────────────┘    │
│ ╱   ┌─────────┐       ╲                  │                        │
│ │   │Sala     │        ╲ PRIMERA        │  PARTIPA-HI            │
│ │   │Principal│         ╲                │  ┌────────────────┐   │
│ │   └─────────┘          ╲              │  │ ✊ Fes-te sòcia  │   │
│ │                           ╲            │  │ 5€/mes          │   │
│ │   ┌────┐ ┌────┐           ╲           │  └────────────────┘   │
│ │   │Pati│ │Pol.│            ╲ PB      │  ┌────────────────┐   │
│ │   │Ext.│ │1  │             ╲         │  │ 🏡 Lloguer      │   │
│ │   └────┘ └────┘                      │  └────────────────┘   │
│ │        [ENTRADA]                      │  ┌────────────────┐   │
│ └                                        │  │ 📩 Proposa       │   │
│                                          │  └────────────────┘   │
├─────────────────────────────────────────┴────────────────────────┤
│  COMUNITAT A LA NAU                                              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │Mesclad │ │Azimut  │ │Trèbol  │ │Fotogra. │ │Sardan. │        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
├──────────────────────────────────────────────────────────────────┤
│  ARXIU DESTACAT                    Veure arxiu →               │
│  [ mosaic de 3 imatges ]                                         │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER                                                          │
└──────────────────────────────────────────────────────────────────┘
```

La projecció isomètrica és un **SVG inline** generat a build-time per Hugo
a partir de `data/espais.yaml` + `data/plantes.yaml`. Cada sala és un
`<a href="/espais/sala-principal/">` amb `aria-label`. És accessible
(navegable amb teclat) i **sense JS**.

---

## 4. tipus de continguts per secció

| Secció | Què és | Layout | Frontmatter / data |
|--------|--------|--------|---------------------|
| Home (La Nau) | Visualització isomètrica de la nau | SVG inline + sidebar | `data/plantes.yaml`, `data/espais.yaml` |
| Planta (cada sala) | Pàgina individual amb foto + equipament + horaris + activitats properes | Single 720px | `planta`, `imatge`, `capacitat`, `superficie`, `horari` |
| Agenda | Filtres per data/espai/disciplina + cards | Grid + filtres client-side | `data_inici`, `data_fi`, `espai`, `disciplina` |
| Cercador | Overlay desplegable (tipus Spotlight) | Modal inline | — |
| Accions (sticky lateral) | 5 botons verticals: Sòcia, Lloguer, Proposa, Butlletí, Transparència | Sticky vertical desktop, flatten a mobile | — |
| Residents | Cards per tipus, expandable per sala (link sala → resident) | Grid filterable | `tipus`, `horari_regular`, `sala_representativa` |
| Arxiu | Mosaic de fotos amb filtre per any/autor/disciplina | Masonry 3-4 col | `data`, `autor`, `disciplina`, `ubicacio` |
| Transparència | Taula de decisions d'assemblea + pressupostos | Taula + PDFs | — |

---

## 5. Innovació d'aquesta proposta

- **La nau és la interfície.** Cap centre cultural català (ni europeu
  dels estudiats) fa que la home sigui el **edifici mateix**. És patró
  exotic al sector.
- **SVG isomètrica generada a build-time.** No és un 3D WebGL — és un
  **SVG inline generat per Hugo** a partir de YAML. Cost de render 0,
  accessible a teclat, sense JavaScript.
- **Triple model d'accés simultani**: click visual (nau) + spotlight
  (search) + sticky dreta (accions). Cada públic té el seu camí:
  - veïnat → click visual.
  - professional → spotlight.
  - simpatitzant → sticky dreta.
- **Expandable**. El mateix SVG isomètric pot tenir capes futures:
  horaris de sala (color superposat), PRÒXIMA activitat (polsant light),
  estat d'ocupació (vermell/verd), arxiu històric d'exposicions a cada
  sala. És una interfície **viva** capaç de créixer sense reescriure
  res.
- **Educació organitzativa implícita.** Mostrar la nau isomètricament
  ensenya a tothom **com s'estructura** el centre — millor que cap
  descripció textual.

---

## 6. Elements tècnics

- **Hugo:** `data/plantes.yaml` (geometry: width, height, x, y, z per
  sala) + `data/espais.yaml` (metadades). Plantilla
  `home.html` genera SVG inline amb un range sobre les dades.
- **SVG:** rectangles amb `transform: skew` per a l'isomètric o directe
  path calculats. `stroke="currentColor"` + `fill="var(--color-surface)"`.
  Hover: `fill="var(--color-accent)"`.
- **CSS:** sticky isomètric a desktop (2 col), stack vertical a mobile.
  Spotlight: `dialog` HTML5 o `overlay` amb `popover` (suport Chrome 114+).
- **JS:** 0 per al navegador isomètric. Només per al spotlight
  (desplegar) i per als filtres client-side. **Contingut crític sense JS.**
- **Accessibilitat:** cada sala ès un `<a>` amb `aria-label` complet
  («Sala Principal, planta baixa, capacitat 150 persones»). Navegable
  amb Tab. Visualment és un diagrama; semànticament és una llista.

---

## 7. Comparativa amb les altres propostes

| Dimensió | Proposta 1 (App) | Proposta 2 (Portes) | Proposta 3 (Nau Virtual) |
|----------|-----------------|---------------------|--------------------------|
| Metàfora | App mobile | 3 portals per públic | El edifici és la interfície |
| Mobile | Bottom nav + scroll-snap | 3 cards apilades | Nau vertical scroll |
| Desktop | Hero + grid cards | 3 columnes portal | SVG isomètric + sidebar |
| innovació | Bottom nav (raro al sector) | Inten-based navigation | Visualització de l'edifici |
| Risc tècnic | Baix | Mig (rebents URLs) | Mig (isos gen per build) |
| Accessibilitat | Alta | Alta | Alta si SVG correctament |
| Cost implementació | S | M | L (duc YAML geometry) |
| Adaptació futur | Limitada | Limitada a 3 empreses | Alta (capes superposables) |

---

## 8. Recomanació d'ús

Aquesta proposta és alta risc-alta recompensa. És la més **sorprenent**
i la més **expressiva de la identitat de Nau Bostik** (un espai físic
amb presencia arquitectónica forta), però també la més complexa
d'implementar. **Recomano considerar-la seriosament perquè cap altre
centre la fa**, però fer-la només si hi ha 1 setmanas per a YAML + SVG.

Si la complexetat preocupa: **híbrid possible** — propostes 1 i 3
fusionades: app bottom nav per mobile + nau virtual per a desktop. La
nau virtual és un «visualitzación opcional» accessible des de la home,
no obligatoria.

---

## 9. Verificació contra els requisits

| Requisit | Com es compleix |
|----------|----------------|
| Mobile app-like amb icones | Nau vertical + icones search/acció dalt |
| Desktop amb cards adaptables | SVG isomètric + sidebar de cards dreta |
| Innovadora i sorprenent | Cap centre cultural fa això; patró d'arquitectura museus |
| Fàcil accés a tota info | Triple navegació simultanea (visual + search + accions) |
| Sense por a sorprendre | La nau És la interfície |