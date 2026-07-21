# CLAUDE.md — Nau Bostik (naubostik.com)

Aquest fitxer fa doble funció:
1. **Instruccions operatives** per a qualsevol model d'IA / agent que treballi al repositori (estil `AGENTS.md`).
2. **Document de projecte** (visió, objectius, paràmetres tècnics, roadmap).

Qualsevol agent que editi aquest repo ha de llegir aquest fitxer complet abans de tocar res.

---

## 1. Visió del projecte

**Nau Bostik** és un espai cultural autogestionat al barri de la Sagrera (Barcelona).
La web `naubostik.com` ha de ser el portal públic de l'espai: programa activitats,
presenta els col·lectius i espais, permet el lloguer d'espais i alimenta una
comunitat veïnal. El projecte és un **prototip de treball** que anem mostrant a
l'equip de gestió per validar idees; no està en producció pública encara.

L'adreça física real (**corregir arreu del repo** abans de pujar a producció):

```
Nau Bostik
Ferran Turné, 1-11
08027 Barcelona
Barri de la Sagrera
```

> ⚠️ Actualment el contingut encara diu «barri de la Bordeta» i «Carrer de la Seu
> d'Urgell, 12» (que és al Raval). Tots dos són erronis i s'han de substituir.

---

## 2. Entorns i URLs

Es treballa amb **tres entorns** ben separats. La `baseURL` d'Hugo s'ha de poder
canviar per entorn sense tocar el contingut.

| Entorn        | Ús                                  | baseURL                                            | Visibilitat         |
|---------------|-------------------------------------|----------------------------------------------------|---------------------|
| **Local**     |开发 + test amb `hugo server`         | `http://localhost:1313/`                           | privat (màquina dev) |
| **Staging**   | GitHub Pages privat per a l'equip   | `https://112books.github.io/naubostik-web/`*        | privat              |
| **Producció** | `naubostik.com` (en pausa)          | `https://naubostik.com/`                           | públic quan estigui llest |

\* Si s'usa subpath a GH Pages cal baseURL amb `/naubostik-web/` i assegurar que
tots els `relURL` / `relLangURL` funcionin. Decisió pendent: branca `gh-pages`
dins el mateix repo privat, o repo separat de docs públiques. La **documentació
interna (CLAUDE.md, HISTORIA.md, auditoria, consultoria) NO ha de ser pública**;
freqüentment és millor un repo privat independent per a la docs.

