# Disseny: Calendari / Agenda d'Activitats

**Data:** 2026-08-12
**Estat:** Aprovat

---

## Resum

Substituir la llista plana d'activitats per una vista agenda amb dues agrupacions (mensual i setmanal), filtres per entitat i planta, i toggle per veure activitats passades. Implementació: Enfocament A (dues seccions Hugo completes + JS toggle).

---

## 1. Frontmatter

Afegir dos camps nous opcionals a cada `content/activitats/*.md`:

```toml
hora = "20:00"         # string HH:MM, 24h. Buit si no determinable.
planta = "Nau Bostik"  # un dels 5 valors: "Planta baixa" | "Primera planta" |
                       # "Segona planta" | "Tercera planta" | "Nau Bostik"
```

Si no s'especifica planta, el valor per defecte és `"Nau Bostik"` (genèric).

### Hores extretes dels 8 fitxers existents

| Fitxer | hora | planta |
|---|---|---|
| `tallers-creacio.md` | `"18:00"` | `"Nau Bostik"` |
| `curs-guitarra.md` | `"18:00"` | `"Nau Bostik"` |
| `cinema-independent.md` | `"20:00"` | `"Nau Bostik"` |
| `sardanes.md` | `"11:00"` | `"Nau Bostik"` |
| `trobada-fotografia.md` | `"19:00"` | `"Nau Bostik"` |
| `concert-primavera.md` | `"20:00"` | `"Nau Bostik"` |
| `fira-intercanvi.md` | `"10:00"` | `"Nau Bostik"` |
| `artivisme.md` | `"19:00"` | `"Nau Bostik"` |

---

## 2. Template `activitats/list.html`

### Estructura HTML generada per Hugo

```
[Controls]
  Botons toggle: [Mes] [Setmana]
  Pills entitat: [Totes] [Nau Bostik] [Colectiu Artivista] [Grup de Fotografia] ...
  Pills planta:  [Totes] [Nau Bostik] [Planta baixa] ...
  Botó:          [Veure arxiu]

[Secció mensual]  ← visible per defecte
  <section class="agenda-view" id="agenda-mensual">
    Per cada mes (GroupByDate "2006-01"):
      <h2 class="agenda-month-title">Abril 2026</h2>
      <ul class="agenda-list">
        Per cada activitat:
          <li class="agenda-item [agenda-item--past]"
              data-entitat="..." data-planta="...">
            <span class="agenda-item__time">20:00</span>
            <a class="agenda-item__title" href="...">Títol</a>
            <span class="agenda-item__meta">Entitat · Planta</span>
          </li>

[Secció setmanal]  ← class="agenda-view--hidden" afegida per JS
  <section class="agenda-view" id="agenda-setmanal">
    Per cada dia (GroupByDate "2006-01-02"):
      [Si canvia la setmana ISO → <p class="agenda-week-label">Setmana del X al Y</p>]
      <h3 class="agenda-day-title">Dilluns, 13 d'abril</h3>
      <ul class="agenda-list">
        (mateixa estructura de <li> que mensual)
```

### Lògica d'arxiu al template

Les activitats amb `.Date.Before now` reben la classe `agenda-item--past`. Per defecte CSS les amaga (`display: none`). El botó "Veure arxiu" commuta la classe `show-past` al contenidor pare, que via CSS les fa visibles.

### Fallback no-JS

La classe `agenda-view--hidden` s'afegeix **per JS** a `DOMContentLoaded`, no al HTML. Sense JS: les dues seccions (mensual i setmanal) estan visibles, totes les activitats (incloent les passades) apareixen.

---

## 3. CSS — classes noves a `main.css`

