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
tots els `relURL` / `relLangURL` funcionin.

**Decidit (2026-08-12):** GH Pages queda tal com està, **sense auth**. La
protecció és `robots.txt` + meta `noindex` (§8.1, ja implementat) + repo
privat + no compartir la URL. La **documentació interna** (`CLAUDE.md`,
`HISTORIA.md`, auditories, consultories) es queda en aquest mateix repo
mentre sigui privat; si mai cal fer-la privada de debò (p. ex. quan
`naubostik-web` passi a públic en producció), es mou a
`git@github.com:112books/naubostik-DOCS.git`, que ja existeix i ja centralitza
la resta de documents privats del projecte. GitHub no permet visibilitat
mixta dins un sol repo (ni per carpeta ni per branca), per això dos repos
separats és l'estratègia adoptada — no un submòdul ni cap altra dreçera.

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
- **CMS:** Decap CMS v3 a `/admin/` via **git-gateway + Netlify Identity**.
  **Decidit (2026-08-12):** restaurat (esborrat a `c79ca04`, "neteja Decap").
  Motiu: els usuaris que han d'editar contingut **no tenen GitHub** ni saben
  què és — Netlify Identity permet invitar-los per correu normal (mail +
  contrasenya), i git-gateway amaga tot el flux Git per darrere. Alternatives
  descartades: Sveltia CMS (auth majoritàriament OAuth GitHub-style, no
  resol "mail normal" sense feina extra) i TinaCMS (Tina Cloud és un altre
  servei extern a gestionar). Fitxers: `static/admin/index.html`,
  `static/admin/config.yml` (camps ajustats al frontmatter real de
  `noticies`/`activitats`/`espais`/`collectius`/pàgines institucionals, no
  els genèrics d'abans). El widget d'Identity (`netlify-identity-widget.js`)
  es carrega a `themes/NauBostik/layouts/baseof.html` (no només a `/admin/`),
  perquè els enllaços d'invitació per correu aterren a l'arrel del site i
  necessiten el widget per capturar el token.
  **Desplegat (2026-08-12):** site Netlify `naubostik.netlify.app`
  connectat a `github.com/112books/naubostik-web`, Identity activat
  (Registration = "Invite only"), Git Gateway activat i connectat al repo.
  `/admin/` és tècnicament funcional des d'aquí. **Pendent deliberadament:**
  convidar usuaris editors per correu (Identity → Invite users) — fase molt
  primerenca del projecte, es farà en uns dies quan l'usuari ho digui.
- **Allotjament staging:** GitHub Pages privat + workflow `.github/workflows/hugo.yml`
  (contingut públic del site; `/admin/` hi és present però sense backend
  Netlify darrere no funciona — el CMS només és operatiu a `naubostik.netlify.app`).
- **Allotjament producció (futur):** Netlify (`netlify.toml` ja existeix,
  restaurat 2026-08-12, site ja desplegat sota subdomini Netlify — falta
  connectar el domini `naubostik.com` quan es passi a producció).
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

**Fet (2026-08-12):** `i18n/ca.toml` i `i18n/en.toml` creats i plantilles
connectades amb `{{ i18n "clau" }}` (baseof, header, footer, home, 404,
activitats, espais, col·lectius, notícies, cercar). Amb un sol idioma actiu
(`[languages.en]` encara no existeix a `hugo.toml`), el HTML renderitzat és
byte-a-byte idèntic al d'abans — `i18n` només fa fallback a `ca.toml`.
Pendent conscientment (marcat `TODO→MULTII18N` al codi, no bloqueja res):
- Noms de planta a `espais/list.html` (són claus de dades, `Params.ubicacio`
  del frontmatter, no purament UI — traduir-los implica migrar contingut).
- Alt text amb interpolació (`Logotip de {{ .Title }}` etc.) a
  `espais/single.html` — necessita sintaxi `i18n` amb dades, no resolta.
- Strings del cercador JS (`cercar/list.html`, resultats de cerca en temps
  real) — viuen dins `<script>`, requereixen passar-los com a variable JS.

Pendent de decidir (no bloqueja res, `content/` es queda 100% català
mentre no es decideixi):
- Adoptar estructura per directori (`/content/ca/`, `/content/en/`) **o** per
  suffix (`activitats/concert-primavera.ca.md`, `.en.md`).
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

### 6.1 Especificació: Calendari / agenda d'activitats (punt 3)

Autocontinguda perquè qualsevol IA la pugui executar sense preguntar més.

**Estat actual (punt de partida):**
- `content/activitats/*.md` — 8 fitxers, frontmatter TOML amb `title`, `date`,
  `draft`, i opcionalment `entitat = "Nom"` (si no hi és, és programació
  pròpia de Nau Bostik). No hi ha camp `hora` ni `planta`/`espai`: l'horari
  viu dins el cos en prosa lliure ("**Data:** 22 d'abril, 19h - 23h"), cosa
  que fa impossible ordenar/filtrar per hora.
- `themes/NauBostik/layouts/activitats/list.html` — llista plana en dues
  seccions (`where ... "Params.entitat" nil` / `"!=" nil`), sense vista
  calendari, sense filtres, sense agrupació per data.
- `content/espais/*.md` usa `planta = "Planta Baixa"|"Primera Planta"|
  "Segona Planta"|"Tercera Planta"` — reutilitzar exactament aquests 4 valors
  si s'afegeix `planta` a activitats (evita micro-taxonomies duplicades).
- Patró JS existent a `themes/NauBostik/static/js/main.js` (vanilla, sense
  framework, `DOMContentLoaded` + funcions `initX()`) i cercador amb JS
  inline a `content/cercar/` — seguir el mateix estil, no introduir cap
  llibreria ni build step.

**Feina a fer (en ordre):**
1. **Frontmatter:** afegir a `content/activitats/*.md` (als 8 fitxers
   existents i a l'arquetip corresponent si n'hi ha a `archetypes/`):
   - `hora = "19:00"` (string `HH:MM`, 24h) — extreure-la del text lliure
     actual de cada fitxer, no inventar-la.
   - `planta = "..."` (opcional, un dels 4 valors de dalt) només si
     l'activitat té espai físic conegut; deixar-lo buit si no es pot
     determinar amb la informació actual — **no inventar dades**.
2. **Agrupació per data:** al template, substituir el `range` pla per
   `.Pages.GroupByDate "2006-01-02"` (vista setmanal) o `"2006-01"` (vista
   mensual) sobre `where site.RegularPages "Section" "activitats"`. Decisió:
   fer les dues vistes amb un toggle simple (botons "Setmana"/"Mes"), estat
   només visual via JS (classe al `<body>` o al contenidor), sense JS
   trencar el contingut si està desactivat — mostrar per defecte la vista
   mensual en `<noscript>`/render inicial i el toggle és millora progressiva.
3. **Filtres (entitat + planta):** UI amb `<select>` o botons, JS vanilla
   que amaga/mostra `.post-card` per `data-entitat`/`data-planta` als
   `<li>` (afegir aquests `data-*` al template, com ja es fa a
   `.espai-card` — comprovar patró a `themes/NauBostik/layouts/espais/
   list.html` abans d'escriure). Sense JS: totes les targetes visibles
   (fallback no-JS obligatori, veure objectiu transversal §6 punt 6).
4. **CSS:** reutilitzar variables existents (`--color-*`, `--radius-sharp`,
   `--spacing`) i classes en el mateix estil que `.post-card`/`.espai-card`
   (BEM-lleuger, `.agenda-*`). No Tailwind, no preprocessador — vanilla CSS
   a `themes/NauBostik/static/css/main.css`.
5. **No tocar:** `data/activitats.yaml` — es descarta aquesta opció (viscuda
   al roadmap com "a considerar"); la font de veritat és el frontmatter de
   `content/activitats/*.md`, no dupliquem dades a `data/`.

**Criteris d'acceptació:**
- `hugo --minify` sense errors ni warnings nous.
- Vista calendari funciona amb JS desactivat (mostra totes les activitats
  agrupades per data, sense trencar-se).
- Filtres entitat/planta funcionen amb JS activat, sense recarregar pàgina.
- Provat a 360px, 768px, >=1100px (§7.5).
- `HISTORIA.md` actualitzat amb l'entrada de sessió (secció 9 d'aquest
  fitxer defineix el format).

Objectius transversals (no-negociables):
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
- [x] Corregir adreça/arreu → Sagrera, Ferran Turné 1-11, 08027 (Bordeta i
      Seu d'Urgell eren erronis). Verificat 2026-08-12: `content/_index.md`,
      `content/qui-som/_index.md`, `content/contacte/_index.md` ja diuen
      Ferran Turné 1-11/Sagrera. Coordenades del mapa OSM (41.424277,
      2.192917) contrastades amb Wikidata (Q27907418: 41.4245, 2.1930) — OK.
- [x] Preparar `hugo.toml` per multi-entorn (treure `baseURL` hardcoded).
      Ja fet al commit `c79ca04`: cap `baseURL` a `hugo.toml`, es passa via
      flag/CI (`.github/workflows/hugo.yml` ja l'especifica).
- [x] Decidir estratègia de branca / repo pel staging privat i la doc interna.
      Decidit 2026-08-12: GH Pages sense auth (protecció = robots.txt +
      noindex, ja implementat); doc interna es queda a `naubostik-web`
      mentre sigui privat, es mouria a `naubostik-DOCS` (repo ja existent)
      només si `naubostik-web` passa a públic. Veure §2.
- [x] Definir i emplenar `i18n/{ca,en}.toml` i marcar cadenes hardcodeades.
      Fet 2026-08-12, veure §5 per detall i excepcions marcades TODO→MULTII18N.
- [x] Decidir CMS: mantenir Decap CMS restaurat, via git-gateway + Netlify
      Identity (2026-08-12). Motiu: editors sense compte GitHub, necessiten
      alta per correu normal. Veure §3 per detall i fitxers.
- [x] Desplegar a Netlify + activar Identity/Git Gateway al tauler. Fet
      2026-08-12: site `naubostik.netlify.app` connectat a
      `github.com/112books/naubostik-web`, build verd amb `netlify.toml`
      (Hugo 0.147.0 pinnejat — sense això el Hugo per defecte de Netlify
      fallava el build). Identity activat, Registration = "Invite only",
      Git Gateway activat i connectat al repo.
- [ ] Convidar els primers usuaris editors per correu (Identity → Invite
      users). Deliberadament NO fet encara — fase molt primerenca del
      projecte, l'usuari ho farà en uns dies.
- [x] Auth de staging: decidit 2026-08-12 **no restaurar-la**. GH Pages es
      queda sense usuari/contrasenya; protecció = no-indexació (§8.1, ja
      implementat: `robots.txt` bloqueja `*` i bots d'IA coneguts, meta
      `noindex/nofollow/noarchive` a `baseof.html`) + repo privat + no
      compartir la URL. La Netlify Edge Function amb Basic Auth (esborrada
      a `c79ca04`) queda descartada mentre no es torni a Netlify.
- [x] Decidir estratègia de `sitemap.xml` mentre el site és privat. Fet
      2026-08-12: `disableKinds = ["sitemap", "RSS"]` a `hugo.toml` (ni es
      genera), reforç addicional `noai`/`noimageai` a meta robots i
      `static/_headers` restaurat (ara efectiu, site a Netlify). Veure §8.1.
- [ ] Auditoria accessibilitat + Lighthouse de Referència (baseline).
- [ ] Crear `README.md` (resum públic del projecte) quan pugem a producció.
- [ ] Mantenir `HISTORIA.md` actualitzada cada sessió amb un model d'IA.
- [ ] Implementar calendari/agenda d'activitats — espec completa a §6.1.
- [ ] Importar contingut d'`https://naubostik.com/entitats-residents/` (site
      antic en producció) a `/collectius/` (site nou). Comprovar quines
      entitats hi falten respecte al contingut actual de `content/collectius/`
      i crear les fitxes que faltin amb dades reals (no placeholder).

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
- Meta `robots` al `<head>` (`themes/NauBostik/layouts/baseof.html`):
  `noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate, noai,
  noimageai` + `googlebot`/`bingbot` explícits + `X-Robots-Tag` equivalent
  al `<head>`. `noai`/`noimageai` no són estàndard IETF però alguns motors
  els reconeixen com a senyal addicional específic anti-entrenament d'IA.
- **Header HTTP real `X-Robots-Tag`** via `static/_headers` (2026-08-12,
  restaurat — esborrat a `c79ca04` quan no hi havia Netlify per servir-lo;
  ara que el site SÍ està desplegat a Netlify (§3), aquest fitxer és
  efectiu de debò: aplica el header a *totes* les respostes del domini,
  no només HTML, sense dependre de cap meta tag. GitHub Pages segueix
  ignorant-lo, però no fa nosa.
- **Sitemap/RSS desactivats del tot (2026-08-12):** `hugo.toml` té
  `disableKinds = ["sitemap", "RSS"]` — ni `sitemap.xml` ni `index.xml` es
  generen. Decisió: no confiar només en "no enllaçar-lo"; mentre és un web
  de desenvolupament que no ha d'aparèixer enlloc, més val que el fitxer
  no existeixi que confiar que ningú el trobi per URL directa. Quan es
  faci producció pública caldrà: (a) treure `disableKinds`, (b) treure el
  `Disallow: /` de `robots.txt`, (c) permetre bots, (d) referenciar el
  sitemap al `robots.txt`.

### 8.2 Accés amb usuari (descartat, 2026-08-12)

Un site 100% estàtic no pot fer `auth` al client. Cal fer-ho a la **capa
d'allotjament**. GitHub Pages **no suporta autenticació**.

**Decidit:** no implementar auth mentre el staging sigui GH Pages. La
protecció és no-indexació (§8.1) + repo privat + no compartir la URL. Si en
el futur cal auth real, cal tornar a Netlify — referència de la solució que
hi havia abans (esborrada al commit `c79ca04`, "neteja Netlify/Decap"):

- **Netlify Edge Function amb HTTP Basic Auth** — `netlify/edge-functions/basic-auth.js`
  llegia les variables d'entorn `SITE_USER` i `SITE_PASS` del tauler de Netlify
  i tancava tot el site (`path = "/*"` a `netlify.toml`) darrere un popup d'autenticació
  bàsica. Equivalent funcional d'un `.htaccess`/`.htpasswd` d'Apache sobre
  un allotjament estàtic. Zero cost al plan gratuït de Netlify. Si es vol
  recuperar, cal recrear tots dos fitxers (veure historial git de `c79ca04`
  per referència del contingut anterior).

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