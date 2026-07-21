# Preguntes clau + respostes — prueba comparativa de models d'IA

Aquest document és **canonical**: conté les preguntes clau que l'usuari ja ha
respost i les respostes concretes que va donar. Serveix per **passar el mateix
context a diferents models d'IA** i comparar les seves propostes de manera
reproducible.

**Instruccions d'ús per al model a avaluar:**

1. Llegeix `CLAUDE.md` del repositori (`naubostik-web`) per entendre l'estat
   tècnic del projecte (Hugo + tema propi, prototip privat, adreça Sagrera,
   multi-idioma pendent, CMS pendent de reavaluar).
2. Llegeix aquest fitxer (`preguntes-clau.md`) per entendre el context real del
   centre i les decisions preses.
3. **No intentis agradar; primer detecta errors de plantejament i tensions.**
4. **Nomes quan creguis que has entès el projecte**, proposa solucions
   accionables.
5. La teva resposta quedarà enregistrada a `HISTORIA.md` sota el teu model.

**Criteris equivalents per a tots els models:**
- Densitat d'errors reals detectats (no de farciment).
- Profunditat de contradiccions polítiques identificades.
- Qualitat de les preguntes de clarificació.
- Penalització si proposa solucions abans d'entendre.
- To i deferència.
- Coherència amb les respostes ja donades (no replantejar el resolt).

---

## Context del centre

**Nau Bostik** és un espai cultural autogestionat al barri de la Sagrera
(Barcelona), adreça real: Ferran Turné 1-11, 08027. Té web actual (Hugo,
privada, prototip) feta fa anys, **no és lenta**, però el plantejament és
antic i no respon a les necessitats actuals.

És un **conglomerat divers**: hi conviuen cooperatives (Mescladis, Azimut
360, Trèbol), col·lectius culturals (colla sardanista, fotografia, artivisme),
artistes individuals i gestors culturals.

Disciplines fortes: **fotografia, art urbà, arquitectura**.

Relat fundacional: **"La Sagrera necessita més un centre cultural que una
estació d'alta velocitat"**.

Hi ha **5 públics objectiu**:
1. Gestió interna (assemblea, residents, equip).
2. Promoció (activitats, espais,Image).
3. Integració amb territori (barri, ciutat, Europa).
4. Promoció artística i cultural.
5. Sinèrgies amb centres similars d'arreu.

---

## Preguntes clau i respostes donades

### 1. Què no agrada de la web actual?

**Resposta:** "Es va fer córrer i fa molt de temps. No és lenta, però el
plantejament és antic i no respon a les necessitats actuals."

> Nota per a models: la resposta no especifica "necessitats actuals" — és
> territori obert per interpretació.

### 2. Model de governança?

**Resposta:** "Ara és assemblea sobirana amb equip tècnic remunerat. Encara
s'ha d'acabar de definir els membres de l'assemblea o gestora."

### 3. Com es defineix el model de governança ara?

**Resposta:** "Estem just redefinint el model de governança fa mesos. Hi havia
una fundació (NO ha desaparegut — aclariment en curs) i estem mirant la
millor forma de funcionar amb un conglomerat tan divers d'entitats, residents
i empreses."

### 4. Ús dels espais?

**Resposta:** "Mixt. Hi ha:
- Espais comuns de lliure us.
- Espais llogats a entitats, empreses i residents.
- Espais que es lloguen per esdeveniments.
- Espais per a produccions pròpies."

### 5. Equip de comunicació?

**Resposta:** "Hi ha un equip de comunicació."

### 6. Responsable de la web?

