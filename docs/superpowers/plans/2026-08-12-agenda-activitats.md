# Agenda d'Activitats — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir la llista plana d'activitats per una vista agenda amb agrupació mensual i setmanal, filtres per entitat i planta, i toggle per veure activitats passades.

**Architecture:** Enfocament A — Hugo genera dues seccions HTML completes (mensual + setmanal) al template `list.html`. JS vanilla afegeix `agenda-view--hidden` a la vista setmanal a `DOMContentLoaded` i gestiona tots els toggles i filtres sense peticions de xarxa. Fallback no-JS: totes les activitats visibles en les dues vistes.

**Tech Stack:** Hugo 0.147.0, CSS vanilla amb CSS custom properties, JS vanilla ~80 línies, sense cap llibreria ni build step.

---

## Mapa de fitxers

| Fitxer | Acció |
|---|---|
| `content/activitats/tallers-creacio.md` | Modificar: afegir `hora`, `planta` |
| `content/activitats/curs-guitarra.md` | Modificar: afegir `hora`, `planta` |
| `content/activitats/cinema-independent.md` | Modificar: afegir `hora`, `planta` |
| `content/activitats/sardanes.md` | Modificar: afegir `hora`, `planta` |
| `content/activitats/trobada-fotografia.md` | Modificar: afegir `hora`, `planta` |
| `content/activitats/concert-primavera.md` | Modificar: afegir `hora`, `planta` |
| `content/activitats/fira-intercanvi.md` | Modificar: afegir `hora`, `planta` |
| `content/activitats/artivisme.md` | Modificar: afegir `hora`, `planta` |
| `i18n/ca.toml` | Modificar: afegir 6 claus `.agenda_*` |
| `i18n/en.toml` | Modificar: afegir 6 claus `.agenda_*` |
| `themes/NauBostik/layouts/activitats/list.html` | Reescriure completament |
| `themes/NauBostik/static/css/main.css` | Afegir bloc `/* === AGENDA === */` al final |
| `themes/NauBostik/static/js/main.js` | Afegir `initAgenda()` + crida a DOMContentLoaded |

---

## Task 1: Frontmatter — afegir hora i planta als 8 fitxers

**Files:**
- Modify: `content/activitats/tallers-creacio.md`
- Modify: `content/activitats/curs-guitarra.md`
- Modify: `content/activitats/cinema-independent.md`
- Modify: `content/activitats/sardanes.md`
- Modify: `content/activitats/trobada-fotografia.md`
- Modify: `content/activitats/concert-primavera.md`
- Modify: `content/activitats/fira-intercanvi.md`
- Modify: `content/activitats/artivisme.md`

- [ ] **Step 1: Afegir camps a `tallers-creacio.md`**

El frontmatter ha de quedar:
```toml
+++
title = "Tallers de creació"
date = 2026-04-07
draft = false
hora = "18:00"
planta = "Nau Bostik"
+++
```

- [ ] **Step 2: Afegir camps a `curs-guitarra.md`**

```toml
+++
title = "Nou curs de guitarra"
date = 2026-04-10
draft = false
hora = "18:00"
planta = "Nau Bostik"
+++
```

- [ ] **Step 3: Afegir camps a `cinema-independent.md`**

```toml
+++
title = "Cicle de cinema independent"
date = 2026-04-11
draft = false
hora = "20:00"
planta = "Nau Bostik"
+++
```

- [ ] **Step 4: Afegir camps a `sardanes.md`**

```toml
+++
title = "Sardanes a la Nau"
date = 2026-04-12
entitat = "Colla Sardanista del Poble-sec"
draft = false
hora = "11:00"
planta = "Nau Bostik"
+++
```

- [ ] **Step 5: Afegir camps a `trobada-fotografia.md`**

```toml
+++
title = "Trobada de fotografia"
date = 2026-04-15
entitat = "Grup de Fotografia"
draft = false
hora = "19:00"
planta = "Nau Bostik"
+++
```

