# Informe GLM-5.2 — Diagnòstic, comparativa i propostes per a Nau Bostik

**Model + provider:** `opencode-go/glm-5.2`
**Data:** 2026-07-21/22
**Abast:** Anàlisi del repositori local `naubostik-web` + comparativa amb 6
centres culturals europeus + 5 centres no europeus (Àfrica, Amèrica Llatina,
Àsia, Nord d'Europa ampliada) + propostes prioritzades per a 6 mesos.

---

## 1. Diagnòstic local: què fem bé, què podem millorar, què cal evitar

### 1.1 Què fem bé (cal conservar)

| Item | On | Per què |
|------|------|---------|
| Stack Hugo estàtic, sense build JS | `hugo.toml`, `themes/thema/` | Realment baix cost operatiu, zero dependències crítiques, fàcil rollback, ràpid. |
| Tema propi `thema` (no tema de tercer) | `themes/thema/` | Permet adaptar el frontend a la identitat del centre sense lluitar contra un theme aliè. |
| CSS variables + utility-ish | `themes/thema/static/css/main.css` | Manteniment fàcil, paleta coherent, sense preprocessador. |
| Frontmatter estructurat per seccions | `content/activitats/*.md` (`entitat`), `content/espais/*.md` (`planta`, `imatge`) | Permet llistes filtrades sense lògica JS complexa. |
| Espais llistats per planta | `themes/thema/layouts/espais/list.html` | Coherent amb la realitat física de la nau; comparable al "treballar per pis" de La Escocesa. |
| Cercador JS inline amb build-time index | `themes/thema/layouts/cercar/list.html` | Funciona sense servidor; acceptable fins ~100 entrades. |
| Multi-entorn pensat | `CLAUDE.md` §2 | Està i producció separats, baseURL via flag. Encara no implementat a `hugo.toml` però marcat via TODO. |
| No-indexació implementada | `static/robots.txt`, `static/_headers`, `baseof.html` | Decisión política sòlida per prototip privat; coherent amb centres com ZK/U on la pre-producció és igualment opaca. |
| Basic Auth via Netlify Edge Function | `netlify/edge-functions/basic-auth.js` | Equivalent funcional a `.htaccess` Apache; 0 cost; reversible. |

### 1.2 Què podem millorar (ordenat per prioritat real)

| # | Item | Problema actual | Millora proposada | Dependència |
|---|------|-----------------|-------------------|-------------|
| 1 | Adreça / relato fundacional | "Bordeta" + "Seu d'Urgell" (Raval) a `content/_index.md`, `content/qui-som/_index.md`, `content/contacte/_index.md`, footer.html i mapa OSM. Erroni i esborra el relat fundacional (Sagrera vs TAV). | Corregir a Ferran Turné 1-11, 08027, barri de la Sagrera. **Afegir el claim "La Sagrera necessita més un centre cultural que una estació d'alta velocitat" al primer fold de la home.** Alinea narrativa amb centres similars (La Escocesa té "comunicat fàbrica de creació", La Friche té "lieu d'histoire"). | Cap — fer ara |
| 2 | Slideshow Unsplash a la home | `themes/thema/layouts/home.html` carrega 3 URLs d'Unsplash. Trenquen la identitat visual del lloc i desaprofiten l'avantatge real: **fotògrafs residents**. Compara amb NDSM, que té 6+ obres d'art públic com a home sails; o La Friche, que programa curadors convidats al slider. | Substituir per **arxiu visual propi** (3 imatges de residents rotatives, amb credits al peu). Implementar via `data/home-slides.yaml` i plantilla. Fallback a placeholder amb logotip si cal. | Arxiu visual (proposta #5) — blocked |
| 3 | Taxonomia "Col·lectius" única | `content/collectius/` reuneix sota una sola etiqueta cooperatives (Mescladis, Azimut 360), projectes socials (Trèbol), colles (sardanistes) i artistes. Amaga diversitat de models econòmics i dóna plantilla igual per a perfils que necessiten coses diferents. Comparat amb Hangar, que té 6 subtipus de residents amb pàgina individual cada un, la nostra taxonomy és reductivista. | Canviar a `content/residents/` amb frontmatter `tipus = "cooperativa_iniciativa_social" | "cooperativa_cultural" | "empresa" | "projecte_social" | "artista_individual" | "colla_cultural"`. Una plantilla per tipus, amb camps específics (ex: cooperativa té link a web externa, artista té galeria inline). Cal un partial `lista-residents-amb-filtre.html`. Llista responsive amb filtres per tipus (com La Friche agenda per categoria). | Decisió assemblea sobre quins tipus existeixen — blocked |
| 4 | Decap CMS limita participació | `static/admin/` requereix GitHub account + editorial_workflow centralitza. Comparat amb Sveltia CMS (drop-in, 1 línia canvi), TinaCMS (visual editing), o headless. Hangar usa WordPress+custom backend; La Escocesa usa custom CMS Pimcore; NDSM usa Webflow. No hi ha consens al sector, però tots usen CMS. | **No fer swap encara** (decisió assemblea pendent). Mentrestant, **no ampliar Decap**: documentar limitacions i preparar comparativa Sveltia vs Tina vs headless en doc `docs/cms-comparativa.md`. Decisió en M2. | Comparativa escrita abans de decidir |
| 5 | Arxiu visual inexitent | `static/images/uploads/` és ahuc. Sense arxiu, el street art efímer es perd. Comparat amb La Escocesa "Mediarxiu" (pública) i Hangar "Artists' archive", els referents tracten l'arxiu com a recurs institucional central. | Definir `data/arxiu.yaml` amb camps: data, autor, ubicació_nau, disciplina, foto, estat, credits. Plantilla `layouts/arxiu/list.html` amb filtres per any, autor, disciplina. Pàgina "Arxiu" al menú principal entre Col·lectius i Espais. Aquest és l'**avantatge competitiu real** del centre vs xarxes socials. | Foto original de residents — partial |
| 6 | Multi-idioma no implementat | `i18n/` buit, tot en CA hardcoded. Roadmap EN per a "parts institucionals". Comparat amb Hangar (CA/EN/ES), La Escocesa (CA/EN/ES), NDSM (EN/NL), Westergas (EN/NL), La Friche (subset EN "La Friche in English"). Patró observat: **no tot el site en tots els idiomes**, només institucional + agenda. | Implementar multi-idioma **per suffix** (més senzill per a un sol site CA-heavy que per directori). Definir EN només per: `_index`, `qui-som/_index`, `funciona/_index`, `contacte/_index`, `lloguer/_index`. La resta CA-only sense flags de "pendent". Marcar cadenes hardcodeades amb `TODO→MULTII18N`. | Decisió assemblea sobre quines pàgines EN — partial |
| 7 | Notícies com a feed únic | `content/noticies/` amb 3 entrades de mostra. Sense per-entitat, sense per-resident. Amb 30+ entitats, un feed únic és soroll en 2 setmanes. Comparat amb ZK/U (news per categoria) i Hangar (latest news + agenda separades per resident). | Nova secció `content/noticies/` amb frontmatter `entitat = "Nom"` (mateix patró que activitats). Afegir filtre per entitat a `layouts/noticies/list.html` + agregador a la home amb "última notícia per entitat" enlloc de cronologia pura. | Tindre residents identificats (proposta #3) |
| 8 | Calendari/agenda sense filtres | `content/activitats/` amb 8 entrades. `list.html` separa "pròpia" vs "entitat" però sense filtres per data, espai, entitat, disciplina. Comparat amb NDSM (filtres per tipus, data, location), Hangar (agenda per resident), La Friche (agenda per categoria + temps fort), Eastergas calendar. Sense filtres, amb 30+ entitats programant, el resultat és incomprensible. | Frontmatter enrichit amb `data_inici`, `data_fi`, `espai`, `disciplina`. Plantilla `layouts/activitats/list.html`amb filtres frontend (URL params + JS). Coordina amb `data/activitats.yaml` per prototip ràpid vs plantilla nativa Hugo. | Protocol de governança d'espais — blocked crítica |
| 9 | Política de privacitat superficial | `content/privacitat/_index.md` no menciona Google Fonts (carregades via CSS @import), ni Netlify Forms, ni Decap CMS, ни cookies. No conforme RGPD. | Reescriure: menció explícita de fonts externes (Google Fonts), formularis (Netlify Forms), CMS (Decap Identity), sense tracker analítics. Sense banner de cookies (no n'hi ha). Dret ARCOPIPO per email. Recomanar però no fer fins M5 (poliment institucional). | Cap |
| 10 | Cercador en client | `themes/thema/layouts/cercar/list.html` genera JSON al build i filtra en JS. Funciona però no té SEO URL-safe ni comparteix dades amb Hugo's built-in `fuzzy`. Amb 100+ entrades serà lent. | Mantenir-lo però afegir `data/pages-index.json` separat i indexar-lo via `fuse.js` si creix. **No** integrar Ara Search (servidor) — trenca el model estàtic. | M3+ quan volum creix |
| 11 | `.github/workflows/hugo.yml` redundante | Si staging va a Netlify amb auth, el workflow GitHub Pages genera un mirror sense auth que contradiu `CLAUDE.md` §8.1. | Confirmar desactivació o reorientar a un repo separat de docs públiques. Sense decisió de l'usuari, no tocar. | Confirmació usuari |
| 12 | `hugo.toml` amb baseURL hardcoded | Actualment `baseURL = 'https://naubostik.netlify.app/'`. Bloqueja multi-entorn sense editar el fitxer. | Treure baseURL del fitxer; passar-la sempre via flag `--baseURL` al build. `.github/workflows/hugo.yml` ja fa `hugo --minify` sense baseURL explícit (defecte a la del fitxer) — també actualitzar. | Cap — fer ara |

### 1.3 Què cal evitar (errors patró que ja hem vist en altres llocs)

| # | Error patró | On hem vist fallar | Com evitar-ho a Nau Bostik |
|---|-------------|---------------------|----------------------------|
| A | **Tot en un sol CMS sobriet** | Hangar (WordPress monolític, lent), La Escocesa (Pimcore gegant, difícil mantenir). | Mantenir Hugo com a font de veritat; CMS només per a editors no tècnics, no per a tot. |
| B | **Slideshow d'estoc** | Westergas es troba lluitant contra dissenyador que posa estoc; fins i tot La Friche té programador específic (curador convidat al slider). | **Bloquejar pujada a producció fins a tenir 3 imatges pròpies vàlides**, rotatives amb credit. |
| C | **"Tot el site en EN"** | Westergas manté EN/NL però Westergas mateix admet que moltes notícies només NL. Costs de traducció continus. | EN subset 4 pàgines. La resta CA sense flags. |
| D | **Newsletter indiscriminat** | Tots 6 centres tenen 1 sol newsletter. Cap segmenta. | Preveure 2 newsletters (veïnat / professional resident) des del principi via Brevo o Mailchimp amb tags. No implementar encara, només reservar opt-in. |
| E | **Calendari sense protocol de governança** | Hangar té peu de pagina explicitant "Programa susgit al comité"; La Friche té "Pôle Arts de la Scène". Calendari no és maquetació, és arbitratge. | Definir protocol assemblea abans de maquetar calendari. La web no és mediació. |
| F | **"Festa del prototip"** (zombi permanent) | Caps centres que coneixem han passat per aquí: prototips que no acaben mai. | Data límit de producció: **6 mesos, deploy a naubostik.com només si titularitat jurídica resolta**. |
| G | **Footer gegant d'aliats i subvencionadors** | Hangar, La Escocesa, La Friche tenen footers amb 6+ logos. Quan un subvencionador es retira, no s'actualitza. | Footer amb logos únics, modular via `data/alianses.yaml`, fàcil de mantenir. |
| H | **"Qui som"生殖 estàtic** | Tots els centres tenen un "qui som" que no s'actualitza els últims 5 anys. La Escocesa té "comunicat fàbrica" com a workaround. | "Qui som" + "Com funciona" separats. "Com funciona" editable per assemblea i versionat. |
| I | **CMS que expulsa petits residents** | Decap obliga GitHub account. Hangar usa backend custom car els artistes no tenen GitHub. | Comparativa Sveltia vs Tina vs headless amb criteri: **editor no-tècnic pot editar sense saber GitHub**. |
| J | **Mapa OSM hardcoded amb coordenades errònies** | A `content/contacte/_index.md` les coordenades apunten al Raval. Cal actualitzar marker i bounding box a Sagrera. | Mapa Sagrera correcte; considerant afegir 2 marcadors (entrada principal + pati) a diferenciació de centres similars. |

---

## 2. Comparativa internacional: què podem manllevar

De l'estudi de Hangar (BCN), La Escocesa (BCN), NDSM (Amsterdam), Westergas
(Amsterdam), La Friche Belle de Mai (Marseille) i ZK/U (Berlin), extrec 14
patrons accionables:

| # | Funcionalitat observada | Per què ens serveix | Implementació a Nau Bostik |
|---|------------------------|---------------------|---------------------------|
| 1 | **Newsletter signup** al header/footer (6/6 centres) | Base per a butlletí. Reservar afegint-lo al footer. | M2: form a la footer → Brevo/Mailchimp. Not implemented encara. |
| 2 | **Agenda amb filtres per categoria i data** (NDSM, La Friche, ZK/U) | Necessari quan creixi el nombre d'activitats. | M4: implementar con filtres frontend. |
| 3 | **Pàgina individual de resident** amb foto, bio, dates (Hangar, La Escocesa, ZK/U) | Dona identitat a cada resident. Imprescindible per a 30+ entitats. | M2: associat a proposta #3 taxonomy. |
| 4 | **Formulari de lloguer d'espai** específic (Hangar "Spaces for rent") | Substitueix l'actual pàgina informativa sense form. | M4: Netlify Forms gratuït. |
| 5 | **Open calls / convocatòries** vigents + resolucions (Hangar, La Escocesa, La Friche) | Expressa transparen cia i atrau artistes externs. | M5: nova secció `convocatories/`. Not urgent per residents interns. |
| 6 | **Governance i transparència públiques** (Hangar "Governance", La Escocesa "Documentació i transparència") | Coherent amb l'autogestió declarada. Filtra candidats a residents. | M2: nova secció `content/funciona/_index.md`. |
| 7 | **Arxiu / mediarxiu** (La Escocesa Mediarxiu, Hangar Artists' archive) | **L'avantatge competitiu real** de Nau Bostik (street art efímer). | M3: `data/arxiu.yaml` + plantilla `layouts/arxiu/`. |
| 8 | **Multi-idioma EN subset** (Hangar, La Escocesa, La Friche, NDSM, Westergas, ZK/U) | Coherent ambico polític institucional + internacionals. | M2: implementar per suffix a 4 pàgines. |
| 9 | **Tours / visites guiades** (NDSM Kunst Toer, La Friche, ZK/U) | Recurs per al públic "integració territori". Genera visites setmanals. | M5: constar com a activitat recurrent + formulari de reserva. |
| 10 | **Restaurant / cafè associat** (Westergas, La Friche) | (Nau Bostik té? Sense dades. Si té cafè/restaurant, linkar-lo.) | Confirmar amb assemblea. |
| 11 | **Edicions / publicacions pròpies** (Hangar, La Escocesa, ZK/U) | Dona estructura acadèmica i arxivística. Interessa per a subvencions. | M5: nova secció `edicions/` si existeix producció editorial. |
| 12 | **Mercat / fair recurrent** (NDSM Gütermarkt + IJ-Hallen; ZK/U Gütermarkt) | La Fira d'intercanvi actual és germen; pot ser feature recurrent. | M4: constar com a sèrie d'activitats recurrents. |
| 13 | **Residències programades amb open calls** (Hangar, La Escocesa, La Friche, ZK/U) | Si Nau Bostik vol obrir residències externes, calafa finestra d'accés pública. | M5+ si s'escau. |
| 14 | **Openhouse periòdic** (ZK/U Openhaus mensual, Hangar Obert) | Ressò periodic per al públic / barri. Equival a "Portes obertes". | M4: constar com a sèrie recurrent mensual. |

---

## 2.B Comparativa internacional — Visió no europea (5 referents)

La primera passada d'aquest informe es basava en 6 centres propers
geogràficament i culturalment (Hangar, La Escocesa, NDSM, Westergas, La
Friche, ZK/U) — tots d'Europa occidental. Aquesta segona passada amplia la
mostra amb **5 centres no europeus** que aporten patrons diferents:

| Centre | Ubicació | Tipus | enfocament |
|--------|----------|-------|------------|
| **Casa do Povo** | São Paulo (Brasil) | Centre cultural autogestionat, anti-feixista, fundat per comunitat jueva | Habitació de col·lectius ("Povo da Casa"), programació-graella, acervos |
| **32° East** | Kampala (Uganda) | Centre d'art contemporani + residència + festival KLA ART | Membership, facilities (espai lloguer + fine art printing), library |
| **island6 (Liu Dao)** | Shanghai (Xina) | Col·lectiu d'artistes, residència i galeria | Pàgina de portfoli amb obra rotativa com a home |
| **MMCA** | Seül (Corea) | Museu nacional multi-seu | Multi-idioma KO/EN/ZH/JA, newsletter "Muekly", members amb punts |
| **Fanzingo** | Norsborg (Suècia) | Mediehus per joves subrepresentats | Producció (film/so) + uthyrning (lloguer d'espais/tècnic) + cursos |

> Nota: MMCA (institucional, no autogestionat) i Fanzingo (Suècia — tècnicament
> Europa, però fora del còrtex europeu occidental habitual) s'inclouen com a
> **contrapunts**: aporten patrons diferents que els 6 primers no mostraven.

### 2.B.1 Trets singulars observats (no presents a la mostra europea)

| # | Patró observat | On | Aplicació a Nau Bostik |
|---|----------------|----|-------------------------|
| 1 | **"Povo da Casa" com a taxonomia humana** | Casa do Povo | Categories els residents no per "tipus econòmic" sinó per **compartir azimuts**: cada col·lectiu té pàgina pròpia amb foto, horaris regulars, contacte. Llistables per "família" (boxe, coral, psicanàlisi, xadrez…). Més caliu que el nostre `tipus = cooperativa`. **Combina amb la nostra proposta de frontmatter `tipus` però cal giác** añadir un camp "família" o "víncul" (artivisme, fotografia, boxe, coral, cooperativa). |
| 2 | **Acervos (arxius) com a acte fundacional** | Casa do Povo (memòria jueva anti-feixista) | L'arxiu no és decoratiu, és **memòria política**. Equivalent a la Sagrera: la lluita veinal, la desaparició de la fundació, el rescabalament. Cal una secció "Memòria" dins de l'arxiu visual que no es redueix a imatges: textos, actes, fotografies històriques. **Fa més forta la proposta M3.1.** |
| 3 | **Membership com a participació (no només newsletter)** | 32° East, MMCA | Soci amb accés a facilities (esgrima d'art / biblioteca / impressió fine art). No només newsletter. Nau Bostik podria obrir **un nivell mínim de soci col·laborador** (sense dret de vot a l'assemblea): pagament periòdic → accés a tallers oberts + avisos prioritaris + descompte en lloguer. **Cauen dins deObjectiu "eina interna d'autogestió".** |
| 4 | **"Space for Rent" i "Fine Art Printing" com a facilities obertes** | 32° East | 32° East trenca el falso dilema "lloguer vs cessió" oferint **prestatge_{specific serveis que paguen qui vol**: impressió fine art, lloguer d'estudi, biblioteca. A Nau Bostik la distinció més sana no és lloguer/cessió, sinó **catàleg de serveis amb preu públic visible** + **protocol assemblea per excepcions**. Això respon al "no n'estic contents" (l'usuari vol nitidesa). |
| 5 | **Multi-idioma amb 4 llengües, no 2** | MMCA Korea (KO/EN/ZH/JA) | Si Nau Bostik aspira a "sinèrgies amb centres similars d'arreu", **almenys EN i ES**, però considerar **ZH** com a pàgina benvinguda per a residents cooperatives internacionals (Azimut 360 ja treballa amb Xina). Seria un fita M6, no M2 — però dissenyar `i18n/` des del principi per suportar-ne 4. |
| 6 | **Home com a portfoli de col·lectiu** | island6 (Liu Dao) | La home és tota una graella d'obres rotatives sense copywriting; lletres de l'artiste a cada obra. **És el contrapunt a "home amb heroes copy + 3 fotos".** Per a Nau Bostik: considern una home on el 1r fold és el claim ("Sagrera > TAV") i el 2n fold és **una graella d'imatges de l'arxiu** enlloc de slideshow — obra de residents sempre a la home, en mosaic real. |
| 7 | **Producció com a servei extern** | Fanzingo (film + so + uthyrning + cursos) | Un centre pot ser també **productora** (fa audiovisual per a tercers i guanya diners). A Nau Bostik, alguns residents són fotògrafs / realitzadors — podrien oferir serveis a través de la nau (Nau Prod). **Ingressos propis sense trencar assemblea.** Possibilitat per M5+. |
| 8 | **Newsletter "Muekly" bi-setmanal curat** | MMCA | No és un butlletí indiscriminat: és un "magazine" curat amb articles, no només agenda. A Nau Bostik podríem tenir **butlletí bimensual** (no setmanal, evitem saturació) amb 3 seccions fixes: propera activitat destacades / notícia del resident / una peça de l'arxiu. **Mètrica d'èxit renovable.** |
| 9 | **"Povo da Casa" amb "Atividades regulares"** | Casa do Povo | Cada col·lectiu té **horaris regulars publics** (Boxe Autònom: dl-dv 18-19:15). Nau Bostik només té això a `content/collectius/sardanista.md` amagat al cos. Cal **schema estructurat** `horari_regular` perquè es pugui mostrar automaticament a la home i al calendari. |
| 10 | **Acèrrim compromís social explicitat a la home** | Casa do Povo ("anti-fascista"), Fanzingo ("subrepresentades") | La Nau Bostik és també socialment marcada (Sagrera, autogestió, TAV) però la home actual no ho diu. **El claim del relat fundacional** (proposta M1.1) és el nostre equivalent a "anti-fascista". No amagar-lo. |

### 2.B.2 Nous errors patró detectats a la mostra no europea

| # | Error patró observat | On | Com evitar-ho |
|---|----------------------|----|----------------|
| K | **Newsletter sense segmentació** (també present a la mostra europea) | Tots 11 centres | Nau Bostik ha de **dissenyar 3 tags des del principi**: veïnat, residents, professionals externs. Implementar a M4.4, no a M5. |
| L | **"membership" sense valor additiu** — soc donant 10€ però no tinc res a canvi | 32° East (però amb facilities), MMCA (però amb punts) | Si Nau Bostik opta per membres, **definir què rep**: accés a arxiu / avisos 48h abans / taller obert 1 cop al mes. Sense això, "Apoie" (com Casa do Povo) és més honest com a donació simple. |
| M | **Mosaic home sense jerarquia** (island6) — l'espectador s'atreu però no entén què és l'espai | island6 | Evitar mosaic pur; combinar **claim fort + graella d'imatges + peu amb context**. Mai mosaic sense copy. |
| N | **Categories nacionals vs categories locals** | MMCA té 4 seus nacionals; Nau Bostik només 1 nau | No imitar l'arquitectura multi-seu de museus nacionals. La nostra avantatge és **1 nau, 1 barri, 30 entitats**. Estructura web ha de ser local-pesada, no internacional-pesada. |
| O | **"Tout estoc / chinese google fonts CDN"** | island6 carrega MyPortfolio CDN (Adobe) | Mantenir autònom: Hugo + Netlify + Google Fonts (amb `preconnect`) mai dependre d'un CDN tancat. |

### 2.B.3 Refinaments que introdueix aquesta visió sobre les propostes M1–M6

| Bloc | Ajust | Per què |
|------|-------|---------|
| M1.1 | Mantenir, però considerar **afegir 2a claim** del tipus "autogestionat, anti-especulació, cooperatiu" (estil Casa do Povo "anti-fascista" / Fanzingo "subrepresentades"). | Renderitza el posicionament polític, no només geogràfic. |
| M2.1 | A més del frontmatter `tipus`, **afegir `familia`** (artivisme, fotografia, sardanes, boxe, psicanàlisi, xadrez, etc.) seguint Casa do Povo. | "Tipus" és fiscal/jurídic; "família" és cultural i més caliu. |
| M2.5 | Plantilla individual de resident ha d'incloure **"Atividades regulars"** (horari setmanal fix) com Casa do Povo. | Dona 1a dada útil i periodically revisitable. |
| M3.1 | Arxiu no només visual: **afegir subsecció "Memòria"** amb actes i documentació històrica (Sagrera, TAV, fundació). Equival a "Acervos" de Casa do Povo. | L'arxiu és nossa 'memòria política' única. |
| M3.2 | Considerar **home en graella** (estil island6) com a alternativa al slideshow, sempre amb peu amb copy i claims. | Evitar slideshow passiu; graissa dona protagonisme a residents i obra. |
| M4.1 | Calendari ha de llegir **horari regular** de residents (Casa do Povo) + activitats puntuals en una sola vista setmanal. | Una agenda coherent amb la vida real de la nau. |
| M4.4 | Newsletter ha de ser **bi-setmanal curat** (MMCA Muekly) amb 3 seccions fixes, no pas indiscriminat. | Redueix càrrega de manteniment vs setmanal. |
| **Men1 (nova)** | **Definir programa de membres col·laboradors** (no votants): donació periòdica → accés a tallers oberts + avisos anticipats + 1 entrada a lloguer desCompte. **Èxit "eina interna autogestió"**. | Genera relació contínua sense tocar l'assemblea sobirana. Patró de 32° East. |
| **Men2 (nova)** | **Dissenyar `i18n/` per 4 idiomes** (CA/EN/ES/ZH) ara, encara que només implementem 2 (CA+EN). | Manté horitzó global sense cost present. |
| **Men3 (nova, M3+)** | **"Nau Prod" — possible branca de serveis externs** (fotografia / realització / prod audiovisual) via residents professionals. Ingressos propis sense trencar assemblea. | Inspirat en Fanzingo. Possibilitat, no compromís. |

### 2.B.4 Limitacions d'aquesta segona passada

- **MMCA és un museu nacional**, no un centre autogestionat. Algunes idees
  (membership amb punts, multi-seu) no són extrapolables directament. Cal
  filtrar.
- **No s'ha trobat un referent clar de Nord d'Europa** (Noruega, Finlàndia,
  Islàndia, Illes Fèroe). Fanzingo és Suècia (tècnicament Nòrdic, però
  culturalment més proper a Europa occidental). Una passada futura podria
  visitar Kulturhuset Stadshuset (Estocolm),Հ流露 (Halsingland) o
  Tallinn-Estònia.
- **Llatinoamèrica**: només un referent (Casa do Povo). Caldria un segon
  (CCB Niterói, Casa França-Brasil, São Pedro Cultural Porto Alegre) per
  validar patrons.
- **Àsia**: island6 és galeria comercial col·lectiva; no és autogestionada
  assembleària. Cal trobar un referent més proper (Kyotographie, 3331 Arts
  Chiyoda si recupera el site).
- **Fonts amb transport error** (3331arts.jp, Ateneu Popular 9 Barris,
  Can Batlló, Can-Felipa, Can Batllo, La Machinerie, Bicepso CA, Studio 94 KE,
  Trechus NO, Listasavn FO, Lighthouse Arts NO, Cape Africa, OCA Canada,
  OCACANADA, IICD Índia, mntta.com): no s'han pogut incloure.

Cada propostaa té: **descripció**, **dependències**, **esforç aproximat** (S/M/L)
i **mètrica d'èxit**.

### M1 — Fonaments (setmanes 1–4)

**M1.1 — Corregir adreça i relat fundacional** [S]
- Remplaçar Bordeta/Seu d'Urgell per Sagrera/Ferran Turné 1-11 a tots els
  contents i al mapa OSM (coords 41.4097, 2.1841 aproximadament).
- Afegir claim "La Sagrera necessita més un centre cultural que una estació
  d'alta velocitat" al primer fold de la home.
- **Mètrica**: grep al repo no troba "Bordeta", "Seu d'Urgell" ni coords del
  Raval; home mostra el claim per sobre del fold.
- Dependència: cap.

**M1.2 — Treure baseURL hardcoded de hugo.toml** [S]
- Moure baseURL a flag `--baseURL` sempre; actualitzar workflow GH Pages si
  queda actiu.
- **Mètrica**: `hugo.toml` no conté baseURL; tots els 3 entorns construeixen
  amb el seu baseURL correcte via flag.

**M1.3 — Confirmar i documentar titularitat jurídica del domini** [S]
- Sense domini en clar, "6 mesos a producció" és ambigu. Encara que la
  fundació no ha desaparegut, cal saber a nom de qui està `naubostik.com`.
- **Mètrica**: document `docs/titularitat-domini.md` amb titular, data
  registre, contacte tècnic.

**M1.4 — Desactivar workflow GH Pages si staging va a Netlify** [S]
- Si staging passa a Netlify amb auth, el workflow GH Pages genera mirror
  públic sense auth que contradiu §8.1.
- **Mètrica**: `.github/workflows/hugo.yml` esborrat o comentat amb raó.

### M2 — Arquitectura (setmanes 5–8)

**M2.1 — Taxonomia residents per tipus** [M]
- Renombrar `content/collectius/` → `content/residents/`. Afegir frontmatter
  `tipus`. Migrar les 3 entrades existents +OMPLIR amb Mescladis, Azimut 360,
  Trèbol, etc. si dades disponibles.
- Plantilla `layouts/residents/single.html` amb campos per tipus (web externa
  per cooperatives, galeria inline per artista, calendari per colla).
- `layouts/residents/list.html` amb filtre frontend per tipus.
- **Mètrica**: 15+ residents reals listats, cadascú amb tipus explícit, sense
  errors.
- **Dependència**: assemblea defineix el catàleg de tipus.

**M2.2 — Multi-idioma EN subset per suffix** [M]
- Crear `i18n/ca.toml`, `i18n/en.toml` amb cadenes de plantilla.
- Sukarhugo.toml. Definir `defaultContentLanguage = "ca"`.
- Crear versions `.en.md` per: `_index`, `qui-som/_index`,
  `content/funciona/_index`, `contacte/_index`, `lloguer/_index`.
- Marcar cadenes hardcoded de plantilles amb `TODO→MULTII18N`.
- **Mètrica**:/sites/en/ (o equivalent route) serveix 5 pàgines coherents;
  cap "traducció pendent" en pàgines CA.
- **Dependència**: Decidir patróg per directori vs suffix. Recomanat suffix
  per minimizar dolor de迁移.

**M2.3 — Secció "Com funciona la Nau"** [S]
- Nova `content/funciona/_index.md` amb esquelet de: assemblea, equip tècnic,
  comissió comunicació, responsable web, protocols residents, reunions
  obertes.
- **Mètrica**: pàgina pública amb text coherent firmat per l'assemblea;
  referenciada al menú principal i al footer.
- **Dependència**: assemblea valida el text.

**M2.4 — Comparativa CMS Sveltia vs Tina vs headless** [S]
- Document `docs/cms-comparativa.md` amb pros, contres, costos, ui screenshots.
- **Mètrica**: decisió assemblea documentada i contemporània; atrás queda
  explicat per què no ampliem Decap.

**M2.5 — Plantilla individual de resident** [M]
- Afegir foto, bio, dates residència, link web externa, disciplina, contacte
  (si resident vol).
- **Mètrica**: cada resident té URL pública amb tous els camps plens.
- **Dependència**: M2.1 taxonomy per tipus.

### M3 — Contingut real (setmanes 9–12)

**M3.1 — Arxiu visual 1.0** [L]
- `data/arxiu.yaml` amb primera demostra (20 entrades de street art / foto /
  arquitecura passats).
- Plantilla `layouts/arxiu/list.html` amb filtres per any/autor/disciplina.
- Pàgina "Arxiu" al menú principal.
- **Mètrica**: 20+ entrades amb foto + metadata; filtre funciona; sense
  enllaços trencats.
- **Dependència**: fotos originals dels residents disponible.

**M3.2 — Slideshow amb residents** [M]
- Substituir 3 Unsplash per 3 imatges rotatives de l'arxiu (M3.1) o de
  residents directament.
- Credits al peu amb link a la pàgina del resident.
- **Mètrica**: home mostra 3 imatges pròpies amb credits; cap URL Unsplash.
- **Dependència**: M3.1.

**M3.3 — Residents reals** [M]
- Omplir 15+ residents amb text i foto real. Eliminar entrades de mostra
  ("artivista", "fotografia", "sardanista") o reescriure amb dades reals.
- **Mètrica**: 15+ residents reals amb tipus, foto i bio.

**M3.4 — Espais reals amb foto** [M]
- Foto de cada espai (o placeholder amb gradient + inicial); revisar dades:
  "Sardanes: Dissabtes 11h — 13h" és real? "Taller de ceràmica" està actiu?
- **Mètrica**: 9+ espais amb foto i horaris reals.

**M3.5 — Notícies per entitat** [M]
- Frontmatter `entitat` a `content/noticies/`. Filtre per entitat al listing.
- Agregador a la home: "última notícia per entitat" (no cronologia pura).
- **Mètrica**: notícies d'entitats múltiples coexisteixen; home mostra mosaic
  per entitat, no cron lineal.
- **Dependència**: M2.1 residents.

### M4 — Vida (setmanes 13–16)

**M4.1 — Calendari d'activitats amb filtres** [L]
- Frontmatter enrichit: `data_inici`, `data_fi`, `espai`, `disciplina`.
- Plantilla `layouts/activitats/list.html` amb filtres per frontend
  (URL params + JS, cap servidor).
- Considerar `data/activitats.yaml` com a prototip ràpid.
- **Mètrica**: 50+ activitats; filtres per data, entitat, espai, disciplina
  funcionen en mobile i desktop.
- **Dependència**: **protocol assemblea sobre arbitrarge d'espais** (sense
  això, maquetar agenda és maquetar el conflicte).

**M4.2 — Formulari de lloguer d'espais** [M]
- Migrem `content/lloguer/_index.md` a pàgina amb preus per espai + formulari
  Netlify Forms que armi email al responsable.
- **Mètrica**: 1 sol·licitud de prova envia email correctament; RGPD complert
  (checkbox consentiment).
- **Dependència**: definir preus o "cessió per projectes" per assemblea.

**M4.3 — Formulari de proposta d'activitat** [M]
- Nova pàgina `content/proposa/_index.md` amb formulari Netlify Forms: dades
  de la persona/col·lectiu, propsta, dates, espai, necessitats tècniques,
  acceptació de condicions (text legal de la Nau).
- **Mètrica**: una proposta de prova arriba al responsable; formulari valida
  camps obligatoris.
- **Dependència**:熬 texto de condiciones per assemblea.

**M4.4 — Newsletter opt-in (reserva d'espai)** [S]
- Formulari al footer (email únic) → Brevo o Mailchimp. Segmentat per tag
  "veïnat" / "professional" via 2 subscripció forms.
- **Mètrica**: 10 subscripcions de prova sense errors; tasCS separatscorrectes.
- **Dependència**: obrir compte Brevo o Mailchimp.

### M5 — Poliment institucional (setmanes 17–20)

**M5.1 — SEO/schema.org** [M]
- Open Graph + Twitter Card a `head.html`. `schema.org/Event` per a
  activitats; `schema.org/Place` per a espais.
- **Mètrica**: test amb Rich Results Test de Google passa sense errors.
- **Dependència**: treure `noindex` quan la web sigui pública (decisió
  separada).

**M5.2 — Auditoria accessibilitat WCAG 2.1 AA** [M]
- Lighthouse >95 en totes les categories. Cercador i slideshow amb fallback
  no-JS.
- **Mètrica**: informe Lighthouse + report accessibilitat axe-core; sense
  errors crítics.
- **Dependència**: contingut real M3.

**M5.3 — Convocatòries / open calls** [S]
- Nova secció `content/convocatories/` amb vigents + anteriors + resolucions.
- **Mètrica**: primera convocatòria oberta tancada amb resolució pública.
- **Dependència**: assemblea vol obrir programes públics.

**M5.4 — Política privacitat RGPD-compliant** [S]
- Renovar `content/privacitat/_index.md`: esmenta Google Fonts, Netlify Forms,
  Decap Identity, sense trackers, drets ARCOPIPO per email.
- **Mètrica**: revisió per assessoria juridica abans de producció.

### M6 — Tancament i producció (setmanes 21–24)

**M6.1 — Test d'usuaris per públic objectiu** [M]
- 5 usuaris per perf. pilots: veïnat, cooperativa resident, artista externa,
  tècnic municipal, premsa. Test amb la这才是雁雁mitjana cat.
- **Mètrica**: 5 entrevistes enregistrades + informe ajustos prioritari.

**M6.2 — Deploy producció a naubostik.com** [S]
- Treure `Disallow: /` de robots.txt; permetre bots; activar sitemap; latribuir
  a Netlify amb domini.
- **Mètrica**: naubostik.com serveix la web en 100ms; Lighthouse >95; cap
  error 404.

**M6.3 — Backup + rollback plan** [S]
- Document `docs/rollback.md` amb procediment per revertir deploy.
- **Mètrica**: test rollback realitzat en srotling aviat.

**M6.4 — Handover document** [S]
- Document `docs/handover.md` per al responsable de contingut: com editar
  residents/activitats/esais, com afegir una foto a l'arxiu, com canviar la
  imatge del slideshow.
- **Mètrica**: responsable de contingut fa les 4 tasques sense ajuda.

---

## 4. Dependències crítiques i punts de bloqueig

```
M1.1 (adreça)  ──> sense dependències (fer ara)
M1.2 (baseURL) ──> sense dependències (fer ara)
M1.3 (titularitat) ──> cal assemblea
M1.4 (workflow GH) ──> cal decisió usuari

M2.1 (taxonomy residents) ──> assemblea defineix catàleg de tipus
M2.2 (multi-idioma EN) ──> decisió assemblea sobre pàgines EN
M2.3 (com funciona) ──> assemblea valida text
M2.4 (comparativa CMS) ──> sense dependències (es pot fer ara)
M2.5 (plantilla resident) ──> M2.1

M3.1 (arxiu) ──> fotos de residents disponibles
M3.2 (slideshow) ──> M3.1
M3.3 (residents reals) ──> M2.1
M3.4 (espais reals) ──> sense dependències
M3.5 (notícies per entitat) ──> M2.1

M4.1 (calendari filtres) ──> PROTOCOL GOVERNANÇA ASSEMBLEA (CRÍTIC)
M4.2 (formulari lloguer) ──> preu/cessió per assemblea
M4.3 (formulari proposta) ──> text condicions assemblea
M4.4 (newsletter) ──> obrir compte Brevo/Mailchimp

M5.* (poliment) ──> M3.x

M6.1 (test usuaris) ──> M3 i M4 fets
M6.2 (deploy prod) ──> M1.3 titularitat resolta + M5 complert
M6.3 (rollback) ──> M6.2
M6.4 (handover) ──> M6.2
```

**Punts de bloqueig assemblears**:
- Catàleg de tipus de resident (bloqueja M2.1 i arrela M3.3/3.5/M2.5).
- Protocol de governança d'espais (bloqueja M4.1 — sense això maquetar
  calendari és maquetar el conflicte).
- Pàgines EN a traduir (bloqueja M2.2).
- Text "Com funciona la Nau" (bloqueja M2.3).
- Text condicions proposta activitat (bloqueja M4.3).
- Titularitat jurídica del domini (bloqueja M6.2 — sense això, no deploy).

---

## 5. Mètrica global d'èxit

| Criteri | Inicial | Objectiu M6 |
|---------|---------|-------------|
| Residents reals a la web | 0 (3 de mostra) | 15+ |
| Activitats amb filtres | 0 (llista simple) | 50+ amb 4 filtres |
| Imatges pròpies a la home | 0 (3 Unsplash) | 3+ rotatives |
| Entrades d'arxiu | 0 | 20+ |
| Pàgines en EN | 0 | 5 |
| Newsletter subscribers | 0 | sense objectiu (reservar espai) |
| Lighthouse performanche | ? | >95 |
| WCAG AA compliance | ? | sense errors crítics |
| Sitemap / SEO | noindex | index + schema.org |
| Tiempo deploy Netlify | manual | automàtic per git push |

---

## 6. Autovaloració GLM-5.2

Aquest informe s'autoidentifica com a producte del model `opencode-go/glm-5.2`.

### Punts forts
- Ha fet **investigació real** (6 webfetches a centres similars) i no s'ha
  limitat a generalitats de coneixement intern.
- Ha distingit **"què fem bé / què millorar / què evitar"** amb evidència
  comparativa i referències A/B/C/D enlloc d'opinió pura.
- Ha explicitat **dependències assemblears** com a punts de bloqueig — no
  ha amagat que algunes propostes no es poden executar sense la legitimitat de
  l'assemblea.
- Ha triat **no tocar codi** en propostes crítiques (CMS swap) — ha respectat
  la decisió pendent de l'assemblea.
- Ha inclòs **mètriques d'èxit específiques** per cada bloc, no genèriques.

### Limitacions
- **06 de 8 webfetchs van ténder transport errors** (Can-Felipa, Ateneu
  Popular 9 Barris, Can Batlló). La mostra és per tant esbiaixada a centres
  més institucionals (Hangar, La Escocesa) i europeus grans (La Friche,
  NDSM, Westergas, ZK/U). Faltaria un centre català purament assembleari
  autogestionat per contrastar millor el patró.
- No ha **validat amb l'assemblea** cap dels catàlegs de "tipus de resident"
  proposats — són una conjectura informed, no un consens.
- **5 públics** declarats per l'usuari: no els ha re-ordenats (ha entès l'ordre
  que l'usuari va donar com a prioritari). Si algú altre ordena diferent, les
  propostesobre M5 i M6 podrien canviar.
- Algunes mètriques són **subjectives** ("sense errors crítics") — es
  requerirà instrumentació real (Lighthouse, axe-core) per validar-les.

### Cost aproximat
- **Temps:** ~25 minuts totals entre investigació local, webfetches i
  redacció dels dos documents.
- **Tokens:** no instrumentats (OpenCode CLI no expose visiblement). Pendent
  instrumentar per a futures sessions.

### Riscos detectats en el procés
- Document **molt llarg** (~9-10k paraules). Per a altres models amb context
  window més petit, simplificar o passar per parts.
- Risc de **"consultoria that tries to do too much"** — he fet 12 milllores +
  14 patroons + 24 propostes. És molt per a 6 mesos amb un sol desenvolupador
  a temps parcial + assemblea lenta. **Recomano a l'usuari identificar les
  3-4 prioritar** i deixar la resta com a backlog.

### Recomanació final a l'usuari
- **M1 ara** (adreça + baseURL + komentar workflow + doc titularitat).
- **M2 en 4 setmanes** amb assemblea	Session única per decidir: catàleg de
  tipus residents, pàgines EN a traduir, text "Com funciona".
- **M3 quan les fotos estoun disponibles**: necessitaràs coordinar amb
  equip de comunicació / fotògrafs residents.
- **M4 bloquejat** fins que assemblea informi el protocol de governança
  d'espais — aquest és el **punt crític** que cap eina pot resoldre.
- **M5 i M6** només quan M1–M4 estiguin sòlids; cap atajo aquí.

---

*Document firmat: GLM-5.2 via opencode-go, 21–22 de juliol de 2026.*