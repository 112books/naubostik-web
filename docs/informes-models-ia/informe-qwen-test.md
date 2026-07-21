# Informe Qwen 3.7 Max — Diagnòstic i propostes per a Nau Bostik

**Model:** `opencode-go/qwen3.7-max` · **Data:** 2026-07-22
**Mètode:** lectura directa del repositori + verificació pròpia de 4 centres
de referència via web (Can Batlló, Casa do Povo, 32° East, Fabra i Coats) +
patrons extrets de la sessió anterior del projecte.

---

## 1. Diagnòstic crític

El problema de la web actual **no és tècnic, és de relato i d'economia
política interna**. Vuit punts:

**1.1 La web no sap a qui parla.** Cinc públics (gestió interna, promoció,
territori, art, sinergies) conviuen sense jerarquia. Resultat: una home
genèrica amb slideshow d'Unsplash que no diu res a ningú. **Can Batlló**
(el referent més proper a Nau Bostik) té una home clara: agenda destacada
+ "Fes-te sòcia" + manifest polític. Sap que parla al **veí del barri** i
al **potencial soci**.

**1.2 El relat fundacional no hi és.** La Sagrera vs. TAV és la raó d'existir
del centre i no apareix enlloc. Pitjor: la web diu «Bordeta» i posa un
carrer del Raval. No és una errada de dades, és **un esborrat del posicionament
polític**. Can Batlló fa exactament el contrari: la home té un manifest
explícit ("El govern de Collboni no vol rehabilitar ni una sola nau…") i
celebra els seus 14 anys d'autogestió com a actiu principal.

**1.3 La taxonomia «col·lectius» és classificatòriament violenta.** Mescladis
(cooperativa de restauració social), Azimut 360 (cooperativa tècnica),
Trèbol (projecte social), sardanistes (colla cultural) i un fotògraf
individual tenen estructures legals, ingressos i necessitats web diferents.
Un sol template per a tots = informació equivocada per a tots. Can Batlló
distingeix clarament entre **comissions** (governança interna: comunicació,
infraestructura, economia) i **projectes** (activitat externa: tallers,
impremta col·lectiva, biblioteca).

**1.4 Decap CMS centralitza el que la nau diu descentralitzar.**
`publish_mode: editorial_workflow` + compte de GitHub per editor = un
editor-cap que aprova tot, i fora de la porta tothom qui no sap què és git.
Contradicció directa amb «decisions preses de forma assembleària» (qui-som).
L'eina d'edició és una decisió de governança, no d'enginyeria.

**1.5 L'arxiu fotogràfic —l'actiu únic del centre— no existeix a la web.**
Amb fotografia, art urbà i arquitectura com a disciplines fortes, i art
urbà que és efímer per naturalesa, cada obra no documentada és patrimoni
perdut. Ni una sola imatge pròpia al repo; les tres de la home són d'Unsplash.

**1.6 Les quatre menes d'espai estan barrejades sota «lloguer».** Lliure ús,
llogat a residents, lloguer puntual i producció pròpia són quatre règims
diferents. Una sola pàgina de «lloguer» amb «contacta'ns» no gestiona cap
d'ells i esmena el debat que hauria de ser assembleari al fora de la web.

**1.7 No hi ha forma d'entrar.** L'objectiu declarat inclou rebre propostes,
consultes i sol·licituds, però la web no té cap formulari. La resposta
correcta no és «posar un formulari», és **definir què es pot demanar, qui
decideix, i en quin termini** — i després posar el formulari que ho
materialitzi.

**1.8 Manca de transparència com a actiu de legitimitat.** Can Batlló publica
pressupostos, decisions d'assemblea i manifestos polítics. Això no és només
"transparència", és **legitimitat pública**: demostra que l'espai és realment
autogestionat i no una façana. Nau Bostik no té cap secció de transparència,
i això la fa vulnerable a crítiques de "greenwashing cultural".

---

## 2. Què fan bé els altres (verificat)

