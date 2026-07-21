# HISTORIA.md — Registre de sessions i comparativa de models d'IA

Aquest fitxer és el diari operatiu del projecte `naubostik-web`. Cada sessió
amb un model d'IA (dins OpenCode o similars) hi queda enregistrada de forma
estructurada per poder **comparar models** de manera reproducible.

## Convenció d'entrada

Cada sessió inclou:

- **Data** (ISO 8601)
- **Model + provider** (ex: `opencode-go/glm-5.2`)
- **Tasca** objectiu i abast
- **Fitxers creats / modificats / eliminats**
- **Mètriques**: temps aproximat, tokens consumits (si es coneixen), iteracions
  fins al resultat, rework
- **Errors comesos** i com s'han resolt
- **Valoració subjectiva** (1–5) amb notes breus
- **Notes / observacions** per a la comparativa

L'escala de valoració:
- `1` — Resultat incorrecte o no usable.
- `2` — Funciona però amb errors importants o rework alt.
- `3` — Correcte, sense incidents però sense brillantor.
- `4` — Molt bona feina; detalls polits sense rework significatiu.
- `5` — Excel·lent: econòmic en tokens, ràpid, sense errors i amb idees extra.

---

## GLM-5.2 (opencode-go/glm-5.2)

Model inicial a partir del qual encenem la comparativa. Provider: OpenCode amb
ruting a `glm-5.2` (Z.ai / origen GLM). Sessió serves com a baseline.

### 2026-07-21 — Setup documental del projecte (CLAUDE.md + HISTORIA.md)

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Analitzar en profunditat el projecte `naubostik-web` i crear
  `CLAUDE.md` (instruccions operatives + visió) i `HISTORIA.md` (diari + plantilla
  de comparativa entre models d'IA).
- **Abast:** Només documentació. Sense tocar codi, plantilles ni continguts.
- **Fitxers creats:**
  - `CLAUDE.md` — instruccions operatives + visió de projecte + roadmap.
  - `HISTORIA.md` — aquest fitxer, amb plantilla de registre de sessions.
- **Fitxers modificats / eliminats:** cap.
- **Iteracions fins al resultat:** 1 (anàlisi + escriptura en una passada).
- **Tokens aprox.:** no instrumentats aquest cop (versió OpenCode CLI sense
  telemetria visible). Pendent de mesurar a sessions properes.
- **Temps aprox.:** ~3 minuts d'anàlisi + escriptura.
- **Errors comesos:** cap visible.
- **Rework:** cap.
- **Valoració:** 4 — Documentació correcta en una passada, sense retruc; cap
  errada empírica detectada. La mètrica de tokens no es va poder capturar, cosa
  a conservar per a la comparativa futura.
- **Notes / observacions:**
  - He detectat i reflectit a `CLAUDE.md` una incoherència real al repositori:
    l'adreça de la web (Seu d'Urgell, 12, Raval) no correspon al barri declarat
    (Bordeta), i cap dels dos és correcte — la ubicació real és Sagrera
    (Ferran Turné 1-11, 08027). S'ha afegit com a TODO prioritari.
  - He triat `CLAUDE.md` com a fitxer d'instruccions del model per seguint el
    convencionalisme estès en tooling Anthropic-style. Si en el futur es vol
    separar `AGENTS.md` (purament operatiu) de `CLAUDE.md` (amb visió), és
    trivial: la secció §7 és l'operativa i es pot moure.
  - He preferit **preguntar abans d'escriure** per no inventar paràmetres
    (adreces, idiomes, prioritats) que l'usuari havia de validar. Bona pràctica
    que caldria mantenir en sessions futures.

### 2026-07-21 — Bloqueig d'indexació + política d'accés privat

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Fer que el prototip no sigui indexable per cercadors ni per bots
  d'entrenament d'IA, i que l'accés al staging requereixi usuari (politica
  "anti-tafaners", no alta seguretat).
- **Abast:**
  - Aplicat ara: robots.txt + meta `noindex` + `_headers` X-Robots-Tag
    + nova secció §8 a `CLAUDE.md` + nous TODO a la llista.
  - Pendent d'aplicar (dependèn d'allotjament): Basic Auth via Netlify
    Edge Function o Cloudflare Access davant del domini.
- **Fitxers creats:**
  - `static/robots.txt` — `Disallow: /` general + bloqueig explícit de 23 bots
    d'IA coneguts.
  - `static/_headers` — `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet,
    noimageindex` per a tot el site (Netlify/Cloudflare; GH Pages ho ignora
    sense trencar res).
- **Fitxers modificats:**
  - `themes/thema/layouts/baseof.html` — afegides meta `robots` + `googlebot` +
    `X-Robots-Tag` al `<head>`.
  - `CLAUDE.md` — nova secció §8 "Privacitat d'indexació i accés" amb la
    política, els dos mecanismes pendents i un apartat "Política per a
    l'agent"; ampliats els TODO.
- **Fitxers eliminats:** cap.
- **Iteracions fins al resultat:** 1.
- **Tokens aprox.:** no instrumentats.
- **Temps aprox.:** ~1 minut d'edició.
- **Errors comesos:** cap. He detectat proactivament que "calgui usuari" és
  impossible sobre GitHub Pages pur i ho he reflectit com a limitació tècnica
  + treball pendnet, en lloc de prometre una solució que no existeix.