**Resposta:** "Una persona de l'equip de treball és responsable, però respon
als desitjos de l'assemblea i compta amb el suport de la comissió de
comunicació. Jo (l'usuari) soc el sysadmin encarregat."

### 7. Horitzó de producció?

**Resposta:** "6 mesos és un bon punt."

### 8. Públics objectiu?

**Resposta (en aquest ordre explícit):**
1. Gestió interna
2. Promoció
3. Integració amb territori (barri, ciutat, Europa)
4. Promoció artística i cultural
5. Sinèrgies amb altres centres similars d'arreu

### 9. Relat fundacional?

**Resposta:** "La Sagrera necessita més un centre cultural que una estació
d'alta velocitat."

### 10. Estructura assembleària?

**Resposta:** "Mixt. Hi ha assemblea formada per representants de residents,
empreses i entitats, i treballadors (que tenen un pes específic relatiu)."

### 11. Decisions obertes / pendents

**Resposta:** "Audències — encara cal decidir ordre prioritzat.
Decap → Sveltia — cal veurevantatges i desavantatges, no fer swap encara.
Protocols residents — encara no, cal desenvolupar-los.
Titularitat jurídica / fundació — aclariment pendent."

---

##	Objectiu de la nova web (declaració de l'usuari)

> "Tenir un web que ajudi a comunicar **qui som**, **què oferim** al públic
> (cadascun d'ells), **com**, i que a més sigui una **eina interna
> d'autogestió i organització**. També calen funcionalitats per **comunicar**
> (butlletins, xarxes socials, etc.) i **rebre propostes, consultes, lloguer
> d'espai, proposta d'activitats (amb condicions)**."

---

## Indicis tècnics何 Study (extrets del repositori)

- Hugo v0.147.0, tema propi `thema`, CSS/JS vanilla.
- Seccions: `_index`, `activitats/`, `cercar/`, `collectius/`, `contacte/`,
  `espais/`, `lloguer/`, `noticies/`, `privacitat/`, `qui-som/`.
- Taxonomies: `categories`, `tags` (definides, no explotades).
- Frontmatter `entitat` separa programació pròpia vs entitats.
- Frontmatter `planta` (Planta Baixa/Primera/Segona/Tercera) agrupa espais.
- Frontmatter `imatge` URL per espais (sense imatge: placeholder).
- Cercaidor JS inline (genera llista a build time, filtre en client).
- Slideshow JS a la home (imatges d'Unsplash — a substituir).
- Decap CMS a `/admin/` (editorial_workflow + Netlify Identity).
- Staging protegit: Netlify Edge Function + Basic Auth + env vars
  `SITE_USER`/`SITE_PASS`.
- No-indexació: robots.txt + meta noindex + _headers X-Robots-Tag.
- Multi-idioma NO implementat (`i18n/` buit), previst EN subset.

---

## Comparativa: referents internacionals analitzats (resum)

Aquesta secció es presenta a tots els models amb el mateix material. Sis
centres similars estudiats: Hangar (BCN), La Escocesa (BCN), NDSM (Amsterdam),
Westergas (Amsterdam), La Friche Belle de Mai (Marseille), ZK/U (Berlin).

**Trets comuns observats** (que es repeteixen en 5 o 6 dels 6 casos):
- Newsletter signup al header o footer (gairebé obligatori).
- Agenda amb filtres per tipus (música / expo / taller / cinema / tour).
- Residents / fellows amb pàgina individual, foto, bio, dates residència.
- Lloguer d'espais amb formulari específic i pàgina dedicada amb preus i
  característiques.
- Open calls / convocatòries vigents i anteriors amb resolucions públiques.
- Governance explicitada i transparència documental (Hangar, La Escocesa,
  La Friche).
- Arxiu / mediarxiu / publicacions (La Escocesa "Mediarxiu", Hangar
  "Artists' archive", NDSM "magazine").
- Multi-idioma mínim EN (Hangar i La Escocesa: 3 idiomes, NDSM: EN/NL,
  Westergas: EN/NL, La Friche: subset "La Friche in English").
- Xarxes socials (Instagram gairebé universal; Bluesky/Mastodon emergint;
  Facebook residual; YouTube selectiu).
- Aliances / partners / subvencionadors mostrats al footer.
- Tours / visites guiades com a recurs públic (NDSM, ZK/U, La Friche).
- Restaurant / cafè com a part del pol cultural (Westergas, La Friche).
- Edicions / publicacions pròpies (Hangar, La Escocesa, ZK/U).
- Mercat / fair recurrent com a programació (NDSM Gütermarkt, IJ-Hallen;
  ZK/U Gütermarkt; La Friche Jobin).
- Residències programades amb calls públiques (Hangar, La Escocesa,
  La Friche, ZK/U).
- Calendari d'openhaus / obertures al públic periòdiques (ZK/U Openhaus
  mensual, Hangar Obert setmanal).

**Blindspots observats (coses que no fan i podríem aprendre'n):**
- Pocs tenen un "com funciona el centre" assembleari públic
  (La Escocesa és el millor exemple — explicita transparència).
- Pocs tenen perfil individual d'artista amb portfoli integrat
  (tots tenen bio, no portfoli).
- Pocs朋友圈 tenen butlletí segmentat per públic
  (generalment un sol newsletter indiscriminat).
- Pocs tenen formulari de proposta d'activitat (la major part nomésform de
  lloguer): aprofitament limitat del web com a porta d'entrada de la
  programació.

---

## Pregunta final al model a avaluar

> Donat aquest context i aquesta comparativa, fes:
>
> 1. **Diagnòstic crític**: què està mal plantejat en el projecte actual?
>    (Detectar contradiccions i tensions, no agradar.)
> 2. **Llista priorizada de propostes accionables** per entregar en 6 mesos,
>    amb dependències explícites (p ex: "el calendari requereix primer
>    el protocol de governança interna").
> 3. **Mètriques d'èxit** per a cada propostaa: com sabrem que funciona?
> 4. **Errors que cal evitar** (patterns vistos en altres centres que hem
>    d'evitar replicar).
>
> No proponguis res que no puguis justificar davant l'assemblea sobirana.