```
.agenda-controls        barra de controls (flex, gap, wrap)
.agenda-toggle          grup de botons Setmana/Mes
.agenda-toggle-btn      botó toggle; .is-active per al seleccionat
.agenda-filters         grup de pills per entitat o planta
.agenda-filter-btn      pill individual; .is-active quan filtre actiu
.agenda-archive-btn     botó "Veure arxiu" / "Amagar arxiu"

.agenda-view            contenidor d'una vista (mensual o setmanal)
.agenda-view--hidden    afegida per JS per ocultar una vista

.agenda-month           grup d'un mes (mensual)
.agenda-month-title     <h2> del nom del mes
.agenda-week-label      separador de setmana (setmanal)
.agenda-day-title       <h3> del dia (setmanal)

.agenda-list            <ul> d'activitats
.agenda-item            <li> targeta d'activitat
.agenda-item--past      activitat passada → display:none per defecte
                        visible quan l'avantpassat té .show-past
.agenda-item__time      hora (HH:MM)
.agenda-item__title     títol, enllaç
.agenda-item__meta      entitat + planta
```

Tot usant variables CSS existents: `--color-*`, `--spacing`, `--radius-sharp`, `--fs-*`.

---

## 4. JS — funció `initAgenda()` a `main.js`

Cridada des de `DOMContentLoaded`. Responsabilitats:

1. **Amagat inicial:** afegeix `agenda-view--hidden` a `#agenda-setmanal`.
2. **Toggle vistes:** botons `.agenda-toggle-btn` commuten `agenda-view--hidden` entre les dues seccions i `is-active` entre botons.
3. **Toggle arxiu:** `.agenda-archive-btn` commuta la classe `show-past` al `<main>` de la pàgina (selector CSS: `.show-past .agenda-item--past { display: block }`), actualitza el text del botó.
4. **Filtres pills:** lògica de filtratge:
   - Cada pill té `data-filter-type` (`entitat` o `planta`) i `data-filter-value`.
   - En clicar una pill, commuta `is-active`. Pill "Totes" desactiva la resta del grup.
   - Recalcula visibilitat de cada `.agenda-item`: ha de complir el filtre actiu d'entitat **AND** el filtre actiu de planta. Sense filtre actiu en un grup = qualsevol valor vàlid.
   - Aplica `display:none` / `display:''` inline als items que no passen el filtre.

Estimació: ~80 línies vanilla JS, sense dependències.

---

## 5. i18n

**Claus noves** a `i18n/ca.toml` i `i18n/en.toml`:

| Clau | Català | Anglès |
|---|---|---|
| `agenda_view_month` | `Mes` | `Month` |
| `agenda_view_week` | `Setmana` | `Week` |
| `agenda_filter_all` | `Totes` | `All` |
| `agenda_archive_show` | `Veure arxiu` | `Show archive` |
| `agenda_archive_hide` | `Amagar arxiu` | `Hide archive` |
| `agenda_week_of` | `Setmana del %s al %s` | `Week of %s to %s` |

---

## 6. Fitxers afectats

| Fitxer | Canvi |
|---|---|
| `content/activitats/*.md` (×8) | Afegir `hora` + `planta` al frontmatter |
| `themes/NauBostik/layouts/activitats/list.html` | Reescritura completa |
| `themes/NauBostik/static/css/main.css` | Afegir classes `.agenda-*` al final |
| `themes/NauBostik/static/js/main.js` | Afegir funció `initAgenda()` |
| `i18n/ca.toml` | 6 claus noves |
| `i18n/en.toml` | 6 claus noves (anglès) |
| `archetypes/activitats.md` | Afegir camps `hora` i `planta` si existeix |

**No es toca:** `hugo.toml`, `netlify.toml`, cap altre layout ni cap altre fitxer de contingut.

---

## 7. Criteris d'acceptació

- `hugo --minify` sense errors ni warnings nous.
- Vista mensual funciona amb JS desactivat (mostra totes les activitats agrupades per mes).
- Filtres entitat/planta funcionen amb JS activat sense recarregar la pàgina.
- Toggle Setmana/Mes funciona amb JS activat.
- Botó "Veure arxiu" mostra/amaga activitats passades.
- Comprovat a 360px, 768px i ≥1100px.
- `HISTORIA.md` actualitzada amb l'entrada de sessió.