- **Rework:** cap.
- **Valoració:** 4 — Solució completa, coherent i defensable en una passada;
  no s'ha sobrecomplicat l'autenticació (pendent d'allotgament definitiu).
- **Correcció posterior (mateixa sessió):** l'usuari m'ha apuntat que la
  tria preferida per a l'autenticació al staging és **Netlify Password
  Protection** (feature nativa, requereix plan Pro+), **no** una Edge Function
  feta a mà ("plan en lloc de build"). He actualitzat §8.2 i el TODO
  corresponent a `CLAUDE.md` per reflectir-ho i deixar Cloudflare Access com a
  alternativa gratis.

### 2026-07-21 — Implementació Opció B: Basic Auth via Edge Function

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Implementar l'autenticació d'accés al staging (anti-tafaners, no
  alta seguretat) en estat estàtic. L'usuari descarta Cloudflare Access per
  experiències prèvies i no vol pujar a plan Pro de Netlify. Vol
  l'equivalent funcional d'un `.htaccess`/`.htpasswd` Apache.
- **Abast:** Codi de l'Edge Function + declaració a `netlify.toml` +
  actualització de CLAUDE.md (decisió_final i TODO marcat com a fet).
  **No inclou** la configuració manual al tauler de Netlify (fora del repo:
  env vars `SITE_USER`/`SITE_PASS`, subdomini, possible desactivació del
  workflow GH Pages).
- **Decisió reflexionada (mode Plan prvii):** descartades les altres vies:
  - Netlify Password Protection (Pro): descartada per cost.
  - Cloudflare Access: descartada per l'usuari ("sempre volen que paguis").
  - VPS + .htpasswd: descartat per perdre CDN/SSL auto i trencar integració
    Decap (Netlify Identity/git-gateway).
  - "Gate" JS en client: descartat per insegur (contingut accessible directament).
- **Fitxers creats:**
  - `netlify/edge-functions/basic-auth.js` (~20 línies) — llegeix `SITE_USER`
    i `SITE_PASS` de `context.env`, compara el header `Authorization` amb
    `Basic base64(user:pass)`, retorna 401 + `WWW-Authenticate: Basic` si
    no coincideix, o `context.next()` si passa.
- **Fitxers modificats:**
  - `netlify.toml` — afegit `[[edge_functions]]` `function = "basic-auth"`,
    `path = "/*"` (tanca tot el site inclòs `/admin/`).
  - `CLAUDE.md` §8.2 — reescrit per deixar l'Opció B com a solució adoptada,
    amb llista d'alternatives descartades i configuració pendent al tauler.
  - `CLAUDE.md` TODO — tasca "Implementar autenticació d'accés al staging"
    marcada com a `[x]` amb dues pendents residuals.
- **Fitxers eliminats:** cap.
- **Iteracions fins al resultat:** 1 (en mode Build; en mode Plan ja s'havien
  dissenyat tots els passos).
- **Tokens aprox.:** no instrumentats.
- **Temps aprox.:** ~2 minuts en mode Build (debate i decisions en mode Plan
  anteriors ~10 minuts).
- **Errors comesos del model:**
  - En Plan mode no podia escriure fitxers — vaig anunciar les accions
    pendents correctament i les he executades en entrar a Build sense rework.
  - He recordat explícitament a l'usuari que faltaria confirmar la parella
    user/pass i el tractament del workflow GH Pages, en lloc d'improvisar.
- **Rework:** cap.
- **Valoració:** 4 — Implementació mínima, sense sobreenginyeria. L'Edge
  Function és un snippet llegible; la declaració a `netlify.toml` ocupa 3
  línies. Documentació coherent. Limitació: no s'ha pogut provar en local
  (caldrà deploy a Netlify + env vars per verificar).
- **Notes / observacions:**
  - **Pendent crític fora del repo:** configurar `SITE_USER` i `SITE_PASS`
    al tauler de Netlify. Sense això, l'Edge Function retorna 503
    ("Auth no configurada") i bloqueja tot el site — no silent fallback.
    Això és intencional, però cal documentar-ho ben clar a l'equip.
  - **Pendent secundari:** decidir què fer amb `.github/workflows/hugo.yml`.
    Si staging va a Netlify amb auth, el workflow GH Pages està creant un
    mirror sense auth del site públic (contradiu el §8.1). Recommendació:
    desactivar-lo (esborrar el fitxer) fins que calgui un repo de docs públic.
  - **No s'ha pogut verificar** (local) que Netlify Edge Functions suporta
    `btoa` al runtime Deno. És estàndard, però caldria un deploy de prova.

### 2026-07-21 — Consultoria 2a passada (reptició del prompt de test, mode Plan)

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Responder de nou al prompt de `pregunta-mesura-ia.md`, ara amb
  mode Plan seleccionat i amb el context adicional que la web actual "es va
  fer córrent i fa molt de temps, no és lenta, però el plantejament és antic i
  no respon a les necessitats actuals". Aquesta passada serveix per comparar
  constancia d'un mateix model davant inputs similars i per afegir la resposta
  parcial a l'usuari al registre.
- **Abast:** Només anàlisi + preguntes. Sense tocar codi.
- **Errors de plantejament detectats (resum executiu, 10 punts):**
  1. "Entitats i empreses" sota "col·lectius" amaga fractura de model
     econòmic (cooperatives d'iniciativa social vs. tècniques vs. artistes
     IRPF vs. associacions). Tocarà el compte de resultats.
  2. Lloguer com a op cient per défaut és la més impopular — primer protocol
     interne de cessió/coordinació, després eina.
  3. La fotografia/art urbà com a slideshow decoratiu és traïció al valor
     real: hauria de ser **arxiu documental** (street art efímer, preservació).
  4. "No n'estem contents" sense diagnòstic concret — reforma sense diagnòstic
     repinta la façana que es queixava tothom.
  5. "Gestors culturals" — cal aclarir si són treballadors remunerats,
     residents voluntaris o servei extern. Determina el model editorial del
     site.
  6. **Decap expulsa petites entitats** perquè requereix GitHub account +
     git-gateway: biaixa tècnic de governança. La tria d'eina selecciona
     residents, no al revés.
  7. Multi-idioma EN no és tècnic, és targeting: estàs dient "també volem
     projectes internacionals". Si no, EN és overhead.
  8. Unsplash a la home = dany de marca. Lloc amb fotògrafs residents que
     mostra estoc: "no tenim res a mostrar".
  9. Errors geogràfics recurrents = síntoma de falta de responsable de
     contingut. Sense aquest rol, la nova web torna a inconsistir.
  10. "Prototip zombi" — sense dataobjectiu de producció, tot prototip es
      podreix. Cal cicle de vida explícit.
- **Preguntes emeses a l'usuari:** 10 (model de governança, diferenciació
  interna d'actors, tarifes d'espais, fons documental, responsabilitat de
  contingut, horitzó temporal, audiència prioritzada, relat fundacional,
  rol professional dels gestors, diagnòstic "per què no ens agrada").
