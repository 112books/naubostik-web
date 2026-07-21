# Informe Kimi K3 — Diagnòstic i propostes per a Nau Bostik

**Model:** `opencode-go/kimi-k3` · **Data:** 2026-07-22
**Mètode:** lectura directa del repositori + verificació pròpia de 3 centres
de referència via web (Matadero Madrid, Bag Factory Johannesburg, Hangar
BCN) + patrons extrets de la sessió anterior del projecte.

---

## 1. Diagnòstic crític

El problema de la web actual **no és tècnic, és de relato i d'economia
política interna**. Set punts:

**1.1 La web no sap a qui parla.** Cinq públics (gestió interna, promoció,
territori, art, sinergies) conviuen sense jerarquia. Resultat: una home
genèrica amb slideshow d'Unsplash que no diu res a ningú. Cap centre de
referència verificat (Matadero, Bag Factory, Hangar) té una home genèrica:
Matadero parla al **visitant d'aquesta setmana** (agenda destacada),
Bag Factory parla a **artistes i mecenatge** (35 anys, premis, donació),
Hangar parla a **artistes professionals** (convocatòries, residents, labs).

**1.2 El relat fundacional no hi és.** La Sagrera vs. TAV és la raó d'existir
del centre i no apareix enlloc. Pitjor: la web diu «Bordeta» i posa un
carrer del Raval. No és una errada de dades, és **un esborrat del posicionament
polític**. Bag Factory fa exactament el contrari: la home celebra els seus
35 anys i el seu origen (Triangle Network, Thupelo Workshops, David
Koloane, 1991) com a actiu principal.

**1.3 La taxonomia «col·lectius» és classificatòriament violenta.** Mescladis
(cooperativa de restauració social), Azimut 360 (cooperativa tècnica),
Trèbol (projecte social), sardanistes (colla cultural) i un fotògraf
individual tenen estructures legals, ingressos i necessitats web diferents.
Un sol template per a tots = informació equivocada per a tots.

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

---

## 2. Què fan bé els altres (verificat)

| Centre | Verificat | Patró útil |
|---|---|---|
| **Matadero Madrid** | Sí (web pròpia) | Agregació per **categories** (art, cinema, dansa, pensament, tallers) visible a la home; accessibilitat per activitat (icones: mobilitat, subtítols, audiodescripció, bucle magnètic) com a dada estructurada; navegació per sub-seus (Cineteca, Intermediae, Medialab, Nave 10) cadascuna amb identitat pròpia. |
| **Bag Factory (Joburg)** | Sí (web pròpia) | **Factory Circle** — membership amb identitat pròpia, separat de la newsletter; **Open Studios** com a format recurrent; premis anuals (Bag Factory Awards) com a mecanisme de producció i premsa; l'èxit de fons: 35 anys de memòria explícita com a argument de mecenatge. |
| **Hangar (BCN)** | Sí (web pròpia) | Distingeix **6 tipus de residents** (llarga estada, programa, Wetlab, projectes, becades, arxiu) — confirma el punt 1.3; governança publicada; arxiu d'artistes com a recurs; newsletter al header, no amagada. |
| Casa do Povo, 32° East, island6, MMCA, Fanzingo (via sessió anterior) | No verificat per mi | Patrons: «Povo da Casa» amb horaris regulars públics; facilities amb preu obert; newsletter curat bimensual; home com a graella d'obres. |

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

**P5. Home: claim + graella d'arxiu.** Substituir slideshow d'Unsplash per
graella d'imatges pròpies amb crèdit (patró island6, amb copy). Bloquejat
fins tenir 3+ fotos pròpies vàlides — condició de producció.

**P6. `Com funciona la nau`.** Pàgina pública amb assemblea, equip, comissions
i com s'hi participa. *Mètrica: firmada per l'assemblea, enllaçada al menú.*

### Mesos 2–3 (contingut real)

**P7. Arxiu (`data/arxiu.yaml` + plantilla).** Foto, data, autor, ubicació,
disciplina, estat. 20 entrades inicials. *Bloqueig: fotos dels residents.*

**P8. Residents reals.** 15+ entrades amb foto i dades reals; eliminar les
de mostra. *Mètrica: cap `artivista.md`/`fotografia.md` genèric.*

**P9. Newsletter segmentada des de l'origen.** Dos tags: veïnat /
professional. Brevo o Mailchimp; form al footer. *Mètrica: 10 subscripcions
de prova amb tags correctes.*

### Mesos 3–5 (eines)

**P10. Decisió CMS amb criteri de governança.** Criteri únic: *«l'editor
no tècnic pot editar el seu contingut sense compte de GitHub»*. Comparar
Sveltia / Tina / headless contra això; documentar; decidir. No abans.

**P11. Calendari amb filtres.** `data_inici`, `data_fi`, `espai`,
`disciplina` al frontmatter; filtres client-side. *Bloqueig crític: protocol
assembleari d'assignació d'espais (sense això, maquetem el conflicte).*

**P12. Tres formularis, no un.** (a) Lloguer puntual d'espais; (b) proposta
d'activitat amb condicions; (c) contacte general. Netlify Forms. Cada un
amb responsable i termini de resposta públics. *Bloqueig: textos de
condicions aprovats.*

**P13. Accessibility per activitat.** Patró Matadero: icones d'accessibilitat
(mobilitat reduïda, subtítols, audiodescripció) com a dada del frontmatter
de cada activitat, no com a text lliure. *Mètrica: totes les activitats
noves porten el camp.*

### Mes 6 (tancament)

**P14. Test amb 5 usuaris reals** (veí, cooperativa, artista extern,
tècnic municipal, premsa) i correccions. **P15. Deploy a naubostik.com**
només si: titularitat del domini aclarida + Lighthouse >95 + WCAG AA sense
errors crítics + contingut real complert.

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

---

## 5. Autoavaluació Kimi K3

- **Errors detectats:** 7 (GLM-5.2 en va detectar 12 en la primera passada +
  3 en la segona; els meus 7 solapen amb els seus però els condenso).
- **Verificació pròpia:** 3 centres via webfetch directe (Matadero,
  Bag Factory, Hangar). 2 intents fallits (Tai Kwun, Kulturhuset).
  Aprofito dades de la sessió anterior amb atribució explícita.
- **Diferència d'enfocament:** GLM-5.2 va fer un document molt complet
  (~400 línies, 24 propostes M1–M6 + 3 Men). Jo condenso a **15 propostes**
  agrupades per capacitat d'execució (ara / 4 setmanes / mesos 2-3 / 3-5 /
  mes 6) i marco què necessita assemblea i què no. Criteri: un document de
  24 accions amb un sysadmin sol i assemblea lenta és un document que no
  s'executa.
- **Punt feble reconegut:** menys profunditat en la visió no europea que
  GLM-5.2 (ell va aconseguir Casa do Povo i 32° East; jo m'he quedat amb
  Bag Factory + corroboració parcial). La seva mostra no europea era més
  rica.
- **Valoració global: 3,5/5.** Diagnòstic més compacte, propostes més
  executables, però mostra internacional més feble i menys desenvolupament
  dels punts de governança interna que GLM-5.2.