- [ ] **Step 6: Afegir camps a `concert-primavera.md`**

```toml
+++
title = "Concert de primavera"
date = 2026-04-18
draft = false
hora = "20:00"
planta = "Nau Bostik"
+++
```

- [ ] **Step 7: Afegir camps a `fira-intercanvi.md`**

```toml
+++
title = "Fira d'intercanvi"
date = 2026-04-20
draft = false
hora = "10:00"
planta = "Nau Bostik"
+++
```

- [ ] **Step 8: Afegir camps a `artivisme.md`**

```toml
+++
title = "Artivisme今夜"
date = 2026-04-22
entitat = "Colectiu Artivista"
draft = false
hora = "19:00"
planta = "Nau Bostik"
+++
```

- [ ] **Step 9: Verificar build**

```bash
cd /Users/joan/Documents/Obsidian/naubostik.com
hugo --minify 2>&1 | tail -5
```

Esperat: `Total in X ms` sense errors.

- [ ] **Step 10: Commit**

```bash
git add content/activitats/
git commit -m "activitats: afegeix hora i planta al frontmatter dels 8 events"
```

---

## Task 2: i18n — afegir claus d'agenda a ca.toml i en.toml

**Files:**
- Modify: `i18n/ca.toml`
- Modify: `i18n/en.toml`

- [ ] **Step 1: Afegir claus a `i18n/ca.toml`**

Afegir al final del fitxer, després de la secció `# Cercar`:

```toml
# Agenda
agenda_view_month = "Mes"
agenda_view_week = "Setmana"
agenda_filter_all = "Totes"
agenda_archive_show = "Veure arxiu"
agenda_archive_hide = "Amagar arxiu"

[agenda_week_of]
other = "Setmana del {{ .monday }} al {{ .sunday }}"
```

- [ ] **Step 2: Afegir claus a `i18n/en.toml`**

Afegir al final del fitxer, després de la secció `# Search`:

```toml
# Agenda
agenda_view_month = "Month"
agenda_view_week = "Week"
agenda_filter_all = "All"
agenda_archive_show = "Show archive"
agenda_archive_hide = "Hide archive"

[agenda_week_of]
other = "Week of {{ .monday }} to {{ .sunday }}"
```

- [ ] **Step 3: Verificar build**

```bash
hugo --minify 2>&1 | tail -5
```

Esperat: sense errors ni warnings nous.

- [ ] **Step 4: Commit**

```bash
git add i18n/ca.toml i18n/en.toml
git commit -m "i18n: afegeix claus d'agenda a ca.toml i en.toml"
```

---

## Task 3: Template — reescriure `activitats/list.html`

**Files:**
- Modify: `themes/NauBostik/layouts/activitats/list.html`

- [ ] **Step 1: Reescriure el fitxer complet**

Substituir tot el contingut de `themes/NauBostik/layouts/activitats/list.html` per:

