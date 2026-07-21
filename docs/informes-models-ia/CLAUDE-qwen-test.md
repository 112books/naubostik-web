# CLAUDE.md — Nau Bostik (naubostik.com)

> Document operatiu per a agents d'IA i document de projecte.
> Model: Qwen 3.7 Max · Data: 2026-07-22

---

## 1. Visió del projecte

**Nau Bostik** és un espai cultural autogestionat al barri de la Sagrera
(Barcelona). La web és el seu portal públic: activitats, col·lectius,
espais, lloguer i comunitat.

**Estat actual:** prototip de treball privat. S'usa per mostrar idees a
l'equip de gestió. **Mai no es puja a producció sense ordre explícita.**

**Adreça física real** (corregir arreu del repo abans de producció):
```
Nau Bostik
Ferran Turné 1-11
08027 Barcelona (la Sagrera)
```

⚠️ El contingut actual diu «barri de la Bordeta» i «Carrer de la Seu
d'Urgell, 12» (Raval). Tots dos són erronis.

---

## 2. Entorns

| Entorn | Ús | baseURL | Accés |
|---|---|---|---|
| Local | `hugo server` | `http://localhost:1313/` | Privat |
| Staging | Vista prèvia per a l'equip | `https://naubostik.netlify.app/` | Privat (Basic Auth) |
| Producció | `naubostik.com` | `https://naubostik.com/` | Públic (pendent) |

**Regles:**
- `baseURL` **no** va hardcoded a `hugo.toml`; es passa per flag.
- GitHub Pages **no** pot fer autenticació: no serveix com a staging privat.
- Documentació interna (aquest fitxer, `HISTORIA.md`) **no** va a repo públic.

**Comandes:**
```bash
hugo server --bind 0.0.0.0 --baseURL http://localhost:1313/ --buildDrafts
hugo --minify --baseURL https://naubostik.netlify.app/
hugo --minify --baseURL https://naubostik.com/
```

---

## 3. Stack tècnic

- **Generador:** Hugo v0.147.0 (extended). Cap build step JS.
- **Idioma:** català (`languageCode = "ca"`).
- **Tema:** `themes/thema/` (propi). Totes les plantilles van aquí.
- **CSS:** vanilla, `themes/thema/static/css/main.css`. Patró: variables CSS
  + classes curtes (`.espai-card`, `.planta-grid`). Sense Tailwind.
  - Paleta: `--color-primary: #1a1a1a`, `--color-accent: #c41e3a`,
    `--color-surface: #f8f8f8`. Font: DM Sans (Google Fonts).
- **JS:** vanilla, `themes/thema/static/js/main.js`.
- **CMS:** Decap CMS v3 (`/admin/`, git-gateway + Netlify Identity).
  **Estat: reavaluar.** Candidats: Sveltia CMS (drop-in), TinaCMS (visual),
  headless propi. Fins a decisió: no ampliar Decap.
- **Hosting:** Netlify (`netlify.toml`).
- **Repo:** `github.com/112books/naubostik-web` (privat), branca `main`.

---

## 4. Estructura del repo

```
content/            # markdown (CA). Frontmatter TOML (+++)
├── _index.md       # home
├── activitats/     # frontmatter `entitat` separa propi vs. entitats
├── cercar/         # cercador JS inline
├── collectius/     # col·lectius residents
├── contacte/       # adreça + mapa OSM
├── espais/         # frontmatter `planta` agrupa per pis
├── lloguer/
├── noticies/
├── privacitat/
└── qui-som/
themes/thema/       # tema propi
├── layouts/        # _default, _partials, per-secció, baseof, home…
└── static/css|js/  # main.css, main.js
static/admin/       # Decap CMS
static/robots.txt   # Disallow: / + bots d'IA bloquejats
static/_headers     # X-Robots-Tag: noindex…
netlify/            # edge-functions (basic-auth)
hugo.toml           # config (baseURL via flag)
netlify.toml        # build + edge function auth
```

**Convencions de frontmatter:**
- `activitats/*.md`: `entitat = "Nom"` (opcional; sense = programació pròpia).
- `espais/*.md`: `planta = "Planta Baixa"|"Primera Planta"|…`, `imatge = "url"`.
- Taxonomies definides però no explotades: `categories`, `tags`.

---

## 5. Multi-idioma (pendent)