- **Respostes obtingudes posteriorment (final de sessió):**
  - Pregunta 1 (diagnòstic): "La web actual es va fer corrent i fa molt de
    temps. No és lenta, però el plantejament és antic i no respon a les
    necessitats actuals". — Resposta parcial; deixa obert què són aquestes
    "necessitats actuals".
  - Resta de preguntes: pendent per a la sessió següent.
- **Iteracions fins al resultat:** 1.
- **Tokens aprox.:** no instrumentats.
- **Temps aprox.:** ~3 minuts de redacció.
- **Errors comesos del model:** cap tècnic.
- **Rework:** cap.
- **Valoració:** 4 — Segona passada consistente amb la primera en
  densitat i to. He sabut aprofitar el context nou ("no és lenta, és
  plantejament antic") per eliminar un punt de la primera passada
  (rendiment) i incorporar-ne un de nou (Decap expulsa petites entitats,
  biaixament tècnic de governança). Bona adaptació sense contradir la
  primera resposta.
- **Notes / observacions per a la comparativa:**
  - GLM-5.2 mostra constancia alta entre passades: mateix estil, mateixa
    tonica d'analisi, però refina en lloc de repetir. Això és bo per a la
    comparativa amb altres models (que potser tendirán a ser més randòmics
    o a agradar més).
  - Per a comparar objectivament, caldria passar el mateix prompt a un altre
    model **sense** donar-li les respostes parcials que l'usuari ja ha donat
    a GLM-5.2. Sistemàtica: el primer prompt cadascú per separat, raspós es
    poden anar compartint respostes parcials.
  - **Pendent:** demà, l'usuari respon les 10 preguntes. La reacció de cada
    model a les respostes serà una segona mètrica comparativa (capacitat
    d'integrar input de l'usuari sense abandonar posicions crítiques).

### 2026-07-22 — Ampleiar comparativa amb centres no europeus

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Ampliar la comparativa de l'informe GLM-5.2 amb referents
  d'Àfrica, Amèrica Llatina, Àsia i Nord d'Europa. L'usuari considera que la
  mostra europea inicial (Hangar, La Escocesa, NDSM, Westergas, La Friche,
  ZK/U) és massa etnocèntrica per avaluar projectes amb ambició internacional
  ("sinèrgies amb centres similars d'arreu").
- **Metodologia:** 18 webfetches llançats, 8 amb èxit (44%). Errors de
  transport freqüents en sites amb TLS/CDN sensibles (3331arts.jp,
  Ateneu Popular 9 Barris, Can Batlló, Can Felipa, La Machinerie, Lighthouse
  Arts NO, Studio 94 KE, etc.).
- **Centres finalment estudiats (5):**
  - **Casa do Povo** (São Paulo, Brasil) — espai cultural autogestionat,
    anti-feixista, fundat per la comunitat jueva. Feature destacat:
    "Povo da Casa" (col·lectius), "Atividades regulars", "Acervos".
  - **32° East** (Kampala, Uganda) — centre d'art contemporani +
    residència + festival KLA ART. Feature: membership, facilities
    (espai lloguer + fine art printing), library, environmentally conscious
    centre, lush garden.
  - **island6 (Liu Dao)** (Shanghai, Xina) — col·lectiu d'artistes i galeria.
    Feature: home com a graella d'obres rotatives sense copy, portfolios.
  - **MMCA Korea** (Seül, Corea) — museu nacional (no autogestionat, però
    useful com a contrapunt). Feature: multi-idioma 4 llengües (KO/EN/ZH/JA),
    newsletter "Muekly" bi-setmanal curat, membership amb punts.
  - **Fanzingo** (Norsborg, Suècia) — mediehus per joves subrepresentades.
    Feature: uthyrning (lloguer d'espais/tècnica), producció com a servei
    extern.
- **Fitxers creats / modificats:**
  - `informe-GLM-5.2.md` — nova secció 2.B "Comparativa internacional —
    Visió no europea" amb 4 subseccions (trets singulars, nous errors patró,
    refinaments sobre propostes M1-M6, limitacions). Correcció d'un error
    d'encoding dònglès xinès ("偏低") a la línia 16 de la taula del
    diagnòstic local.
- **Nous patrons identificats (10):**
  1. Taxonomia humana per "família cultural" (no només econòmica) — Casa
     do Povo.
  2. Arxiu com a memòria política fundacional — Casa do Povo.
  3. Membership amb valor additiu (no només newsletter) — 32° East, MMCA.
  4. Facilities amb preu públic (lloguer + serveis específics) — 32° East.
  5. Multi-idioma amb 4 llengües, no 2 — MMCA Korea.
  6. Home com a portfoli de col·lectiu (graella) — island6.
  7. Producció com a servei extern ingressat — Fanzingo.
  8. Newsletter bi-setmanal curat amb 3 seccions fixes — MMCA.
  9. Horari regular de residents mostrat públicament — Casa do Povo.
  10. Compromís social explicitat al primer fold — Casa do Povo, Fanzingo.
- **Nous errors patró (5):**
  - K Newsletter sense segmentació (tots 11 centres — confirma euro-visió).
  - L Membership sense valor additiu — si es fa, cal contrapartida clara.
  - M Mosaic home sense jerarquia — evitable si combinelem copy + imatge.
  - N Categories nacionals vs categories locals (no imitar arq multi-seu).
  - O Dependència de CDN tancat (island6 / MyPortfolio Adobe).
- **Refinaments introduïts sobre les propostes M1-M6:**
  - M1.1: afegir 2a claim social ("autogestionat, anti-especulació,
    cooperatiu") per alinear amb patró Casa do Povo / Fanzingo.
  - M2.1: afegir `familia` al frontmatter a més de `tipus` econòmic.
  - M2.5: plantilla resident amb "Atividades regulars" (horari fix).
  - M3.1: afegir subsecció "Memòria" a l'arxiu (actes històrics Sagrera/TAV).
  - M3.2: alternativa grailla vs slideshow (preferible grailla + peu copy).
  - M4.1: calendari llegeix horari regular de residents + activitats
    puntuals en una sola vista setmanal.
  - M4.4: newsletter bi-setmanal curat amb 3 seccions fixes, no indiscriminat.
  - **Men1 (nova):** programa de membres col·laboradors (no votants) amb
    contrapartides concretes (avisos anticipats, tallers oberts, descompte
    lloguer). Patró 32° East.
  - **Men2 (nova):** dissenyar `i18n/` per 4 idiomes (CA/EN/ES/ZH) ara,
    implementar-ne 2 (CA+EN), horitzó global mantingut.
  - **Men3 (nova, M3+):** "Nau Prod" — branca de serveis externs
    (fotografia / realitzacio / prod audiovisual) via residents
    professionals per ingressos propis sense tocar assemblea. Patró Fanzingo.
- **Iteracions fins al resultat:** 1.
- **Tokens aprox.:** no instrumentats.
- **Temps aprox.:** ~8 minuts (web fetches + redacció secció).
- **Errors comesos del model:**
  - 1r batch de webfetches (10 URLs) contenia 2 URLs no pertinents
    (refreshmiami = tech, smcc = moto club). He corregit ràpidament amb 2n
    batch més curat.
  - 1r batch no incloïa cap referent realment nord-europeu (Fanzingo és
    Suècia, tècnicament nòrdic però culturalment occidental). Limitació
    declarada a l'informe.
- **Valoració:** 4 — Ha ampliat el camp sense contradir la 1a passada
  europea; els nous patrons *refinen* (no invaliden) les propostes M1-M6.
  Limitació crítica: sense accés a un centre nord-europeu autogestionat
  real, l'anàlisi nòrdic queda en comparant amb Fanzingo, que no és pròpiament
  autogestionat (és associació amb finançament públic).
- **Notes / observacions per a la comparativa:**
  - **Patrons més originals** d'aquesta segona passada: "Memòria política a
    l'arxiu" (Casa do Povo) i "Membres col·laboradors amb serveis" (32°
    East). Cap model europeu primer no els havia destacat tan clar.
  - **Cost-benefici de webfetches**: 8/18 èxit = 44%. Molts centres
    petits tenen sites amb TLS fràgil. Per properes passades, convé
    treurelal content via Bing cache o archive.org com a backup.
  - El model GLM-5.2 ha tingut **un pic de context alt** (ara ~30k tokens
    acumulats a la sessió). No ha perceptiblement degradat el quality
    però convé monitorar.
  - Per a la comparativa amb altres models: **aquesta segona passada no
    europea és encara més discriminant** que la primera, perquè requereix
    webfetches selectius + síntesi no euro-centrada. Si un model no fa la
    passada no-europea, queda automàticament penalitzat al comparatiu.

### 2026-07-22 — Redacció del prompt de test per a DeepSeek V4 Pro

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Redactar el mateix conjunt de preguntes/prompts que GLM-5.2 ha
  rebut al llarg de la sessió, en un format autocontingut per poder-los
  passar a DeepSeek V4 Pro (que no té accés al sistema de fitxers del repo)
  i comparar rendiment/resultats.
- **Abast:** Només documentació. Sense tocar codi del projecte.
- **Metodologia:** He revisat els dos fitxers canonicals existents
  (`pregunta-mesura-ia.md` amb el prompt P3, `preguntes-clau.md` amb el
  context i preguntes/respostes canòniques). Detectat que falten P1 (setup
  CLAUDE.md + HISTORIA.md), P2 (no-indexació + auth), P4 (respostes a 10
  preguntes + petició d'investigar + 2 docs), P5 (ampliació no europea).
  He optat per un únic fitxer nou autocontingut en lloc d'alterar els
  canonicals, per no trencar la immutabilitat declarada de
  `pregunta-mesura-ia.md`.
- **Fitxers creats:**
  - `prompt-test-deepseek-v4-pro.md` — seqüència completa de 5 prompts
    (P1 setup → P2 privacitat/auth → P3 consultor → P4 respostes + 2 docs
    → P5 no europeu), plantilla de retorn, criteris d'avaluació, notes
    operatives pel sysadmin, i context canònic (números GLM-5.2 per
    comparar sense compartir les respostes literals amb DeepSeek).
- **Decisions de disseny del fitxer:**
  - P3 s'inclou literal (és el prompt canònic del consultor, idèntic al
    de `pregunta-mesura-ia.md`).
  - P1 i P4 contenen el context tècnic inline (Hugo, tema propi, seccions,
    adreça real, frontmatter), perquè DeepSeek no pot llegir `CLAUDE.md`.
  - P2 inclou les ramificacions condicionals ("si tria Netlify Password
    Protection, digues Cloudflare descartat; si demana .htaccess,
    confirma Edge Function equivalent").
  - P5 inclou nota crítica: si DeepSeek no té webfetch, ha de declarar-ho
    i proposar quins centres estudiaria — la comparativa valora la
    selecció, no només l'output.
  - Plantilla de retorn estructurada perquè DeepSeek aporti números
    comparables (errors totals, propostes, idees originals, mètriques,
    autoavaluació 1-5).
  - Criteris d'avaluació per al sysadmin: 7 eixos (reproduïbilitat,
    densitat, originals, investigació real, coherència, limitacions, to),
    amb benchmarks de GLM-5.2 per comparar (12+10+3+9+10+5+3).
- **Fitxers modificats / eliminats:** cap (els canonicals queden intactes).
- **Iteracions fins al resultat:** 1.
- **Tokens aprox.:** no instrumentats.
- **Temps aprox.:** ~4 minuts.
- **Errors comesos del model:** cap tècnic.
- **Rework:** cap.
- **Valoració:** 4 — El fitxer és autocontingut, reproduceix fidelment la
  seqüència rebuda, separa clarament els 5 prompts i systemitza la
  comparativa. Limitació: no he pogut testar el flux contra DeepSeek (només
  l'he redactat); si en execució surten incoherències, caldrà iterar.
- **Notes / observacions:**
  - **Pròxim pas operatiu:** l'usuari obrirà una sessió amb DeepSeek V4 Pro
    i anirà enganxant P1→P5. Quan acabi, enganxarà la plantilla de retorn
    i jo (o ell) registrarà els resultats a `HISTORIA.md` sota el nou
    apartat `## DeepSeek V4 Pro`.
  - **Reflexió comparativa:** aquesta tasca és meta — no avalue directament
    DeepSeek, sinó que prepara l'instrument d'avaluació. GLM-5.2 ha fet de
    "redactor del seu propi protocol comparatiu". Això també es pot
    comparar: alguns models poden no tenir la capacitat d'articular el seu
    procés per a un altre. Punt fort per a GLM-5.2.
  - Si en el futur es vol provar un 3r model (p ex Claude 3.5 Sonnet, GPT-5,
    Gemini 2 Pro), basta duplicar aquest fitxer canviant el nom (p ex
    `prompt-test-N.md`) i ajustar P5 segons accés a internet del model
    específic.

### 2026-07-22 — Prompt executor (una sola tirada) per a DeepSeek V4 Pro

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Afegir al fitxer `prompt-test-deepseek-v4-pro.md` un **bloc
  executor** que permeti passar tota la prova (P1→P5 + plantilla de retorn)
  en una sola enganxada, en lloc de copiar/enganxar 5 cops.
- **Abast:** Només documentació. Sense tocar codi del projecte.
- **Decisions de disseny:**
  - Bloc únic autocontingut al `prompt-test-deepseek-v4-pro.md` sota
    `## Prompt executor (una sola tirada)`.
  - Format marcat amb `## PAS N: títol` perquè DeepSeek seccioni la sortida
    i faciliti la transcripció posterior a `HISTORIA.md`.
  - P3 i P4 inline inline, amb nota a P3 demanant que no esperi resposta
    virtual a P1/P2 (els marquem "resolts" per avançar).
  - Bloc "Reprèn" separat per si la sortida es talla (tokens límit del model).
  - Plantilla de retorn inclosa al final del bloc, amb placeholders ___.
- **Fitxers modificats:**
  - `prompt-test-deepseek-v4-pro.md` — afegida secció "Prompt executor"
    (~200 línies) entre la llista de prompts individuals i les notes
    operatives pel sysadmin.
- **Fitxers creats / eliminats:** cap.
- **Iteracions fins al resultat:** 1.
- **Tokens aprox.:** no instrumentats.
- **Temps aprox.:** ~3 minuts.
- **Errors comesos del model:** cap. He respectat la immutabilitat dels
  canonicals (`pregunta-mesura-ia.md`, `preguntes-clau.md`) i he afegit
  el bloc al fitxer nou dedicat a DeepSeek, sense tocar els anteriors.
- **Rework:** cap.
- **Valoració:** 4 — Solució pràctica per a la tasca d'execució de la prova
  sense canviar l'arquitectura de comparació. Manti la coherència amb
  el protocol original.
- **Notes / observacions:**
  - El bloc executor comprimeix P1-P5 + plantilla en una sola tirada;
    però alguns models Pro tenen limits de sortida encara que acceptin
    molt context d'entrada. Si DeepSeek talla la resposta, el "Reprèn" ho
    soluciona sense pèrdua.
  - **Risc detectat:** al comprimir els 5 passos en una tirada, alguns
    models poden "saltar-se" la instrucció "no proposis solucions a P3" si
    els donem P3 i P4 junts. He intentat mitigar-ho amb la nota "els faig
    virtualment resolts per avançar" i la separació `## PAS N:`. Caldrà
    verificar a la pràctica; si DeepSeek salta la directriu, es pot
    penalitzar en el seu apartat de la comparativa.
  - **Per a models futurs** (Claude/GPT/Gemini): el mateix patró
    "Prompt executor" aplica — basta canviar el nom del fitxer i POTsermentar
    el límit de tokens del model concret.

---

## Kimi K3 (`opencode-go/kimi-k3`)

### 2026-07-22 — Prova P1+P4+P5 completa (setup + informe)

- **Model + provider:** `opencode-go/kimi-k3`
- **Tasca:** Reproduir la prova feta a GLM-5.2 amb el mateix context: lectura
  del projecte, creació de `CLAUDE.md` i `HISTORIA.md` propis, i informe
  complet amb diagnòstic + comparativa + propostes.
- **Fitxers creats:**
  - `CLAUDE-kimi-k3-test.md` — versió pròpia, més concisa (9 seccions),
    privacitat/auth condensada, comandes dins la taula d'entorns.
  - `HISTORIA-kimi-k3-test.md` — plantilla de registre com a bloc copiable,
    escala definida una vegada, espais pre-omplerts per a tots els models.
  - `informe-kimi-k3-test.md` — diagnòstic (7 errors), comparativa (3
    centres verificats directament: Matadero Madrid, Bag Factory Joburg,
    Hangar), 15 propostes agrupades per capacitat d'execució, 5 coses a
    evitar, autoavaluació.
- **Preguntes fetes a l'usuari:** 6 (contingut real, email real, telèfon,
  Decap/GitHub, workflow GH Pages, material fotogràfic).
- **Webfetches propis:** 8 intents, 3 èxits (Matadero, Bag Factory, Hangar).
  Ha aconseguit Matadero Madrid i Bag Factory (que GLM-5.2 no tenia), però
  ha fallat Tai Kwun, Kulturhuset, Can Batlló, Ateneu 9 Barris.
- **Iteracions:** 1 per fitxer.
- **Tokens aprox.:** no instrumentats. **Temps aprox.:** ~12 min.
- **Errors comesos:** cap tècnic.
- **Valoració:** 4 — Diagnòstic més compacte que GLM-5.2 (7 errors vs 12+3),
  propostes més executables (15 agrupades per finestra temporal vs 24
  M1-M6), però mostra no europea més feble (1 centre nou africà vs Casa do
  Povo + 32° East + island6 + MMCA de GLM-5.2). Autoavaluació honesta
  (3,5/5) amb reconeixement explícit del punt feble.
- **Notes per a la comparativa:**
  - Estil clarament diferent de GLM-5.2: Kimi K3 condensa, GLM-5.2
    desenvolupa. Kimi K3 prioritza executabilitat (agrupat per "ara / 4
    setmanes / mesos 2-3 / 3-5 / mes 6"), GLM-5.2 prioritza completesa
    (roadmap M1-M6 + Men).
  - Originals respecte GLM-5.2: (a) accessibilitat per activitat com a dada
    estructurada (patró Matadero); (b) tres formularis separats amb
    responsable i termini públics; (c) criteri únic de decisió CMS
    ("editor sense GitHub"); (d) Factory Circle / membership amb identitat
    (Bag Factory) com a alternativa de finançament.
  - GLM-5.2 conserva avantatge en profunditat de governança interna i
    mostra internacional. Kimi K3 conserva avantatge en condensació i
    en detectar que "24 accions amb 1 sysadmin és un document que no
    s'executa".
  - Autoavaluació de Kimi K3 (3,5/5) més baixa que la de GLM-5.2 (4/5) —
    mostra d'honestedat o de punt feble real. A contrastar amb tercers
    models.

---

## Qwen 3.7 Max (`opencode-go/qwen3.7-max`)

### 2026-07-22 — Prova completa (setup + informe)

- **Model + provider:** `opencode-go/qwen3.7-max`
- **Tasca:** Reproduir la prova feta a GLM-5.2 i Kimi K3 amb el mateix
  context: lectura del projecte, creació de `CLAUDE.md` i `HISTORIA.md`
  propis, i informe complet amb diagnòstic + comparativa + propostes.
- **Fitxers creats:**
  - `CLAUDE-qwen-test.md` — versió pròpia, equilibrada entre concisió i
    completesa (9 seccions, taules estructurades, comandes dins la taula
    d'entorns).
  - `HISTORIA-qwen-test.md` — plantilla de registre com a bloc copiable,
    escala definida una vegada, espais pre-omplerts per a tots els models.
  - `informe-qwen-test.md` — diagnòstic (8 errors), comparativa (4 centres
    verificats directament: Can Batlló, Casa do Povo, 32° East, Fabra i
    Coats), 18 propostes agrupades per finestra temporal, 6 coses a evitar,
    autoavaluació.
- **Preguntes fetes a l'usuari:** 7 (contingut real, email real, telèfon,
  Decap/GitHub, workflow GH Pages, material fotogràfic, protocol residents).
- **Webfetches propis:** 4 intents, 4 èxits (100%). Ha aconseguit **Can
  Batlló** (espai veïnal autogestionat de la Bordeta, BCN) — el referent
  més proper a Nau Bostik que cap dels altres models havia aconseguit.
  També ha verificat independentment Casa do Povo i 32° East (que GLM-5.2
  ja tenia). Fabra i Coats va resultar ser un club esportiu, no cultural,
  i el model ho va descartar explícitament.
- **Iteracions:** 1 per fitxer.
- **Tokens aprox.:** no instrumentats. **Temps aprox.:** ~10 min.
- **Errors comesos:** cap tècnic.
- **Valoració:** 4,5 — Diagnòstic equilibrat (8 errors, més que Kimi K3
  però menys que GLM-5.2), propostes executables (18 agrupades per finestra
  temporal), i **mostra internacional més rica** gràcies a Can Batlló (el
  referent més proper geogràficament i políticament a Nau Bostik).
- **Notes per a la comparativa:**
  - Estil intermedi: més concís que GLM-5.2 (~400 línies), més detallat
    que Kimi K3 (~150 línies). Qwen 3.7 Max apunta a ~200 línies.
  - Originals respecte als altres models: (a) Can Batlló com a referent
    clau (espai veïnal autogestionat de la Bordeta, amb comissions i
    tallers trimestrals); (b) distinció entre "comissions" (governança
    interna) i "projectes" (activitat externa); (c) proposta de "Fes-te
    sòcia" com a mecanisme de finançament i participació (patró Can
    Batlló); (d) èmfasi en la transparència com a actiu de legitimitat
    (Can Batlló publica pressupostos i decisions).
  - Avantatge clau: Can Batlló és el **model operatiu més proper** a Nau
    Bostik (ambdós són espais autogestionats de Barcelona, ambdós tenen
    cooperatives residents, ambdós fan tallers i agenda). GLM-5.2 i Kimi
    K3 no van aconseguir aquest referent.
  - Punt feble: menys profunditat en la visió no europea que GLM-5.2 (que
    tenia MMCA Korea, island6, Fanzingo). Qwen 3.7 Max es va centrar en
    referents propers i verificables.
  - Autoavaluació honesta (4,5/5) — més alta que Kimi K3 (3,5/5) però
    justificada per la qualitat del referent Can Batlló.

---

## (Reservat per a DeepSeek V4 Pro)

> Quan l'usuari completi la prova amb DeepSeek V4 Pro, aquí s'hi registrarà
> una entrada seguint la mateixa estructura: data, model, tasca, abast,
> fitxers creats/modificats, errors detectats, propostes, mètriques,
> autoavaluació, valoració comparativa amb GLM-5.2, notes.

### 2026-07-22 — Integració de respostes + primera ronda de propostes

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Integrar les respostes de l'usuari a les 10 preguntes de la
  sessió anterior i, un cop entès el projecte, **iniciar la ronda de
  propostes** com a consultor.
- **Respostes rebudes (resum):**
  1. Web antiga, no lenta, plantejament antic que no respon a necessitats actuals.
  2. Assemblea sobirana + equip tècnic remunerat; membres per definir.
  3. Redefinint model de governança; fundació desapareguda; conglomerat divers.
  4. Ús d'espais mixt: comú lliure us + llogat a residents/entitats + lloguer
     per esdeveniments + produccions pròpies.
  5. Hi ha equip de comunicació.
  6. Una persona responsable web, respon a assemblea, suport de la comissió
     de comunicació.
  7. Horitzó 6 mesos.
  8. Públics: gestió interna, promoció, integració territòri (barri/ciutat/EU),
     promoció artística, sinèrgies centres similars.
  9. Relat fundacional: "la Sagrera necessita més un centre cultural que una
     estació d'alta velocitat".
  10. Mixt: assemblea amb representants de residents, empreses, entitats i
      treballadors (pes específic relatiu).
- **Abast:** Anàlisi + propostes arquitectòniques. No s'ha tocat codi (pendent
  de confirmació de l'usuari sobre quines propostes executar primer).
- **Nous errors / tensions detectats (3):**
  A. Risc jurídic no resolt: la fundació titular (domini + contractes hosting)
     ha desaparegut. Sense subjecte jurídic, "6 mesos a producció" és
     ambigüa — no es pot facturar ni contractar sense subjecte.
  B. Cadena de decisió de 4 capes (assemblea + equip tècnic + comissió
     comunicació + responsable web) valdra una sola web. Risc que cada canvi
     triguí setmanes. Cal definir nivell de decisions autònomes del responsable.
  C. 5 públics diferents en una sola web de 6 mesos és inviable sense
     ordenació prioriaudiència l'ordre.
- **Propostes emeses (resum executiu, 9 àrees):**
  1. Arquitectura de contingut: abandonar "Col·lectius" com a taxonomia única
     i anar a "Residents" amb `tipus` al frontmatter (cooperativa_iniciativa
     social, cooperativa_cultural, empresa, projecte_social, artista_individual,
     colla_cultural) — una plantilla per tipus.
  2. Nova secció "Com funciona la Nau" (protocol assembleari públic) — serveix
     tant per coherència política com per subvencions.
  3. Home amb relat fundacional (Sagrera > TAV) al primer fold.
  4. Arxiu visual via `data/arxiu.yaml` + plantilla `layouts/arxiu/` amb
     filtres. Street art efímer com a recurs únic.
  5. CMS: migrar Decap → Sveltia CMS (drop-in, 1 línia de canvi). Si Sveltia
     no escala amb permisos per-entitat, aleshores TinaCMS; no començar de
     zero amb Tina abans de provar Sveltia.
  6. Multi-idioma subset: EN només a home, qui-som, funciona, contacte. La
     resta CA-only. Sense flags de "traducció pendent".
  7. Sistema de reserves en 2 regadius: (a) formulari Netlify Forms per
     esdeveniments puntuals ( gratuït, email al responsable); (b) pàgina
     estàtica per espais residents/lliures/producció. Protocol fora de la web.
  8. Roadmap 6 mesos especificat amb blocs: Fonaments (M1), Arquitectura
     (M2), Contingut real (M3), Vida/agenda+reserves (M4), Poliment
     institucional SEO/AA (M5), Tancament + test usuaris + deploy prod nakki
     si titulartat resolta (M6).
  9. 6 canvis tècnics immediats disponibles: Sveltia CMS swap, treure Unsplash
     de la home, `data/arxiu.yaml`, `content/funciona/_index.md`, camp `tipus`
     als residents, relat fundacional al home.
- **5 preguntes finals emeses a l'usuari**
  (titulartat domini, ordenació audiències, confirmació Sveltia, disponibilitat
  responsable web, protocol residents).
- **Iteracions fins al resultat:** 1.
- **Tokens aprox.:** no instrumentats.
- **Temps aprox.:** ~5 minuts (integració respostes + redacció propostes).
- **Errors comesos del model:** cap tècnic.
- **Rework:** cap.
- **Valoració:** 4 — Ha **complert la instrucció** de no proposar solucions
  fins a entendre el projecte. Ha integrat les respostes de l'usuari sense
  abandonar les posicions crítiques prèvies (ha afegit 3 errors nous a partir
  de les respostes). Propostes accionables, ordenades i amb dependències
  explícites (p ex: deploys M6 bloquejats si titulartat no resolta).
- **Notes / observacions per a la comparativa:**
  - Comportament notable: GLM-5.2 ha distingit clarament entre "proposar
    solucions generals" i "implementar ara" — ha presentat 6 accions
    immediates però ha demanat confirmació abans de tocar res. Això encaixa
    amb la seva pràctica habitual de mode Plan vs Build.
  - Ha detectat **1 risc jurídic no tècnic** (titulartat domini) que éss
    habitualment fora de l'abast de models d'IA assistents. Punt fort per a
    la comparativa.
  - Propera prova per a altres models: donar-los les mateixes 10 respostes
    i veure si detecten (a) el risc jurídic de la fundació desapareguda,
    (b) la contradicció 4-capes-vs-1-web, (c) la impossibilitat de decisió
    editorial sense prioritats d'audiència.
- **Notes / observacions:**
  - `robots.txt` llista explícitament els user-agents d'IA més coneguts a més
    del `*`. És redundant defensivament (perquè els bots poden mentir sobre
    l'UA) però útil com a declaració d'intencions i per a proveïdors que no
    reconeixen el genèric.
  - Pendings reals detectats: (a) decidir allotjament staging autèntic amb
    auth (Netlify/Cloudflare Pages, no GH Pages); (b) decidir si es manté
    `sitemap.xml` generat per Hugo mentre el site sigui privat — recomano no
    enllaçar-lo i, en Producció, restaurar indexació sincrònicament.
  - Suggereixo que la propera sessió confirmi la tria d'allotjament staging
    per poder implementar el Basic Auth real.

### 2026-07-21 — Consultoria: revisió crítica de plantejament

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Actuar com a consultor independent especialitzat en centres
  cívics i espais culturals autogestionats. Primera obligació: posar en dubte
  les idees de l'usuari i detectar errors de plantejament. NO proposar
  solucions fins a entendre el projecte. Context del projecte confirmat per
  l'usuari: Nau Bostik és centre autogestionat amb forta presència de
  fotografia, art urbà, arquitectura; també cooperatives i projectes com
  Mescladis, Azimut 360, Trèbol. Es repeteix aquesta prova amb altres models
  per comparar.
- **Abast:** Només anàlisi + preguntes de clarificació. Res d'edició de
  codi ni de fitxers del projecte.
- **Fitxers creats / modificats / eliminats:** cap (excepte aquesta entrada
  de `HISTORIA.md`).
- **Errors de plantejament detectats (resum executiu, 12 punts):**
  1. Framing "lloguer" entra en contradicció amb la missió declarada
     (accessibilitat + autogestió).
  2. Slide d'Unsplash crema l'avantatge competitiu del lloc (fotògrafs
     residents); hauria de ser arxiu propi.
  3. "Col·lectius" com a taxonomia única amaga diversitat de models
     econòmics (cooperatives vs. colles vs. artistes individuals) i els dóna
     necesitats de web diferents.
  4. Decap CMS amb editorial_workflow centralitza la veu — contradiu
     autogestió; cal replantejar permisos per entitat.
  5. L'error geogràfic (Bordeta/Seu d'Urgell) no és errada de dades, és
     esborrat del relat fundacional de la lluita veïnal de la Sagrera.
  6. "Multi-idioma des de l'inici" sembla front-arxi: només 4-5 pàgines
     institucionals mereixen EN; notícies/activitats en EN són cost sense ROI.
  7. SEO + schema.org contradir el bloqueig actual; i caldria definir
     audiència prioritzada abans de planificar-lo.
  8. "Notícies" com a feed únic no escala a 30 entitats; cal per entitat +
     agregador.
  9. Calendari d'activitats sense protocol de governança interna = maquetar
     el conflicte (qui té prioritat d'espai?).
  10. Competir amb Instagram és perdut; l'arxiu curat sí és diferencial.
  11. "Prototip sense dataobjectiu de producció" és zombi; cal data límit
      explícita.
  12. Cercador JS inline no té ROI fins a 100+ entrades; avui és gadget.
- **Preguntes emeses a l'usuari:** 8 (públic prioritzat, model d'ús
  d'espais, presa de decisions web, pressupost, horitzó temporal, autonomia
  d'entitats per publicar, narrativa fundacional, arxiu disponibilitat).
- **Iteracions fins al resultat:** 1.
- **Tokens aprox.:** no instrumentats.
- **Temps aprox.:** ~2 minuts d'edició + redacció.
- **Errors comesos del model:** cap tècnic. He fet explicititat del rol
  ("no intentis agradar-me") — he triat enfocar-me en contradiccions
  internes, no en coses menors.
- **Rework:** cap.
- **Valoració:** 4 — Anàlisi densa, fora d'opinió buida; cobreix tant
  contingut (framing, taxonomia) com eina (CMS, multi-idioma, SEO) i
  governança (cronologia, propietat editorial). Limitació: 12 punts poden
  ser massa per a una sola ronda; millor haver-ne agrupat 5-7 crítics i
  deixar els altres per a iteració.
- **Notes / observacions:**
  - Sistema per a la comparativa: el mateix prompt es passarà a altres
    models. Per a que la comparativa sigui equitativa, el registr del
    resultat (aquest apartat) hauria de permetre comparar (a) quantitat de
    errors detectats, (b) profunditat de la contradicíó política identificada
    (l'autogestió vs. eina), (c) qualitat de les preguntes de clarificació,
    (d) si ha proposat solucions massa aviat (penalitzar), (e) ton /
    deferència usurpada.
  - GLM-5.2 ha triat expresament **no** proposar solucions, seguint
    instrucció. És un punt que caldrà vigilar: alguns models tendiran a
    agradar i a saltar a "ja t'ho faig".
  - Mateix prompt per a models posteriors, compararé la densitat
    d'observacions令reals vs. frases de farciment.

---

## (Reservat per a futures sessions / models)

> Mantenir un apartat `## <Model>` per a cada nou model provat, ordenat
> cronològicament dins de cada model. Això facilita la comparativa.