```html
{{ define "main" }}
{{ $now := now }}
{{ $allActivitats := where site.RegularPages "Section" "activitats" }}
{{ $months := dict "January" "Gener" "February" "Febrer" "March" "Març" "April" "Abril" "May" "Maig" "June" "Juny" "July" "Juliol" "August" "Agost" "September" "Setembre" "October" "Octubre" "November" "Novembre" "December" "Desembre" }}
{{ $days := dict "Monday" "dilluns" "Tuesday" "dimarts" "Wednesday" "dimecres" "Thursday" "dijous" "Friday" "divendres" "Saturday" "dissabte" "Sunday" "diumenge" }}

{{/* Recopila entitats i plantes úniques per als filtres */}}
{{ $entitats := slice }}
{{ $plantes := slice }}
{{ range $allActivitats }}
  {{ with .Params.entitat }}
    {{ if not (in $entitats .) }}{{ $entitats = $entitats | append . }}{{ end }}
  {{ end }}
  {{ $p := .Params.planta | default "Nau Bostik" }}
  {{ if not (in $plantes $p) }}{{ $plantes = $plantes | append $p }}{{ end }}
{{ end }}

<div class="page-header">
  <h1>{{ i18n "activitats_title" }}</h1>
  <p class="lead">{{ i18n "activitats_lead" }}</p>
</div>

<div class="agenda-controls">
  <div class="agenda-toggle" role="group">
    <button class="agenda-toggle-btn is-active" data-view="mensual" type="button">{{ i18n "agenda_view_month" }}</button>
    <button class="agenda-toggle-btn" data-view="setmanal" type="button">{{ i18n "agenda_view_week" }}</button>
  </div>

  {{ if $entitats }}
  <div class="agenda-filters" data-filter-group="entitat">
    <button class="agenda-filter-btn is-active" data-filter-type="entitat" data-filter-value="" type="button">{{ i18n "agenda_filter_all" }}</button>
    {{ range $entitats }}
    <button class="agenda-filter-btn" data-filter-type="entitat" data-filter-value="{{ . }}" type="button">{{ . }}</button>
    {{ end }}
  </div>
  {{ end }}

  {{ if gt (len $plantes) 1 }}
  <div class="agenda-filters" data-filter-group="planta">
    <button class="agenda-filter-btn is-active" data-filter-type="planta" data-filter-value="" type="button">{{ i18n "agenda_filter_all" }}</button>
    {{ range $plantes }}
    <button class="agenda-filter-btn" data-filter-type="planta" data-filter-value="{{ . }}" type="button">{{ . }}</button>
    {{ end }}
  </div>
  {{ end }}

  <button class="agenda-archive-btn" type="button"
    data-archive-show="{{ i18n "agenda_archive_show" }}"
    data-archive-hide="{{ i18n "agenda_archive_hide" }}">{{ i18n "agenda_archive_show" }}</button>
</div>

{{/* ── VISTA MENSUAL ── */}}
<section class="agenda-view" id="agenda-mensual">
  {{ range ($allActivitats.GroupByDate "2006-01" "asc") }}
  {{ $t := .Key | time.AsTime }}
  <div class="agenda-month">
    <h2 class="agenda-month-title">{{ index $months ($t | time.Format "January") }} {{ $t | time.Format "2006" }}</h2>
    <ul class="agenda-list">
      {{ range .Pages.ByDate }}
      <li class="agenda-item{{ if .Date.Before $now }} agenda-item--past{{ end }}"
          data-entitat="{{ .Params.entitat | default "" }}"
          data-planta="{{ .Params.planta | default "Nau Bostik" }}">
        {{ if .Params.hora }}<span class="agenda-item__time">{{ .Params.hora }}</span>{{ end }}
        <a class="agenda-item__title" href="{{ .RelPermalink }}">{{ .LinkTitle }}</a>
        <span class="agenda-item__meta">
          {{ with .Params.entitat }}{{ . }}{{ else }}Nau Bostik{{ end }}{{ with .Params.planta }} · {{ . }}{{ end }}
        </span>
      </li>
      {{ end }}
    </ul>
  </div>
  {{ end }}
</section>

{{/* ── VISTA SETMANAL ── */}}
<section class="agenda-view" id="agenda-setmanal">
  {{ $prevWeekKey := "" }}
  {{ range ($allActivitats.GroupByDate "2006-01-02" "asc") }}
  {{ $date := .Key | time.AsTime }}
  {{ $wdNum := $date.Weekday | printf "%d" | int }}
  {{ $daysToMon := mod (add $wdNum 6) 7 }}
  {{ $monday := $date.AddDate 0 0 (mul -1 $daysToMon) }}
  {{ $sunday := $monday.AddDate 0 0 6 }}
  {{ $weekKey := $monday.Format "2006-01-02" }}
  {{ if ne $weekKey $prevWeekKey }}
  <p class="agenda-week-label">{{ i18n "agenda_week_of" (dict "monday" ($monday | time.Format "2/1") "sunday" ($sunday | time.Format "2/1")) }}</p>
  {{ $prevWeekKey = $weekKey }}
  {{ end }}
  <h3 class="agenda-day-title">{{ index $days ($date | time.Format "Monday") }}, {{ $date | time.Format "02/01/2006" }}</h3>
  <ul class="agenda-list">
    {{ range .Pages.ByDate }}
    <li class="agenda-item{{ if .Date.Before $now }} agenda-item--past{{ end }}"
        data-entitat="{{ .Params.entitat | default "" }}"
        data-planta="{{ .Params.planta | default "Nau Bostik" }}">
      {{ if .Params.hora }}<span class="agenda-item__time">{{ .Params.hora }}</span>{{ end }}
      <a class="agenda-item__title" href="{{ .RelPermalink }}">{{ .LinkTitle }}</a>
      <span class="agenda-item__meta">
        {{ with .Params.entitat }}{{ . }}{{ else }}Nau Bostik{{ end }}{{ with .Params.planta }} · {{ . }}{{ end }}
      </span>
    </li>
    {{ end }}
  </ul>
  {{ end }}
</section>
{{ end }}
```