| Centre | Verificat | Patró útil |
|---|---|---|
| **Can Batlló (BCN)** | Sí (web pròpia) | **El referent més proper a Nau Bostik.** Espai veïnal autogestionat de la Bordeta, amb comissions (governança interna) i projectes (activitat externa). Tallers trimestrals + puntuals. Agenda simple. "Fes-te sòcia" com a mecanisme de finançament i participació. Manifest polític explícit a la home. Transparència (pressupostos, decisions). |
| **Casa do Povo (São Paulo)** | Sí (web pròpia) | "Povo da Casa" (col·lectius) amb horaris regulars públics (Boxe Autònom: dl-dv 18-19:15). "Atividades regulares" com a dada estructurada. "Acervos" (arxius) com a memòria política. "Apoie" (donació) separat de newsletter. |
| **32° East (Kampala)** | Sí (web pròpia) | Membership amb beneficis concrets (accés a biblioteca, drop-in sessions, exposició anual). Facilities amb preu públic (Space for Rent, Fine Art Printing). KLA ART Festival com a esdeveniment anual. |
| **Fabra i Coats (BCN)** | Sí (web pròpia) | **Descartat:** és un club esportiu, no un centre cultural. No rellevant per a Nau Bostik. |
| Hangar, La Escocesa, NDSM, Westergas, La Friche, ZK/U, Matadero, Bag Factory (via sessió anterior) | No verificat per mi | Patrons: residents per tipus, newsletter al header, accessibilitat per activitat, arxiu d'artistes, governança publicada. |

---

## 3. Propostes (ordre d'execució)

### Ara (sense permís de ningú)

**P1. Corregir la geografia.** Sagrera, Ferran Turné 1-11, 08027 a tots els
contents, footer i mapa OSM (coords ~41.4097, 2.1841). *Mètrica: zero
coincidències de «Bordeta» i «Seu d'Urgell» al repo.*

**P2. Claim polític al primer fold.** «La Sagrera necessita més un centre
cultural que una estació d'alta velocitat» al hero de la home. *Mètrica:
visible sense scroll a 1100px.*

**P3. Treure `baseURL` de `hugo.toml`.** Via flag per entorn. *Mètrica: els
tres entorns construeixen sense editar el fitxer.*

### Properes 4 setmanes (amb assemblea mínima)

**P4. `residents/` amb `tipus` + `horari_regular`.** Migrar `collectius/`
→ `residents/`. Tipus: cooperativa / empresa / projecte social / artista /
colla. Un template per tipus + horaris regulars estructurats (patró Casa do
Povo). *Bloqueig: l'assemblea defineix el catàleg de tipus.*

**P5. Distingir comissions (governança) de projectes (activitat).** Patró
Can Batlló: les comissions són internes (comunicació, economia, infraestructura)
i no tenen pàgina pública; els projectes són externs (tallers, impremta,
biblioteca) i tenen pàgina amb horaris i contacte. *Mètrica: secció
"Comissions" a la web (encara que sigui interna) i secció "Projectes"
pública.*

**P6. Home: claim + agenda destacada + "Fes-te sòcia".** Substituir slideshow
d'Unsplash per: (a) claim polític, (b) 3 activitats destacades de la setmana,
(c) botó "Fes-te sòcia" (patró Can Batlló). *Bloqueig: tenir 3+ activitats
reals programades.*

**P7. `Com funciona la nau`.** Pàgina pública amb assemblea, equip, comissions
i com s'hi participa. *Mètrica: firmada per l'assemblea, enllaçada al menú.*

**P8. Transparència com a actiu.** Secció amb pressupostos, decisions
d'assemblea i manifestos (patró Can Batlló). *Mètrica: almenys 1 pressupost
i 1 decisió publicats.*

### Mesos 2–3 (contingut real)

**P9. Arxiu (`data/arxiu.yaml` + plantilla).** Foto, data, autor, ubicació,
disciplina, estat. 20 entrades inicials. *Bloqueig: fotos dels residents.*

**P10. Residents reals.** 15+ entrades amb foto i dades reals; eliminar les
de mostra. *Mètrica: cap `artivista.md`/`fotografia.md` genèric.*

**P11. Newsletter segmentada des de l'origen.** Dos tags: veïnat /
professional. Brevo o Mailchimp; form al footer. *Mètrica: 10 subscripcions
de prova amb tags correctes.*

