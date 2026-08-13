# Idees a implementar

Recull de funcionalitats i millores pendents per a naubostik.com. Document viu — s'actualitza a cada sessió.

---

## Portada

### Secció "Aquesta setmana" — activitats
**Implementat (2026-08-13):** 4 columnes — 3 cards de les pròximes activitats de la Nau Bostik + columna dreta amb llista d'activitats de les entitats residents (data · hora · títol).

**Pendent:**
- Adaptar el nombre de cards (2–4) segons quants events destacats hi hagi
- Afegir camp `destacat = true` a les activitats per controlar quines apareixen a portada

### Secció "Notícies"
**Implementat (2026-08-13):** 3 columnes — notícia destacada gran (col 1), 3 darreres notícies normals (col 2), llista "Del territori" (col 3). Camps frontmatter disponibles: `destacada = true`, `territori = true`.

**Pendent:**
- Afegir camp `imatge` al frontmatter de notícies i al CMS (Decap config)
- Importar notícies reals des de naubostik.com i classificar-les

### Secció "La Nau" — pestanyes
**Implementat (2026-08-13):** Pestanyes Espais / Equip humà.

**Pendent:**
- Afegir membres reals de l'equip a `data/equip.yaml` (nom, foto, rol, correu corporatiu)
- Afegir col·laboradors amb camp `tipus: colaborador` al YAML

---

## Pàgines de secció

### /activitats/
**Implementat (2026-08-13):** 3 columnes — Activitats NB / Entitats residents / Tallers fixes + botó "Proposa la teva activitat". Pàgina individual amb meta completa, foto, afegir a calendari (Google / iCal / Outlook).

**Camps frontmatter disponibles:**
`hora`, `hora_fi`, `planta`, `preu`, `entitat`, `organitzador`, `taller_fix`, `imatge`, `link_extern`, `descripcio`, `data_fi`

**Pendent:**
- Importar tots els events de naubostik.com producció (script a `docs/superpowers/import-activitats-produccio.md`)
- Revisar que el formulari "Proposa la teva activitat" arriba al correu de gestió (Netlify Forms)

### /noticies/
**Pendent — disseny de la pàgina llista:**
- Primera notícia: la marcada com `destacada`, format gran amb fotografia
- Cos: cards en 2 columnes (foto · títol · data · resum · "Llegir més")
- Bloc inferior separat: notícies de territori, sense imatge, diferenciades visualment
- La pàgina individual de notícia existeix (`_default/single.html`); revisar disseny

### /qui-som/
**Pendent:**
- Resum i motivació (com al web actual de producció)
- Equip gestor amb fitxes: fotografia, nom complet, funció, correu corporatiu
- Col·laboradors: mateixa estructura, camp `tipus: colaborador`
- Secció "Història" — importar de naubostik.com/nau-bostik-2-2/una-mica-dhistoria/
- Secció "Transparència" — cards amb memòria de cada any
- Identitat visual — importar de naubostik.com/identitat-visual-de-la-nau-bostik/

### /contacte/
**Pendent:**
- Dades de contacte clares: adreça, telèfon, Telegram, correu electrònic
- Horaris d'oficina i horaris d'accés al recinte
- Mapa sobri estil llumatics.com (transports públics)
- Iconografia de distàncies: metro, bus, tren, bicing, aparcament bicicletes
- Política d'aparcament de cotxes (zona càrrega/descàrrega, horaris, demanar permís)

### /cercar/
**Pendent:** Afegir el sitemap del web a sota del cercador per facilitar la navegació

---

## Funcionalitats transversals

### Gestió d'usuaris (CMS)
- Rols: admin, editor de notícies, editor d'entitat
- Manual d'ús per a editors no tècnics
- Publicació de notícies de territori amb aprovació prèvia

### Formularis
- **Contacte general** — guiat, acompanyat de FAQ
- **Cessió d'espais** — guiat (selecció d'espai amb fitxa), condicions legals + FAQ
- **Proposta d'activitats** — FAQ + camps: qui, què, tipologia, antelació, necessitats tècniques (aigua, llum, potència, catering, neteja, foto/vídeo) — prioritzar serveis interns

### Contingut pendent d'importar
- Entitats residents de naubostik.com/entitats-residents/ → `/collectius/`
- Events passats i futurs del web de producció → `/activitats/`
- Notícies del web de producció → `/noticies/`
- Història de la Nau → `/qui-som/`
- Fotografies reals dels espais → `static/img/espais/`