- [ ] **Step 2: Verificar build sense errors**

```bash
hugo --minify 2>&1 | grep -E "ERROR|WARN|Total"
```

Esperat: cap línia `ERROR` ni `WARN` nou. Una línia `Total in X ms`.

- [ ] **Step 3: Verificar que la pàgina renderitza**

```bash
hugo server --baseURL http://localhost:1313/ --buildDrafts &
sleep 3
curl -s http://localhost:1313/activitats/ | grep -c "agenda-item"
```

Esperat: un número >= 8 (un per activitat, apareix dues vegades — mensual + setmanal — però grep compta línies).

Atura el servidor: `kill %1`

- [ ] **Step 4: Commit**

```bash
git add themes/NauBostik/layouts/activitats/list.html
git commit -m "activitats: reescriu list.html com a vista agenda (mensual + setmanal)"
```

---

## Task 4: CSS — afegir bloc `.agenda-*` a `main.css`

**Files:**
- Modify: `themes/NauBostik/static/css/main.css` (afegir al final, línia 1379+)

- [ ] **Step 1: Afegir el bloc CSS al final de `main.css`**

Afegir exactament al final del fitxer:

```css
/* === AGENDA === */

.agenda-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-primary);
}

.agenda-toggle {
  display: flex;
  gap: 0.25rem;
}

.agenda-toggle-btn {
  padding: 0.4rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sharp);
  background: transparent;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--color-secondary);
  transition: all 0.15s ease;
}

.agenda-toggle-btn.is-active,
.agenda-toggle-btn:hover {
  background: var(--color-primary);
  color: var(--color-surface);
  border-color: var(--color-primary);
}

.agenda-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.agenda-filter-btn {
  padding: 0.3rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--fs-sm);
  color: var(--color-secondary);
  transition: all 0.15s ease;
}

.agenda-filter-btn.is-active,
.agenda-filter-btn:hover {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}

.agenda-archive-btn {
  margin-left: auto;
  padding: 0.3rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sharp);
  background: transparent;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--fs-sm);
  color: var(--color-muted);
  transition: all 0.15s ease;
}

.agenda-archive-btn:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
}

.agenda-view--hidden {
  display: none;
}

.agenda-month {
  margin-bottom: 2.5rem;
}

.agenda-month-title {
  font-size: var(--fs-h3);
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.agenda-week-label {
  font-size: var(--fs-sm);
  font-weight: 700;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 1.75rem 0 0.5rem;
}

.agenda-day-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-secondary);
  margin: 1rem 0 0.5rem;
}

.agenda-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.agenda-item {
  display: grid;
  grid-template-columns: 3.5rem 1fr auto;
  align-items: baseline;
  column-gap: 1rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--color-concrete);
}

.agenda-item--past {
  display: none;
}

main.show-past .agenda-item--past {
  display: grid;
  opacity: 0.5;
}

.agenda-item--hidden {
  display: none !important;
}

.agenda-item__time {
  font-size: var(--fs-sm);
  font-weight: 700;
  color: var(--color-accent);
  white-space: nowrap;
}

.agenda-item__title {
  font-weight: 500;
  color: var(--color-primary);
}

.agenda-item__title:hover {
  color: var(--color-accent);
}

.agenda-item__meta {
  font-size: var(--fs-sm);
  color: var(--color-muted);
  white-space: nowrap;
}

@media (max-width: 600px) {
  .agenda-item {
    grid-template-columns: 3rem 1fr;
    grid-template-rows: auto auto;
    row-gap: 0.2rem;
  }
  .agenda-item__meta {
    grid-column: 1 / -1;
    white-space: normal;
  }
  .agenda-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
  .agenda-archive-btn {
    margin-left: 0;
  }
}
```