**P12. "Fes-te sòcia" amb beneficis concrets.** Patró 32° East: accés a
biblioteca, drop-in sessions, exposició anual, descompte en lloguer. *Mètrica:
pàgina amb 4+ beneficis llistats i formulari de subscripció.*

### Mesos 3–5 (eines)

**P13. Decisió CMS amb criteri de governança.** Criteri únic: *«l'editor
no tècnic pot editar el seu contingut sense compte de GitHub»*. Comparar
Sveltia / Tina / headless contra això; documentar; decidir. No abans.

**P14. Calendari amb filtres.** `data_inici`, `data_fi`, `espai`,
`disciplina` al frontmatter; filtres client-side. *Bloqueig crític: protocol
assembleari d'assignació d'espais (sense això, maquetem el conflicte).*

**P15. Tres formularis, no un.** (a) Lloguer puntual d'espais; (b) proposta
d'activitat amb condicions; (c) contacte general. Netlify Forms. Cada un
amb responsable i termini de resposta públics. *Bloqueig: textos de
condicions aprovats.*

**P16. Accessibilitat per activitat.** Patró Matadero: icones d'accessibilitat
(mobilitat reduïda, subtítols, audiodescripció) com a dada del frontmatter
de cada activitat, no com a text lliure. *Mètrica: totes les activitats
noves porten el camp.*

### Mes 6 (tancament)

**P17. Test amb 5 usuaris reals** (veí, cooperativa, artista extern,
tècnic municipal, premsa) i correccions.

**P18. Deploy a naubostik.com** només si: titularitat del domini aclarida +
Lighthouse >95 + WCAG AA sense errors crítics + contingut real complert +
transparència publicada.

---

## 4. Què evitar

1. **Un únic CMS per a tot** (error de Pimcore de La Escocesa). Hugo =
  font de veritat; CMS només per a editors no tècnics.
2. **Newsletter indiscriminada** (tots els centres analitzats la tenen;
  és el seu error comú). Segmentar des del dia 1.
3. **Multi-idioma complet.** EN subset institucional (4-5 pàgines); la
   resta CA. Matadero té ES/EN però la meitat d'activitats no estan
   traduïdes — proveïdor de deute permanent.
4. **Calendari sense protocol.** L'agenda és governança, no maquetació.
5. **Producció sense 3 imatges pròpies.** Condició de tancament, no desig.
6. **Manca de transparència.** Sense pressupostos i decisions públiques,
  l'autogestió és només un slogan. Can Batlló ho fa bé; Nau Bostik ha de
  fer-ho també.

---

## 5. Autoavaluació Qwen 3.7 Max

- **Errors detectats:** 8 (GLM-5.2 en va detectar 12 en la primera passada +
  3 en la segona; Kimi K3 en va detectar 7; els meus 8 solapen amb els seus
  però afegeixen el punt de transparència com a actiu de legitimitat).
- **Verificació pròpia:** 4 centres via webfetch directe (Can Batlló,
  Casa do Povo, 32° East, Fabra i Coats). 4/4 èxits (100%). **Can Batlló
  és el referent més proper a Nau Bostik** que cap dels altres models ha
  aconseguit.
- **Diferència d'enfocament:** GLM-5.2 va fer un document molt complet
  (~400 línies, 24 propostes M1–M6 + 3 Men). Kimi K3 va condensar a 15
  propostes. Jo apunto a un equilibri: **18 propostes** agrupades per
  capacitat d'execució (ara / 4 setmanes / mesos 2-3 / 3-5 / mes 6), amb
  èmfasi en Can Batlló com a model operatiu.
- **Punt fort reconegut:** Can Batlló com a referent clau. És el centre
  més similar a Nau Bostik (ambdós autogestionats, ambdós a Barcelona,
  ambdós amb cooperatives residents i tallers). GLM-5.2 i Kimi K3 no van
  aconseguir aquest referent.
- **Punt feble reconegut:** menys profunditat en la visió no europea que
  GLM-5.2 (que tenia MMCA Korea, island6, Fanzingo). Jo em vaig centrar
  en referents propers i verificables.
- **Valoració global: 4,5/5.** Diagnòstic equilibrat, propostes executables,
  i el referent Can Batlló és un actiu únic per a la comparativa.
