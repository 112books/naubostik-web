# Prompt de test — DeepSeek V4 Pro

Aquest fitxer conté la **seqüència completa de prompts** que es passen a
DeepSeek V4 Pro per reproduir la mateixa prova feta amb `opencode-go/glm-5.2`
al projecte `naubostik-web` (Nau Bostik, Barcelona).

**Instruccions d'ús:**
1. Obre una sessió nova amb DeepSeek V4 Pro.
2. Copia i enganxa els prompts en ordre (P1 → P5), un a un, esperant resposta
   entre cada un.
3. Al final, copia la plantilla de resposta (secció "Plantilla de retorn") i
   demana a DeepSeek que la ompli.
4. Desa la transcripció i la plantilla a `HISTORIA.md` sota `## DeepSeek V4 Pro`.
5. **No comparteixis** amb DeepSeek les respostes que va donar GLM-5.2 — la
   comparativa ha de ser cega per ser vàlida.

**Important:** DeepSeek V4 Pro no té accés al sistema de fitxers del repo.
Tot el context ha d'anar inline. Per això aquest fitxer és més llarg que
`pregunta-mesura-ia.md` (que assumeix accés a `CLAUDE.md`).

---

## P1 — Setup i exploració del projecte

```
Estic treballant en un projecte web per a un espai cultural autogestionat de
Barcelona anomenat Nau Bostik (naubostik.com, encara no públic). El projecte
és un prototip privat fet amb Hugo v0.147.0 (generador estàtic), tema propi
anomenat `thema`, CSS i JS vanilla (sense Tailwind ni cap framework), allotjat
a Netlify. Hi ha un CMS Decap (antic Netlify CMS) a /admin/ que estem
reavaluant.

El repositori té aquesta estructura:
- content/ (markdown del lloc, en català per defecte): _index.md (home),
  activitats/ (programació pròpia + entitats via frontmatter `entitat`),
  cercar/ (cercador JS inline), collectius/ (col·lectius residents),
  contacte/ (adreça + mapa OSM), espais/ (per planta via frontmatter
  `planta`), lloguer/ (pàgina lloguer), noticies/ (bloc), privacitat/,
  qui-som/.
- themes/thema/ (tema propi: layouts, static/css/main.css, static/js/main.js)
- hugo.toml, netlify.toml, .github/workflows/hugo.yml
- static/admin/ (Decap CMS), static/robots.txt, static/_headers

L'adreça física real és: Ferran Turné 1-11, 08027 Barcelona, barri de la
Sagrera. (Nota: actualment el contingut diu "barri de la Bordeta" i
"Carrer de la Seu d'Urgell, 12" — tots dos erronis, cal corregir.)

Disciplines fortes del centre: fotografia, art urbà, arquitectura. Hi ha
cooperatives residents (Mescladis, Azimut 360, Trèbol), col·lectius
culturals (sardanistes, fotografia, artivisme), artistes individuals i
gestors culturals.

Tasca per a tu:
1. Crea un fitxer CLAUDE.md que faci doble funció: (a) instruccions operatives
   per a qualsevol model d'IA/agent que treballi al repositori (estil
   AGENTS.md), i (b) document de projecte (visió, objectius, paràmetres
   tècnics, roadmap). Ha de quedar reflectit: stack tècnic, entorns (local,
   staging privat, producció naubostik.com pendent), multi-idioma previst (CA
   default + EN institucional, ES opcional), CMS pendent de reavaluar
   (candidats: Sveltia CMS, TinaCMS, headless), objectius/roadmap prioritaris.
2. Crea un HISTORIA.md com a diari de sessions on anotarem tot el que fem.
   La idea és aprofitar per mesurar diferents models d'IA en rendiment i
   resultats. Ara iniciem amb GLM-5.2. Cal un apartat per cada model d'IA
   per després comparar-los.

Fes-me les preguntes que et calguin, però primer llegeix el projecte per
saber de què va.
```

> Desa la seva resposta. Si fa preguntes, respon-les seguint les notes de P2.

---

## P2 — Privacitat d'indexació i accés

```
El projecte NO ha de ser indexable per cercadors ni per IA d'entrenament,
i a ser possible cal gui que calgui usuari per accedir-hi. És un prototip
privat, no vull tafaners.

Com vols fer-ho? Proposa-m'ho.
```

> Si demana clarificació, respon: "La opció més independent, de franc i
> fàcil d'implementar. No cal que sigui mega-segura, només és per evitar
> tafaners."

> Si tria Netlify Password Protection (plan Pro), digues: "He provat
> Cloudflare i sempre hi ha problemes, volen que paguis. Un cop resolt
> quina és la millor, podria ser un .htaccess amb un sol password? en tindria
> prou."

