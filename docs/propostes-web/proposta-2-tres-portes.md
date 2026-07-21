# Proposta d'arquitectura web #2 — «Tres Portes»

**Model:** GLM-5.2 · **Data:** 2026-07-22
**Enfocament:** Desktop cards adaptables · 3 portals d'entrada per públic

> Idea central: la home **no tria un públic** — presenta **3 portes clares**
> (Veure què hi ha / Conèixer la nau / Participar-hi), i cadascuna porta a
> un sub-lloc amb el seu propi to. A desktop les 3 portes són columnes
> amples amb imatge i CTA; a mobile són cards apilats. El ripple
> d'arquitectura s'organitza no per secció administrativa sinó per
> **inten del visitant**.

---

## 1. Esquema de navegació

```
                         ┌──────────────────────────────┐
                         │         HOME ( /

                         │
                         │  Claim fundacional + Hero
                         │
                         │  ┌───────┬─────────┬────────┐
                         │  │VEURE  │ CONÈIXER│PARTIC. │
                         │  │qué fa │ la nau  │ -hi    │
                         │  └───┬───┴────┬────┴────┬───┘
                         └──────┼────────┼─────────┼──────┘
                                │        │         │
                ┌───────────────┼────────┼─────────┼───────────┐
                │               │        │         │           │
            ┌───▼───┐       ┌───▼───┐ ┌───▼───┐ ┌───▼───┐ ┌───▼───┐
            │AGENDA │       │NAU   │ │ARXIU │ │NAU   │ │SÒCIA │
            │Activ. │──┐    │Espais│ │Foto/ │ │Vida  │ │Donació│
            │       │  │    │      │ │Art   │ │Histò.│ │Lloguer│
            └───────┘  │    └──────┘ └──────┘ │Assem.│ │Proposa│
                       │                      │Equipe│ │Butlle│
                   ┌───▼────┐                  └──────┘ └──────┘
                   │Cercar  │                              ▲
                   │(search)│                              │
                   └────────┘                              │
                           └──────────────────────────────┘
                                    (feedback loop:
                                     「participa」 flow
                                     porta a  action)
```

**Taxonomia de 3 portes (cada porta és un color + iconaoina):**

| Porta | Color | Icona | Què conté |
|-------|-------|-------|-----------|
| **Veure** | verd `#2d8a49` | 👁 | Agenda, espais exteriors/interiores, cercador |
| **Conèixer** | blu `#1a4e8a` | 📖 | Qui som, història, assemblea, residents, arxiu |
| **Participar** | rojo accent `#c41e3a` | ✊ | Fes-te sòcia, lloguer, propose activitat, butlletí, transparència |

Aquests colors s'usen com a **menus de"context** (accent subtil, no
flood): un subratllat de color al nav, un pill de color al breadcrumb.

---

## 2. Mockup — Mobile (≤768px)

```
┌──────────────────────────────┐
│ [≡]        NAU BOSTIK   [🔍] │ ← nav simple (burger + search)
├──────────────────────────────┤
│                              │
│ ✊ La Sagrera > TAV          │
│                              │
│   [   HERO IMATGE PRÒPIA   ]  │
│                              │
├──────────────────────────────┤
│                              │
│  Tria què vols fer:          │
│                              │
│  ┌──────────────────────────┐│
│  │ 👁  VEURE QUÈ HI HA       ││ ← color verd
│  │ Agenda · Espais · Cercar  ││
│  │                      [→] ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │ 📖  CONÈIXER LA NAU       ││ ← color blau
│  │ Qui som · Residents ·     ││
│  │ Arxiu · Història      [→] ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │ ✊  PARTICIPAR-HI          ││ ← color rojo
│  │ Sòcia · Lloguer ·         ││
│  │ Proposa · Butlletí    [→] ││
│  └──────────────────────────┘│
│                              │
├──────────────────────────────┤
│  EXTERNA                     │
│  > 30 entitats · Sagrera      │
│  > Autogestionat              │
│  > Foto + art urbà + arq.     │
└──────────────────────────────┘
```

**Pàgina interna "Veure" (ex.):**

```
┌──────────────────────────────┐
│ [←]  👁 VEURE        [🔍]    │
├──────────────────────────────┤
│                              │
│  AQUESTA SETMANA              │
│  ┌──────────────────────────┐│
│  │ 📅 Concert 18/4 20h       ││
│  │    Sala Principal         ││
│  │    A donatiu · [Details→] ││
│  └──────────────────────────┘│
│  ┌──────────────────────────┐│
│  │ 📅 Tallers Dl-Ds 18-21h   ││
│  │    Taller 1               ││
│  │    Donatiu · [Details→]   ││
│  └──────────────────────────┘│
│                              │
│  ACTIVITATS REGULARS         │
│  > Cinema (Divendres 20h)    │
│  > Sardanes (Dissabte 11h)   │
│  > Fotografia (Dimarts 19h)  │
│                              │
│  ESPAIS                      │
│  > Planta Baixa (5 espais)   │
│  > Primera (3 espais)        │
│  > Segona (2 espais)         │
└──────────────────────────────┘
```

---

## 3. Mockup — Desktop (≥1100px)