Català per defecte; **anglès només per a pàgines institucionals**; castellà
per decidir. No traduir mai tot el site (cost sense ROI).

**Pla previst:**
- `i18n/ca.toml`, `i18n/en.toml` amb cadenes de plantilles.
- Hugo: `defaultContentLanguage = "ca"` + `[languages.en] weight = 2`.
- Per suffix (`fitxer.ca.md`, `fitxer.en.md`) o per directori — pendent.
- Els enllaços interns ja usen `relLangURL` (no trencar-ho).
- Marcar cadenes hardcoded en català amb `TODO→MULTII18N`.

---

## 6. Privacitat i accés (no negociable)

Mentre el site sigui privat:
- `robots.txt` amb `Disallow: /` + bloqueig explícit de bots d'IA.
- Meta `noindex, nofollow, noarchive…` al `<head>` (`baseof.html`).
- `X-Robots-Tag` via `static/_headers`.
- Accés staging amb Basic Auth (`netlify/edge-functions/basic-auth.js` +
  env vars `SITE_USER`/`SITE_PASS` al tauler de Netlify).
- No enllaçar `sitemap.xml` enlloc.

Quan es passi a producció: revisar aquesta secció sencera i declarar
explícitament què passa a ser públic.

---

## 7. Roadmap

**Prioritat proposada:**
1. **Contingut real + fotos** — substituir mostres per dades i imatges
   pròpies (`static/images/uploads/`; mai Unsplash en producció).
2. **Sistema de reserves/lloguer** — decidir arquitectura amb la
   reavaluació del CMS.
3. **Calendari/agenda** — vista setmanal/mensual, filtres per entitat i
   planta.
4. **Multi-idioma + SEO** — i18n, OpenGraph, schema.org/Event i /Place.
5. **Identitat visual** — logo, fotos pròpies al slideshow.
6. **Accessibilitat AA + rendiment** — WCAG 2.1 AA, Lighthouse >95,
   contingut crític sense JS.

**Transversals:**
- Cap secret al repo (env vars / Netlify Identity).
- Documentació interna sempre en català; codi i noms tècnics en anglès.
- No pujar a producció sense ordre explícita.

---

## 8. Instruccions per a l'agent d'IA

### Abans de tocar codi
1. Llegeix aquest fitxer i `HISTORIA.md` sencers.
2. Mira `git status` i `git log --oneline -10`.
3. Si la tasca toca plantilles/estils, inspecciona
   `themes/thema/layouts/` i `themes/thema/static/css/main.css` primer.

### Convencions
- Idioma de comunicació: **català**. Codi i noms tècnics: **anglès**.
- Plantilles Hugo: `partial`, `block`, `define`, `relLangURL` per enllaços
  interns (mai URLs amb domini hardcoded).
- Frontmatter: TOML (`+++`).
- Imatges: sota `static/images/…`.
- No afegir comentaris al codi llevat que se'n demanin.
- **No commitar sense instrucció explícita.**

### Verificació abans de donar per fet
- `hugo --minify` sense errors ni warnings.
- Cap enllaç intern trencat.
- Provar 360px / 768px / ≥1100px.
- Actualitzar `HISTORIA.md` amb l'entrada de la sessió.

### TODO actual
- [ ] Corregir adreça arreu → Sagrera, Ferran Turné 1-11 (Bordeta i Seu
      d'Urgell són erronis): `content/_index.md`, `content/qui-som/_index.md`,
      `content/contacte/_index.md`, footer i mapa OSM.
- [ ] Treure `baseURL` hardcoded de `hugo.toml`.
- [ ] Decidir estratègia staging (branca vs. repo separat per a docs).
- [ ] Emplenar `i18n/{ca,en}.toml`; marcar cadenes hardcoded.
- [ ] Comparativa CMS (Sveltia / Tina / headless) i decisió.
- [ ] Auditoria accessibilitat + Lighthouse baseline.
- [ ] Mantenir `HISTORIA.md` a cada sessió.

---

## 9. Comparativa de models d'IA

Tots els canvis fets amb un model d'IA es registren a `HISTORIA.md` amb:
data, model + provider, tasca, fitxers tocats, mètriques (temps, tokens,
iteracions, rework), errors i valoració subjectiva. Objectiu: comparativa
reproducible entre models (GLM-5.2 inicial; després altres).