> Després de la seva resposta, confirma la implementació i desa-la.

---

## P3 — Prompt del consultor (igual que a GLM-5.2)

Aquest és el prompt **canònic**, idèntic al de `pregunta-mesura-ia.md`. Cal
passar-lo literalment per garantir la comparativa.

```
No ets un assistent. Ets un consultor independent especialitzat en centres
cívics i espais culturals especialitzats en la gestió cultural d'espais i
activitats. La teva primera obligació és posar en dubte les meves idees. No
intentis agradar-me; intenta detectar els errors de plantejament. Només
quan creguis que entens el projecte podràs començar a proposar solucions. Al
centre s'animena Nau Bostik (te web actualment, encara que no n'etemcontents)
i es un centre autogestionat amb presència de moltes entitats i empreses. En
quant a cultura i art te forta presència la fotografia i l'art urbà i
l'arquitectura. Però també hi ha projectes com Mescaldis, Azimut 360, Trebol,
etc. Cooperatives, artístes, gestors culturals..
```

> Desa la seva resposta (errors detectats + preguntes de clarificació).

---

## P4 — Respostes a les 10 preguntes de clarificació

```
Et contesto la resta de preguntes:

1.- La web actual es va fer corrent i fa molt de temps. NO és lenta, però
el plantejament és antic i no respon a les necessitats actuals.
2.- Ara és assemblea sobirana amb equip tècnic remunerat. Encara s'ha
d'acabar de definir els membres de l'assemblea o gestora.
3.- Estem just redefinint el model de governança fa mesos. Hi havia una
fundació que NO ha desaparegut (aclariment pendent) i estem mirant la
millor forma de funcionar amb un conglomerat tan divers d'entitats,
residents i empreses.
4.- Mixt: hi ha espais comuns de lliure us, espais llogats a entitats,
empreses i residents, i espais que es lloguen per esdeveniments i es fan
servir per produccions pròpies.
5.- Hi ha un equip de comunicació.
6.- Hi ha una persona de l'equip de treball responsable, però respon als
desitjos de l'assemblea i compta amb el suport de la comissió de
comunicació. Jo soc el sysadmin encarregat, compto amb tu.
7.- 6 mesos és un bon punt.
8.- Gestió interna, promoció, integració amb territori (barri, ciutat,
europa), promoció artística i cultural, sinèrgies amb altres centres
similars d'arreu.
9.- El relat és que la Sagrera necessita més un centre cultural que la
estació d'alta velocitat.
10.- Es mixte, hi ha l'assemblea formada per representants de residents,
empreses i entitats i treballadors (que tenen un pes específic relatiu).

de moment remena tot el que hi ha al projecte en local, investiga el web i
mira altres centres similars de TOT el món i treu conclusions: què fem bé,
què podem millorar i què cal evitar.

La idea i objectiu és tenir un web que ajudi a comunicar qui som, què
oferim al públic (a cada un d'ells), com, i que a més sigui una eina
interna d'autogestió i organització. També calen funcionalitats per
comunicar (butlletins, xarxes socials, etc.) i rebre propostes, consultes,
lloguer d'espai, proposta d'activitats (amb condicions) etc.

Cal que desenvolupis:
1.- Document amb les preguntes clau i les respostes que t'he donat, per
poder-les fer a altres models d'IA i avaluar-les.
2.- Informe complet en un document identificat amb el teu model, amb les
propostes.
```

> Desa la seva resposta. Hauria de produir 2 documents.

---

## P5 — Ampliació a centres no europeus

```
Cal també una visió no europea, mira Àsia (Japó, Korea, Xina, etc.), Canadà,
Àfrica, Centre i Sud Amèrica i Nord d'Europa.
```

> Desa la seva ampliació. Hauria d'investigar referents globals i afegir una
> secció al seu informe.

---

## Context canònic (referència per a la comparativa)

Aquestes són les respostes que GLM-5.2 va obtenir i que **NO** s'han de
compartir amb DeepSeek (la comparativa ha de ser cega):

- P3 GLM-5.2 va detectar 12 errors de plantejament + 10 preguntes.
- P4 GLM-5.2 va integrar respostes + 3 nous errors (jurídic, 4 capes, 5
  públics sense ordre) + 9 propostes + roadmap 6 mesos + 5 preguntes finals.
- P5 GLM-5.2 va estudiar 5 centres (Casa do Povo São Paulo, 32° East
  Kampala, island6 Shanghai, MMCA Korea, Fanzingo Suècia), va afegir 10
  patrons nous + 5 errors patró + 3 propostes "Men" noves (membres
  col·laboradors, i18n 4 idiomes, Nau Prod).