- [ ] **Step 2: Verificar build**

```bash
hugo --minify 2>&1 | grep -E "ERROR|WARN|Total"
```

Esperat: sense errors. La pàgina d'activitats ja ha de tenir els estils aplicats.

- [ ] **Step 3: Commit**

```bash
git add themes/NauBostik/static/css/main.css
git commit -m "css: afegeix bloc .agenda-* per a la nova vista d'activitats"
```

---

## Task 5: JS — afegir `initAgenda()` a `main.js`

**Files:**
- Modify: `themes/NauBostik/static/js/main.js`

- [ ] **Step 1: Afegir `initAgenda` a la crida de `DOMContentLoaded`**

Al bloc `DOMContentLoaded` (línia 1 del fitxer), afegir `initAgenda();` al final de la llista de crides:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const powered = document.querySelector('.footer-powered');
  const reveal = document.querySelector('.footer-powered-reveal');

  if (powered && reveal) {
    powered.addEventListener('mouseenter', () => {
      reveal.style.maxWidth = reveal.scrollWidth + 'px';
      reveal.style.opacity = '1';
    });
    powered.addEventListener('mouseleave', () => {
      reveal.style.maxWidth = '0';
      reveal.style.opacity = '0';
    });
  }

  initGalleryLightbox();
  initScrollTop();
  initHeaderScroll();
  initRandomEspais();
  initHeroSlideshow();
  initAgenda();
});
```

- [ ] **Step 2: Afegir la funció `initAgenda()` al final del fitxer**

Afegir a continuació de `initScrollTop()`, al final de `main.js`:

```javascript
function initAgenda() {
  const mensual = document.getElementById('agenda-mensual');
  if (!mensual) return;

  const main = document.querySelector('main');
  const setmanal = document.getElementById('agenda-setmanal');
  const toggleBtns = document.querySelectorAll('.agenda-toggle-btn');
  const filterBtns = document.querySelectorAll('.agenda-filter-btn');
  const archiveBtn = document.querySelector('.agenda-archive-btn');

  if (setmanal) setmanal.classList.add('agenda-view--hidden');

  toggleBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.agenda-view').forEach(function(v) {
        v.classList.add('agenda-view--hidden');
      });
      var target = document.getElementById('agenda-' + btn.dataset.view);
      if (target) target.classList.remove('agenda-view--hidden');
      toggleBtns.forEach(function(b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
    });
  });

  var activeFilters = { entitat: '', planta: '' };

  function applyFilters() {
    document.querySelectorAll('.agenda-item').forEach(function(item) {
      var okEntitat = !activeFilters.entitat || item.dataset.entitat === activeFilters.entitat;
      var okPlanta = !activeFilters.planta || item.dataset.planta === activeFilters.planta;
      item.classList.toggle('agenda-item--hidden', !(okEntitat && okPlanta));
    });
  }

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var type = btn.dataset.filterType;
      var value = btn.dataset.filterValue;
      activeFilters[type] = value;

      var group = btn.closest('[data-filter-group="' + type + '"]');
      if (group) {
        group.querySelectorAll('.agenda-filter-btn').forEach(function(b) {
          b.classList.toggle('is-active', b.dataset.filterValue === value);
        });
      }
      applyFilters();
    });
  });

  if (archiveBtn && main) {
    var textShow = archiveBtn.dataset.archiveShow;
    var textHide = archiveBtn.dataset.archiveHide;
    archiveBtn.addEventListener('click', function() {
      var showing = main.classList.toggle('show-past');
      archiveBtn.textContent = showing ? textHide : textShow;
    });
  }
}
```

- [ ] **Step 3: Verificar build**

```bash
hugo --minify 2>&1 | grep -E "ERROR|WARN|Total"
```

Esperat: sense errors.

- [ ] **Step 4: Test manual al servidor local**

```bash
hugo server --baseURL http://localhost:1313/ --buildDrafts
```

Obrir `http://localhost:1313/activitats/` i verificar:
- Els botons "Mes" / "Setmana" commuten les vistes correctament.
- Les pills de filtre filtren per entitat i per planta (AND lògic).
- El botó "Veure arxiu" mostra/amaga les activitats passades (totes ho són, datades a abril 2026).
- A JS desactivat (DevTools > Settings > Disable JavaScript): les dues seccions visibles, totes les activitats visibles.
- A viewport 360px: la graella d'items no desborda.
- A viewport 768px i 1100px: correcte.