Configuració recomanada per multi-entorn a `hugo.toml` (pendent d'implementar):

```toml
# baseURL es defineix via flag d'entorn (--baseURL) o variable CI.
# No hardcoded aqui en producció.
```

Build local:
```
hugo server --bind 0.0.0.0 --baseURL http://localhost:1313/
```

---

## 3. Stack tècnic

- **Generador estàtic:** Hugo v0.147.0 (extended). Cap build step JS.
- **Llengua base:** Català (`languageCode = "ca"`, `locale = "ca"`).
- **Tema:** `themes/thema/` — tema propi, no un tema de tercer. Qualsevol canvi
  de plantilles va aquí (o a `layouts/` a la root per sobreescriure).
- **Estils:** CSS vanilla a `themes/thema/static/css/main.css`, arquitectura
  **CSS variables + utility-ish** (mantenir el patró actual). sense preprocessador.
  Paleta:
  - `--color-primary: #1a1a1a`
  - `--color-secondary: #666`
  - `--color-accent: #c41e3a` (vermell Nau Bostik)
  - `--color-surface: #f8f8f8`
  - Tipografia: **DM Sans** via Google Fonts.
- **JS:** vanilla a `themes/thema/static/js/main.js`. Sense framework.
- **CMS:** Decap CMS v3 a `/admin/` via git-gateway + Netlify Identity.
  **Estat:** reavaluar / substituir. Candidats a estudiar:
  - [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (drop-in replacement de Decap)
  - [TinaCMS](https://tina.io/) (visual editing, Git-backed)
  - Headless + API pròpia contra contingut a `content/`
  Decisió pendent; mentre tant, **no ampliar Decap** ni trencar el `config.yml`.
- **Allotjament staging:** GitHub Pages privat + workflow `.github/workflows/hugo.yml`.
- **Allotjament producció (futur):** Netlify (`netlify.toml` ja existeix) reservat.
- **Repositori:** `github.com/112books/naubostik-web` (privat). Branca per defecte
  `main`. No publicar el repo sense acord.

---

## 4. Estructura del repositori

```
.
├── archetypes/          # plantilles `hugo new`
├── content/             # markdown del lloc (CA per defecte)
│   ├── _index.md        # home
│   ├── activitats/      # programació pròpia + entitats (Param `entitat`)
│   ├── cercar/          # cercador JS inline
│   ├── collectius/      # col·lectius residents
│   ├── contacte/        #adreça + mapa OSM
│   ├── espais/          # espais físics, Param `planta`
│   ├── lloguer/         # pàgina lloguer
│   ├── noticies/        # blog / bloc de notícies
│   ├── privacitat/      # política privacitat
│   └── qui-som/
├── data/                # (buit) per YAML/TOML/JSON datos estructurats
├── i18n/                 # (buit) → cal emplenar amb ca.toml, en.toml, es.toml
├── layouts/             # (buit) sobreescriptures a la root
├── static/
│   └── admin/           # Decap CMS
├── themes/thema/
│   ├── layouts/
│   │   ├── _default/    # list.html + single.html genèrics
│   │   ├── _partials/   # header, footer, menu, head/css, head/js
│   │   ├── activitats/  # list separa programació pròpia vs entitat
│   │   ├── cercar/      # cercador JS inline
│   │   ├── collectius/
│   │   ├── espais/      # list agrupa per `Params.planta`
│   │   ├── noticies/
│   │   ├── baseof.html
│   │   ├── home.html    # hero + slideshow + cards
│   │   ├── page.html
│   │   ├── section.html
│   │   ├── taxonomy.html
│   │   ├── term.html
│   │   └── 404.html
│   └── static/css|js/
├── hugo.toml
├── netlify.toml
└── .github/workflows/hugo.yml
```

Convenis de seccions (es respecten estrictament):
- `content/activitats/*.md` accepta el frontmatter `entitat = "Nom"` per separar
  programació pròpia (sense `entitat`) i programació d'entitats.
- `content/espais/*.md` accepta `planta = "Planta Baixa"|"Primera Planta"|"Segona Planta"|"Tercera Planta"` i `imatge = "url"`.
- Taxonomies definides: `categories` i `tags` (encara no explotades).

---

## 5. Multi-idioma (preparar des de l'inici)

Tot i que el contingut normal és en **català**, les parts institucionals i
informatives tindran versió en **anglès** (i possiblement castellà, pendent).
Hugo s'ha de configurar per a multi-idioma **sense trencar l'existent**:

Plantejament tècnic previst (no implementat encara):
- Crear `i18n/ca.toml`, `i18n/en.toml` (i `es.toml` si escau) amb les cadenes de
  les plantilles (`header`, `footer`, dates, literals de seccions).
- Adoptar estructura per directori (`/content/ca/`, `/content/en/`) **o** per
  suffix (`activitats/concert-primavera.ca.md`, `.en.md`). Decisió pendent.
- `hugo.toml`:
  ```toml
  defaultContentLanguage = "ca"
  [languages.ca]
    weight = 1
    languageName = "Català"
  [languages.en]
    weight = 2
    languageName = "English"
  ```
- El menú principal i el footer ja usen `relLangURL` (fet a commit `7b211c1`).
- Marcar amb un TODO→MULTII18N qualsevol cadena hardcodeada en català a les
  plantilles per poder-la extraure més endavant.

---

## 6. Objectius / Roadmap

Marcat com a prioritari per l'equip (ordre = prioritat proposada):

1. **Contingut real + fotos** — substituir tot el contingut de mostra per dades i
   imatges reals dels espais i col·lectius. Imatges pròpies sota
   `static/images/uploads/` (mai Unsplash en producció).
2. **Sistema de reserves / lloguer** — permetre peticions de lloguer d'espais
   (formulari que armi email, webform a un backend, o integració CMS). Decidir
   arquitectura quan es refactoritzi el CMS.
3. **Calendari / agenda d'activitats** — vista setmanal/mensual sobre les
   pàgines d'`activitats`, amb filtres per entitat i per planta. Considerar
   `data/activitats.yaml` + template propi vs frontmatter a `content/activitats`.
4. **Multi-idioma i SEO** — acabrar `i18n/`, afegir metadades OpenGraph,
   Twitter Cards, `schema.org/Event` per a activitats i `schema.org/Place` per a
   espais. `sitemap.xml` i `robots.txt` configurats.
5. **Disseny / identitat visual** — logotip i variants definitives; tipografia i
   paleta confirmades; substituir el slideshow d'Unsplash per fotografies
   pròpies de la nau.
6. **Accessibilitat AA + rendiment** — auditoria WCAG 2.1 AA, Lighthouse >95
   en totes les categories, no depèn de JS per pintar contingut crític (cercador
   i slideshow han de tenir fallback no-JS).

Objectius因此 transversals (no-negociables):
- Cap secret ni credencials al repo (només `config.yml` de Decap sense tokens;
  la resta via variables d'entorn / Netlify Identity).
- Tots els commits a `main` passen pel workflow de GitHub Pages per defecte.
- Sempre en català la documentació interna (`CLAUDE.md`, `HISTORIA.md`, commits,
  filles internes), excepte codi i noms tècnics.

---

## 7. Instruccions operatives per a l'agent

### 7.1 Abans de tocar codi
1. Llegeix aquest fitxer i `HISTORIA.md` complet.
2. Comprova `git status` i `git log --oneline -10` per entendre el punt actual.
3. Si la tasca toca plantilles o estils, inspecciona `themes/thema/layouts/` i
   `themes/thema/static/css/main.css` abans d'escriure.

### 7.2 Convencions
- **Llengua de comunicació:** català. Codis i*noms tècnics* en anglès.
- **Estil CSS:** variables CSS per color/spacing/ mesures, classes curtes
  descriptives (`.espai-card`, `.planta-grid`). Sense Tailwind ni preprocessador.
- **Estil de plantilles Hugo:** usar `partial`, `block`, `define`, `relLangURL`
  per als enllaços interns (mai URLs hardcoded amb el domini).
- **Frontmatter:** TOML (`+++ ... +++`) com a estil dominant al repo.
- **imatges:** sota `static/images/...`, referenciades per `relURL` o via
  `Params.imatge` i plantilles.
- **No afegir commentaris al codi** llevat que la tasca els demani explícitament.
- **No commitar** sense instrucció explícita de l'usuari.
- **No pujar a producció** (`naubostik.com`) sota cap concepte fins avís explícit.

### 7.3 Llistat de tasques tècniques actuals (TODO)
- [ ] Corregir adreça/arreu → Sagrera, Ferran Turné 1-11, 08027 (Bordeta i
      Seu d'Urgell són erronis). Repassar: `content/_index.md`,
      `content/qui-som/_index.md`, `content/contacte/_index.md` i el mapa OSM.
- [ ] Preparar `hugo.toml` per multi-entorn (treure `baseURL` hardcoded).
- [ ] Decidir estratègia de branca / repo pel staging privat i la doc interna.
- [ ] Definir i emplenar `i18n/{ca,en}.toml` i marcar cadenes hardcodeades.
- [ ] Auditar Decap CMS i decidir substitut (Sveltia / Tina / headless).
- [x] Implementar autenticació d'accés al staging (Netlify Edge Function amb
      Basic Auth + env vars `SITE_USER`/`SITE_PASS`). Pendent: configurar les
      env vars al tauler de Netlify i decidir què fer amb el workflow GH Pages.
- [ ] Decidir estratègia de `sitemap.xml` mentre el site és privat (no exposar).
- [ ] Auditoria accessibilitat + Lighthouse de Referència (baseline).
- [ ] Crear `README.md` (resum públic del projecte) quan pugem a producció.
- [ ] Mantenir `HISTORIA.md` actualitzada cada sessió amb un model d'IA.

### 7.4 Comandes habituals
```bash
# Server local
hugo server --bind 0.0.0.0 --baseURL http://localhost:1313/ --buildDrafts

# Build de producció
hugo --minify --baseURL https://naubostik.com/

# Build staging (GH Pages subpath)
hugo --minify --baseURL https://112books.github.io/naubostik-web/

# Nova pàgina
hugo new content/activitats/el-meu-event.md
```

### 7.5 Verificació abans de donar una tasca per acabada
- `hugo --minify` construeix sense errors ni warnings.
- Cap enllaç intern trenca (`grep` de URLs hardcodeades a layouts/content).
- Les dates i metadadesqidienen en català (`02/01/2006`).
- S'han comprovat mòbil (360px), tablet (768px) i desktop (>=1100px).
- S'ha actualitzat `HISTORIA.md` amb l'entrada de la sessió.

---

## 8. Privacitat d'indexació i accés (no-negociable)

El projecte és un **prototip privat**. **Mentre no s'autoritzi explícitament el
contrari, el site NO ha de ser indexable** per cercadors ni per crawlers
d'entrenament d'IA, i **l'accés al staging ha de requerir autenticació**.

### 8.1 No-indexació (implementat)

- `static/robots.txt` amb `Disallow: /` per a tot user-agent, més bloqueig
  explícit dels bots d'IA coneguts (GPTBot, ChatGPT-User, OAI-SearchBot,
  ClaudeBot, anthropic-ai, Claude-Web, Google-Extended, PerplexityBot,
  Perplexity-User, CCBot, FacebookBot, Meta-ExternalAgent, Meta-ExternalFetcher,
  Amazonbot, Bytespider, Applebot-Extended, Diffbot, ImagesiftBot, OMIGiliBot,
  Omgilibot, SemanticScholarBot, cohere-ai).
- Meta `robots` al `<head>` (`themes/thema/layouts/baseof.html`):
  `noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate` +
  `googlebot` explícit + `X-Robots-Tag` equivalent al `<head>`.
- Header HTTP `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet,
  noimageindex` via `static/_headers` (Netlify / Cloudflare Pages ho serveixen;
  GitHub Pages ignora `_headers` però no fa nosa).
- **No generar `sitemap.xml` pública** mentre el site sigui privat. Si cal per
  ús intern, protegir-la darrere l'autenticació (vegeu §8.2) i **no** llistar-la
  al `robots.txt`.

> ⚠️ Actualment Hugo encara genera `sitemap.xml` i `index.xml` per defecte. Es
> manté així per no trencar res, però **no enllacem el sitemap enlloc** i el
> `robots.txt` no el referencia. Quan es faci producció pública, caldrà: (a)
  treure el `Disallow: /`, (b) permetre bots, (c) exposar sitemap.

### 8.2 Accés amb usuari (pendent d'implementar)

Un site 100% estàtic no pot fer `auth` al client. Cal fer-ho a la **capa
d'allotjament**. GitHub Pages **no suporta autenticació**; per tant, mentre
vulguem "calgui usuari", el **staging no pot ser GH Pages públic**.

Solució adoptada (implementada):

- **Netlify Edge Function amb HTTP Basic Auth** — `netlify/edge-functions/basic-auth.js`
  llegeix les variables d'entorn `SITE_USER` i `SITE_PASS` del tauler de Netlify
  i tanca tot el site (`path = "/*"` a `netlify.toml`) darrere un popup d'autenticació
  bàsica. És l'equivalent funcional d'un `.htaccess`/`.htpasswd` d'Apache sobre
  un allotjament estàtic. Compatible amb Decap CMS. Zero cost al plan gratuït
  de Netlify; reversible esborrant un fitxer.

Alternatives considerades i descartades:
- **Netlify Password Protection** (feature nativa, requereix plan Pro+): descartada
  per cost innecessari per a un prototip privat.
- **Cloudflare Access** (gratis fins a 50 usuaris): descartada per experiències
  prèvies problemàtiques amb Cloudflare.
- **Auto-host VPS + .htpasswd**: descartat per perdre CDN/SSL automátic i
  trencar la integració Decap (Netlify Identity/git-gateway).

Configuració pendent al tauler de Netlify (manual, fora del repo):
1. Definir les env vars `SITE_USER` i `SITE_PASS` (marcar-les com a secrets).
2. Confirmar el subdomini staging (`naubostik.netlify.app` o un de específic).
3. Confirmar que **GitHub Pages queda desactivat com a staging** mentre vulguem auth
   (tècnicament no pot fer-la). Pendents decidir què fer amb
   `.github/workflows/hugo.yml` (desactivar-lo, deixar-lo o reorientar-lo).

> ⚠️ Fins que s'implementi l'autenticació, **no pujar res sensible a staging
> públic**. Fer servir local per a demos i, si cal ensenyar remot, obrir
> túnel temporal (cloudflared / ngrok) amb auth.

### 8.3 Política per a l'agent

- Mai afegir `meta robots` amb `index` ni `follow`.
- Mai modificar `robots.txt` per permetre crawlers sense autorització.
- Mai enllaçar el `sitemap.xml` públicament mentre el site sigui privat.
- Quan es pugi a producció (`naubostik.com`), es revisarà aquesta secció sencera
  i es declararan explícitament les parts que passen a ser públiques.

---

## 9. Comparativa de models (dins OpenCode)

Tots els canvis fets amb un model d'IA es registren a `HISTORIA.md`. Per cada
sessió queda enregistrat:

- **Data** (ISO 8601)
- **Model + provider** (ex: `opencode-go/glm-5.2`)
- **Tasca** objectiu i abast
- **Fitxers creats / modificats / eliminats**
- **Mètriques** qualitatives i quantitatives (rendiment, temps aproximat, tokens
  consumits, iteracions finsarResultat, rework)
- **Errors comesos** i com s'han resolt
- **Valoració** subjectiva (1-5) i notes per comparar entre models

L'objectiu és poder comparar models de manera reproducible al cap de diverses
sessions: GLM-5.2 (a partir del qual encenem), i qualsevol altre que es provi.