Aquests números serveixen per comparar (quantitat + qualitat), no per
copiar-los a DeepSeek.

---

## Plantilla de retorn (per demanar a DeepSeek al final)

Copia i enganxa aquesta plantilla al final de la sessió amb DeepSeek i
demana-li que la ompli:

```
Omple aquesta plantilla amb la teva autoavaluació:

## Informe DeepSeek V4 Pro — Resum executiu

**Model + provider:** (omplir)
**Data:** (omplir)
**Abast:** (què has fet: nombre de prompts rebuts, nombre de documents
generats, nombre de centres investigats)

### Errors de plantejament detectats (suma total)
-总数 P3 (consultor): ___ errors, ___ preguntes
- P4 (respostes): ___ nous errors, ___ propostes
- P5 (no europeu): ___ nous patrons, ___ nous errors patró
- Total: ___

### Propostes accionables prioritzades
- Nombre de propostes M1-M6: ___
- Idees originals no derivades del patró europeu: ___
- Depències crítiques identificades: ___

### Métriques
- Temps aprox. de processament: ___
- Tokens consumits (si es coneix): ___
- Iteracions fins al resultat: ___
- Rework: ___ (cap / baix / mitjà / alt)

### Autoavaluació (1-5)
- Densitat d'errors reals detectats: ___
- Profunditat de contradiccions polítiques: ___
- Qualitat de les preguntes de clarificació: ___
- Capacitat de no proposar solucions abans d'entendre: ___
- To críticSenseDeferència: ___
- Adaptabilitat al input de l'usuari: ___
- Valoració global: ___

### Limitacions reconegudes
- (llista les pròpies limitacions)

### Notes per a la comparativa amb GLM-5.2
- (en què creus que has estat millor / pitjor / diferent)
```

---

## Criteris d'avaluació (per al registr a `HISTORIA.md`)

Un cop DeepSeek hagi completat la prova, regista-la a `HISTORIA.md` sota
`## DeepSeek V4 Pro` amb:

1. **Reproduïbilitat**: ha respectat la instrucció "no proposis abans
   d'entendre"? (Sí/No, amb evidència)
2. **Densitat**: quants errors reals ha detectat (no farciment)?
3. ** originals**: quantes idees seves no deriven dels patrons europeus
   obvis (Sveltia, multi-idioma, SEO...)?
4. **Investigació real**: ha fet webfetches/cerca pròpia o ha improvisat?
5. **Coherència amb context donat**: ha contradit respostes de l'usuari?
6. **Limitacions declarades**: és honest amb el que no sap?
7. **To**: és realment crític o afalaga?

Compara amb els números de GLM-5.2 (12 errors P3 + 10 P3 preguntes + 3 nous
errors P4 + 9 propostes + 10 patrons P5 + 5 errors patró P5 + 3 idees Men).

---

## Prompt executor (una sola tirada)

Aquest bloc一次性 autocontingut permet passar tota la prova en **una sola
enganxada** en lloc d'anar copiant P1→P5 un a un. Útil si DeepSeek V4 Pro
accepta prompts llargs (la majoria de versions Pro sí: 128k+ de context).

**Ús:** copia el bloc sota `### Bloc executor` i enganxa'l en una sessió
nova de DeepSeek V4 Pro. Es tracta d'una **sola tirada**; DeepSeek hauria de
respondre tots els passos en ordre. Si la resposta queda truncada, copia el
"Reprèn" que hi ha al final perquè continuï.

### Bloc executor

```
Aquesta és una prova comparativa per avaluar models d'IA. Reproduiràs, amb
el teu estil i capacitats, una seqüència de 5 prompts que ja ha rebut un
altre model (GLM-5.2). No veuràs les seves respostes — la comparativa ha de
ser cega. Treballa en català (codi i noms tècnics en anglès). Només quan
et demani explícitament "proposa solucions", fes-ho; abans, detecta errors
de plantejament i pregunta.

Prova d'acceptar els 5 passos següents en ordre. Respon cada pas per separat
_marcant-lo com a `## PAS N: títol`_. No passis al següent fins a haver
completat l'anterior. Si un pas demana investigació web i no tens accés a
internet, declara-ho explícitament ("No tinc accés a internet") i proposa
què faries si en tinguessis.

============================
PAS 1 — Setup i exploració
============================