- [ ] **Step 5: Commit**

```bash
git add themes/NauBostik/static/js/main.js
git commit -m "js: afegeix initAgenda() per a toggles, filtres i arxiu d'activitats"
```

---

## Task 6: Verificació final i HISTORIA.md

**Files:**
- Modify: `HISTORIA.md`

- [ ] **Step 1: Build de producció net**

```bash
hugo --minify --baseURL https://naubostik.com/ 2>&1 | grep -E "ERROR|WARN|Total"
```

Esperat: sense errors ni warnings nous. Una línia `Total in X ms`.

- [ ] **Step 2: Comprovar que no hi ha URLs hardcoded als layouts nous**

```bash
grep -n "naubostik.com\|localhost\|112books" themes/NauBostik/layouts/activitats/list.html
```

Esperat: cap resultat.

- [ ] **Step 3: Actualitzar `HISTORIA.md`**

Afegir una entrada de sessió al final de `HISTORIA.md` amb el format establert (§9 de CLAUDE.md):

```markdown
## Sessió 2026-08-12 — Agenda d'activitats

- **Model:** claude-sonnet-4-6 (Claude Code)
- **Tasca:** Implementar calendari/agenda d'activitats (roadmap §6.1)
- **Fitxers modificats:**
  - `content/activitats/*.md` (×8): `hora` + `planta` al frontmatter
  - `themes/NauBostik/layouts/activitats/list.html`: reescritura completa
  - `themes/NauBostik/static/css/main.css`: bloc `.agenda-*` afegit al final
  - `themes/NauBostik/static/js/main.js`: funció `initAgenda()` afegida
  - `i18n/ca.toml` + `i18n/en.toml`: 6 claus `.agenda_*` noves
  - `docs/superpowers/specs/2026-08-12-agenda-activitats-design.md`: creat
  - `docs/superpowers/plans/2026-08-12-agenda-activitats.md`: creat
- **Resultat:** Vista agenda amb toggle Mes/Setmana, filtres pills per entitat
  i planta (AND lògic), toggle "Veure arxiu" per activitats passades.
  Fallback no-JS complet (totes les activitats visibles sense JS).
- **Valoració:** —
```

- [ ] **Step 4: Commit final**

```bash
git add HISTORIA.md docs/
git commit -m "docs: registre de sessió i spec/pla de l'agenda d'activitats"
```