```
┌──────────────────────────────────────────────────────────────────┐
│ [LOGO] NAU BOSTIK        Veure · Conèixer · Participar   [🔍][✊]│
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│        «La Sagrera necessita més un centre cultural              │
│         que una estació d'alta velocitat.»                       │
│                                                                  │
│   [────────────  HERO IMATGE 1200×400  ────────────── ]         │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Tria què vols fer:                                             │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │ 👁           │ │ 📖           │ │ ✊           │             │
│  │              │ │              │ │              │             │
│  │  VEURE       │ │  CONÈIXER    │ │  PARTICIPAR  │             │
│  │  QUÈ HI HA   │ │  LA NAU      │ │  -HI         │             │
│  │              │ │              │ │              │             │
│  │ Agenda       │ │ Qui som      │ │ Fes-te sòcia │             │
│  │ Espais       │ │ Residents    │ │ Lloguer      │             │
│  │ Cercar       │ │ Arxiu        │ │ Proposa      │             │
│  │              │ │ Història     │ │ Butlletí     │             │
│  │   [Entrar→] │ │   [Entrar→] │ │   [Entrar→] │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  AQUESTA SETMANA                              Veure agenda →    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Card 1   │ │ Card 2   │ │ Card 3   │ │ Card 4   │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
├──────────────────────────────────────────────────────────────────┤
│  ULTIMA NOTÍCIA                              Butlletí →         │
│  [Notícia destacada amb imatge]                                  │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER                                                          │
└──────────────────────────────────────────────────────────────────┘
```

**Pàgina interna "Veure" a desktop:**

```
┌──────────────────────────────────────────────────────────────────┐
│ [LOGO]  Veure · Conèixer · Participar              [🔍][✊ sòcia]│
├──────────────────────────────────────────────────────────────────┤
│  👁 VEURE  >  Agenda                                              │
│                                                                  │
│  [filtre: tots | propi | entitat] [filtre: data] [filtre: espai] │
│                                                                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                                   │
│  │ C1 │ │ C2 │ │ C3 │ │ C4 │   ← Grid de cards adaptables        │
│  └────┘ └────┘ └────┘ └────┘     (minmax 280px, auto-fill)        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                                   │
│  │ C5 │ │ C6 │ │ C7 │ │ C8 │                                   │
│  └────┘ └────┘ └────┘ └────┘                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Tipus de continguts per porta

| Porta | Pàgina | Tipus | Layout | Frontmatter |
|-------|--------|-------|--------|-------------|
| Veure | Agenda | Cards d'activitat | Grid + filtres | `data_inici`, `data_fi`, `espai`, `disciplina`, `entitat` |
| Veure | Espais | Cards per planta | Grid per planta | `planta`, `imatge`, `capacitat` |
| Veure | Cercador | Input + resultats | Llista | — |
| Conèixer | Qui som | Long-form | Single column 720px | — |
| Conèixer | Residents | Cards per tipus | Grid filterable | `tipus`, `horari_regular`, `web` |
| Conèixer | Arxiu | Mosaic de fotos | Masonry | `data`, `autor`, `disciplina` |
| Conèixer | Història | Timeline | Vertical scroll | — |
| Participar | Sòcia | Form + beneficis | Step-form | — |
| Participar | Lloguer | Form + preus | Form multipage | — |
| Participar | Proposa | Form + condicions | Form multipage | — |
| Participar | Butlletí | Form + tags | Inline form | — |
| Participar | Transparència | Taula de decisions + pressupostos | Taula + docs | — |

---

## 5. Innovació d'aquesta proposta

- **Arquitectura per intend, no per secció administrativa.** La majoria
  de webs culturals s'organitzen per «què som» (Qui som, Activitats,
  Espais…) — això és l'estructura interna del centre. Aquí és **què vol
  fer el visitant** (veure, conèixer, participar). Alinea amb la
  declaració de l'usuari: «comunicar què oferim a cada un dels públics».
- **Color de context.** Cada porta té el seu color d'accent que segueix
  l'usuari a través del sub-lloc. Crea brança visual i memòria espacial
  sense necessitar breadcrumb text.
- **3 portes a desktop com a bento principal.** La home no té 9 seccions
  «útils» — té només **3 camins clars**. Redueix terboleig i incrementa
  conversió (cada porta té un CTA visible).
- **4-5 centres anàlegs**: Westergas té una home amb 3 pillars (Agenda,
  In the District, Business & Events); NDSM té art & events + agenda +
  news. Però **cap té colours-by-intent**.

---

## 6. Elements tècnics

- **CSS:** CSS Grid per a les 3 columnes portes a desktop, stack a
  mobile. `pill` amb accent color via `::before`. Filtres client-side.
- **Hugo:** nova `home.html` amb tres blocks; plantilles `layouts/veure/`,
  `layouts/coneixer/`, `layouts/participar/` com a secciónadors. Cal
  sobrescriure per拓宽 directs al seu sub-url (p ex `/agenda/` sota veure,
  no `/activitats/` a l'arrel). Cal pensar redirects o subseccions.
- **Pre-existir**: es pot fer **sense trencar** els URL actuals — redirigint
  `/activitats/` → `/veure/agenda/` etc.

---

## 7. Verificació contra els requisits

| Requisit | Com es compleix |
|----------|----------------|
| Mobile app-like amb icones | 3 cards apilades amb icona gran 👁 📖 ✊ |
| Desktop amb cards adaptables | 3 columnes-portal + grid de cards dins cada porta |
| Innovadora | Arquitectura per intend, no per secció; colors de context |
| Fàcil accés a tota info | 3 portes = 3 decisions; cada porta té submenu clar |
| Sorprenent | Cap web cultural fa portal-per-intend amb colors de context |