Estic treballant en un projecte web per a un espai cultural autogestionat
de Barcelona anomenat Nau Bostik (naubostik.com, encara no públic). El
projecte és un prototip privat fet amb Hugo v0.147.0 (generador estàtic),
tema propi anomenat `thema`, CSS i JS vanilla (sense Tailwind ni cap
framework), allotjat a Netlify. Hi ha un CMS Decap (antic Netlify CMS) a
/admin/ que estem reavaluant.

El repositori té aquesta estructura:
- content/ (markdown del lloc, en català per defecte): _index.md (home),
  activitats/ (programació pròpia + entitats via frontmatter `entitat`),
  cercar/ (cercador JS inline), collectius/ (col·lectius residents),
  contacte/ (adreça + mapa OSM), espais/ (per planta via frontmatter
  `planta`), lloguer/ (pàgina lloguer), noticies/ (bloc), privacitat/,
  qui-som/.
- themes/thema/ (tema propi: layouts, static/css/main.css,
  static/js/main.js)
- hugo.toml, netlify.toml, .github/workflows/hugo.yml
- static/admin/ (Decap CMS), static/robots.txt, static/_headers

L'adreça física real és: Ferran Turné 1-11, 08027 Barcelona, barri de la
Sagrera. (Nota: actualment el contingut diu "barri de la Bordeta" i
"Carrer de la Seu d'Urgell, 12" — tots dos erronis, cal corregir.)

Disciplines fortes del centre: fotografia, art urbà, arquitectura. Hi ha
cooperatives residents (Mescladis, Azimut 360, Trèbol), col·lectius
culturals (sardanistes, fotografia, artivisme), artistes individuals i
gestors culturals.

Tasca per a tu:
1. Crea un fitxer CLAUDE.md que faci doble funció: (a) instruccions
   operatives per a qualsevol model d'IA/agent que treballi al repositori
   (estil AGENTS.md), i (b) document de projecte (visió, objectius,
   paràmetres tècnics, roadmap). Ha de quedar reflectit: stack tècnic,
   entorns (local, staging privat, producció naubostik.com pendent),
   multi-idioma previst (CA default + EN institucional, ES opcional), CMS
   pendent de reavaluar (candidats: Sveltia CMS, TinaCMS, headless),
   objectius/roadmap prioritaris.
2. Crea un HISTORIA.md com a diari de sessions on anotarem tot el que fem.
   La idea és aprofitar per mesurar diferents models d'IA en rendiment i
   resultats. Ara iniciem amb GLM-5.2. Cal un apartat per cada model d'IA
   per després comparar-los.

Fes-me les preguntes que et calguin, però primer llegeix el projecte per
saber de què va.

============================
PAS 2 — Privacitat d'indexació i accés
============================

El projecte NO ha de ser indexable per cercadors ni per IA d'entrenament,
i a ser possible cal gui que calgui usuari per accedir-hi. És un prototip
privat, no vull tafaners.

Context addicional: la opció més independent, de franc i fàcil
d'implementar. No cal que sigui mega-segura, només és per evitar tafaners.
He provat Cloudflare i sempre hi ha problemes, volen que paguis. Un cop
resolt quina és la millor, podria ser un .htaccess amb un sol password? en
tindria prou.

Proposa la implementació que triïs.

============================
PAS 3 — Consultor crític
============================

CONTEXT PER A AQUEST PAS (NO esperis la meva resposta a PAS 1/2; els faig
virtualment "resolts" per avançar):

No ets un assistent. Ets un consultor independent especialitzat en centres
cívics i espais culturals especialitzats en la gestió cultural d'espais i
activitats. La teva primera obligació és posar en dubte les meves idees. No
intentis agradar-me; intenta detectar els errors de plantejament. Només
quan creguis que entens el projecte podràs començar a proposar solucions.
Al centre s'animena Nau Bostik (te web actualment, encara que no n'etem
contents) i es un centre autogestionat amb presència de moltes entitats i
empreses. En quant a cultura i art te forta presència la fotografia i
l'art urbà i l'arquitectura. Però també hi ha projectes com Mescaldis,
Azimut 360, Trebol, etc. Cooperatives, artístes, gestors culturals..

Detecta errors de plantejament i formula preguntes de clarificació. No
proposis solucions encara.

============================
PAS 4 — Respostes i 2 documents
============================

Aquí tens les meves respostes a les teves preguntes:

1.- La web actual es va fer corrent i fa molt de temps. NO és lenta, però
el plantejament és antic i no respon a les necessitats actuals.
2.- Ara és assemblea sobirana amb equip tècnic remunerat. Encara s'ha
d'acabar de definir els membres de l'assemblea o gestora.
3.- Estem just redefinint el model de governança fa mesos. Hi havia una
fundació que NO ha desaparegut (aclariment pendent) i estem mirant la
millor forma de funcionar amb un conglomerat tan divers d'entitats,
residents i empreses.
4.- Mixt: hi ha espais comuns de lliure us, espais llogats a entitats,
empreses i residents, i espais que es lloguen per esdeveniments i es fan
servir per produccions pròpies.
5.- Hi ha un equip de comunicació.
6.- Hi ha una persona de l'equip de treball responsable, però respon als
desitjos de l'assemblea i compta amb el suport de la comissió de
comunicació. Jo soc el sysadmin encarregat, compto amb tu.
7.- 6 mesos és un bon punt.
8.- Gestió interna, promoció, integració amb territori (barri, ciutat,
europa), promoció artística i cultural, sinèrgies amb altres centres
similars d'arreu.
9.- El relat és que la Sagrera necessita més un centre cultural que la
estació d'alta velocitat.
10.- Es mixte, hi ha l'assemblea formada per representants de residents,
empreses i entitats i treballadors (que tenen un pes específic relatiu).

de moment remena tot el que hi ha al projecte en local, investiga el web i
mira altres centres similars de TOT el món i treu conclusions: què fem bé,
què podem millorar i què cal evitar.

La idea i objectiu és tenir un web que ajudi a comunicar qui som, què
oferim al públic (a cada un d'ells), com, i que a més sigui una eina
interna d'autogestió i organització. També calen funcionalitats per
comunicar (butlletins, xarxes socials, etc.) i rebre propostes, consultes,
lloguer d'espai, proposta d'activitats (amb condicions) etc.

Cal que desenvolupis:
1.- Document amb les preguntes clau i les respostes que t'he donat, per
poder-les fer a altres models d'IA i avaluar-les.
2.- Informe complet en un document identificat amb el teu model (DeepSeek
V4 Pro), amb les propostes.

============================
PAS 5 — Ampliació a centres no europeus
============================

Cal també una visió no europea, mira Àsia (Japó, Korea, Xina, etc.),
Canadà, Àfrica, Centre i Sud Amèrica i Nord d'Europa. Apunta quins centres
concretos estudiaries i per què. Si tens accés a internet, investiga-los.
Si no, declara-ho i proposa la selecció raonada.

============================
PLANTILLA DE RETORN
============================

Quan acabis els 5 passos, omple aquesta plantilla:

## Informe DeepSeek V4 Pro — Resum executiu

**Model + provider:** (omplir)
**Data:** (omplir)
**Abast:** (prompts rebuts, documents generats, centres investigats)

### Errors de plantejament detectats (suma total)
- PAS 3 (consultor): ___ errors, ___ preguntes
- PAS 4 (respostes): ___ nous errors, ___ propostes
- PAS 5 (no europeu): ___ nous patrons, ___ nous errors patró
- Total: ___

### Propostes accionables prioritzades
- Nombre de propostes M1-M6: ___
- Idees originals no derivades del patró europeu: ___
- Dependències crítiques identificades: ___

### Métriques
- Temps aprox. de processament: ___
- Tokens consumits (si es coneix): ___
- Iteracions fins al resultat: ___
- Rework: ___ (cap / baix / mitjà / alt)

### Autoavaluació (1-5)
- Densitat d'errors reals detectats: ___
- Profunditat de contradiccions polítiques: ___
- Qualitat de les preguntes de clarificació: ___
- Capacitat de no proposar solucions abans d'entendre: ___
- To críticSense Deferència: ___
- Adaptabilitat al input de l'usuari: ___
- Valoració global: ___

### Limitacions reconegudes
- (llista les pròpies limitacions)

### Notes per a la comparativa amb GLM-5.2
- (en què creus que has estat millor / pitjor / diferent)
```

### Reprèn (si la resposta queda truncada)

```
Continua exactament on t'has quedat. Manté el format `## PAS N: títol` i
no repeteixis el que ja has respost. Si has acabat els 5 passos, omple la
PLANTILLA DE RETORN.
```

---

## Notes operatives per al sysadmin

- Si DeepSeek no té accés a internet (webfetch), P5 quedarà limitat. Demana-li
  que declari explícitament "no tinc accés a internet" i que proposï quins
  centres estudiaria. La comparativa valora la selecció de referents, no només
  el contingut.
- Si DeepSeek no genera fitxers markdown complets sinó només respostes en
  xat, desa les seves respostes i formata'ls tu mateix en un
  `informe-DeepSeek-V4-Pro.md`.
- **No mostris** a DeepSeek l'`informe-GLM-5.2.md` — invalidaria la comparativa.
- Desa totes les respostes literalment (no reformularis) per poder comparar
  estil/ton/densitat.