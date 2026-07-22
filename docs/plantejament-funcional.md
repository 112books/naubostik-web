# Plantejament funcional del web — Nau Bostik

**Equip redactor:** comunicació, gestió d'espais, UX/UI, desenvolupament web, usabilitat, gestió cultural.
**Data:** 2026-07-22 · **Basat en:** 3 informes de models d'IA + anàlisi comparativa + 4 propostes d'arquitectura + estat actual del repo.
**Model:** GLM-5.2 (coordinador)

> Lector: aquest document **decideix**. No és un inventari passiu. Cada
> funcionalitat té una prioritat (P0-P3), un destí (portada / interna /
> aparcar / descartar) i un responsable proposat. Les discrepàncies entre
> veus de l'equip es marquen explícitament.

---

## 0. Metodologia i veus

| Veu | Què aporta | Tendència natural (cal equilibrar) |
|-----|------------|-------------------------------------|
| **Comunicació** | Missatge, conversió, marca | Vol tot prominent a la home |
| **Gestió d'espais** | Reserves, disponibilitat, conflictes | Vol formularis complexos |
| **UX/UI** | Jerarquia, navegació, accessibilitat | Vol eliminar tot el superflu |
| **Desenvolupament** | Arquitectura, mantenibilitat, cost | Vol evitar funcions que no es poden sostenir |
| **Usabilitat** | Testejable, sense fricció | Vol provar abans de construir |
| **Gestió cultural** | Programació, residents, arxiu, memòria | Vol que l'arxiu sigui el protagonista |

**Principis de consens:**
1. Cap funcionalitat entra a producció sense responsablehumà assignat.
2. Cap funcionalitat entra a portada sense haver passat test d'usuaris.
3. La web no és un SW de gestió interna — les eines internes van apart.
4. "Prototip zombi": **data límit 6 mesos**. Sense això, tot s'aplaca.

---

## 1. Inventari funcional — 65 → 38 funcionalitats finals

He consolidat les 65 funcionalitats extretes dels 3 informes + propostes
en 3 categories: ** funcionals per defecte** (consens dels models),
**diferenciadores** (valor afegit d'un model), **descartades** (no encaixen).

Les organitzem en 7 àrees funcionals (no per secció del site).

### Àrea A — Identitat i relato (5 funcions)

| # | Funció | Prioritat | Destí | Responsable | Notes equip |
|---|--------|-----------|-------|-------------|-------------|
| A1 | Claim fundacional "Sagrera > TAV" al primer fold | **P0** | Portada | Comunicació | Tots els models hi coincideixen. Brutalista la fa gegant. |
| A2 | Correcció adreça a Sagrera/Ferran Turné 1-11 | **P0** | Tot el site | Sysadmin | Sense això res té sentit. Mapa OSM inclòs. |
| A3 | Logo i paleta taronja `#e75112` (marca real) | **P0** | Tot el site | UX/UI | Extreta de `naubostik.com`. Cal actualitzar `main.css`. |
| A4 | Tipografia: DM Sans (cos) + display fort (decidir) | P1 | Tot el site | UX/UI | DM Sans ja al repo. Brutalista proposa Space Grotesk per display. |
| A5 | Història/origen visible (no només "qui som") | P1 | Secció "Nau Vida" | Gestió cultural | Patró Casa do Povo: la memòria política és actiu. |

### Àrea B — Activitats i agenda (8 funcions)

| # | Funció | Prioritat | Destí | Responsable | Notes equip |
|---|--------|-----------|-------|-------------|-------------|
| B1 | Llista d'activitats amb filtres (data, entitat, espai, disciplina) | **P1** | Secció Agenda | UX/UI + Desenvolupament | Bloquejat fins protocol assemblea (veure §4). |
| B2 | Separació programació pròpia vs entitats | **P0** | Secció Agenda | Gestió cultural | Ja implementat (`entitat` frontmatter). |
| B3 | Calendari setmanal/mensual amb horari regular de residents | P2 | Secció Agenda | Gestió cultural | Patró Casa do Povo. requereix B1 + B6. |
| B4 | Accessibilitat per activitat (icones mobilitat/subtítols/audiodesc.) | **P1** | Frontmatter activitat | Usabilitat + UX/UI | Patró Matadero. Dada estructurada. |
| B5 | "Aquesta setmana" — 3-4 activitats destacades a home | **P0** | Portada | Comunicació | Card scroll-snap a mobile (proposta 1). |
| B6 | Horari regular de residents com a dada estructurada | P1 | Frontmatter resident | Gestió cultural | Patró Casa do Povo "Atividades regulares". |
| B7 | Tours/visites guiades com a activitat recurrent | P3 | Secció Agenda | Gestió cultural | Sèrie recurrent. Deute si hi ha tours reals. |
| B8 | Openhouse / Portes obertes mensuals | P3 | Secció Agenda | Gestió cultural | Patró ZK/U. Només si l'assemblea ho obre. |

### Àrea C — Residents (6 funcions)

| # | Funció | Prioritat | Destí | Responsable | Notes equip |
|---|--------|-----------|-------|-------------|-------------|
| C1 | Migració `collectius/`→`residents/` amb frontmatter `tipus` | **P0** | Secció Residents | Desenvolupament + Gestió cultural | Consens total. Defineix catàleg abans. |
| C2 | Pàgina individual de resident (foto, bio, tipus, web externa) | **P1** | Secció Residents | UX/UI | Patró Hangar/La Escocesa. |
| C3 | 15+ residents reals amb foto i bio | **P1** | Secció Residents | Gestió cultural | Sense fotos reals, això és paper. |
| C4 | Camp `familia` (artivisme, boxe, coral…) a més de `tipus` | P2 | Frontmatter resident | Gestió cultural | Patró Casa do Povo. Cal validar amb assemblea. |
| C5 | Distingir comissions (internes) vs projectes (externs) | **P1** | Interna/Admin | Gestió cultural | Patró Can Batlló. evita confusió veïnal. |
| C6 | "Fes-te sòcia" amb beneficis concrets (membership) | **P1** | Portada + secció Participa | Comunicació + Gestió cultural | Patró 32° East / Can Batlló. Genera ingrés estable. |

### Àrea D — Espais i lloguer (5 funcions)

| # | Funció | Prioritat | Destí | Responsable | Notes equip |
|---|--------|-----------|-------|-------------|-------------|
| D1 | Cards d'espais per planta amb foto/placeholder | **P0** | Secció Nau | UX/UI | Ja implementat. cal fotos reals. |
| D2 | Espais reals amb foto i horaris verificats | **P1** | Frontmatter espai | Gestió d'espais | Sense això el lloguer no té credibilitat. |
| D3 | Formulari de lloguer puntual (Netlify Forms) | **P1** | Formulari | Gestió d'espais + Desenvolupament | Tres formularis separats (lloguer/propose/contacte). |
| D4 | Protocol assembleari d'assignació d'espais | **P0 bloquejant** | FORA del web | Gestió d'espais + Assemblea | Sense això, cap agenda o reserva té legitimitat. |
| D5 | Visualització isomètrica SVG de la nau (proposta 3) | P3 optativa | Secció Nau | UX/UI + Desenvolupament | Alta recompensa, alt cost. Només si és proposta guanyadora. |

### Àrea E — Arxiu i memòria (4 funcions)

| # | Funció | Prioritat | Destí | Responsable | Notes equip |
|---|--------|-----------|-------|-------------|-------------|
| E1 | Arxiu visual (`data/arxiu.yaml` + plantilla amb filtres) | **P1** | Secció Arxiu | Gestió cultural + Desenvolupament | **Actiu únic del centre**. street art efímer. |
| E2 | Subsecció "Memòria" (actes històrics, Sagrera/TAV, fundació) | P2 | Secció Arxiu | Gestió cultural | Patró Casa do Povo "Acervos". |
| E3 | Mosaic d'imatges d'arxiu a la home (alternativa a slideshow) | P1 | Portada | UX/UI | Substitueix Unsplash. Patró island6 amb copy. |
| E4 | Edicions/publicacions pròpies (secció `edicions/`) | P3 | Secció Edicions | Gestió cultural | Només si existeix producció editorial real. |

### Àrea F — Portes d'entrada i participació (7 funcions)

| # | Funció | Prioritat | Destí | Responsable | Notes equip |
|---|--------|-----------|-------|-------------|-------------|
| F1 | Formulari de proposta d'activitat + condicions legals | **P1** | Formulari | Gestió cultural + Comunicació | Cal text de condicions per assemblea. |
| F2 | Formulari de contacte general | **P0** | Formulari | Sysadmin + Comunicació | Sense formulari, la web no represa. Avui no n'hi ha cap. |
| F3 | Newsletter opt-in segmentat (veïnat/professional) | P1 | Footer | Comunicació | 2 tags via Brevo/Mailchimp. |
| F4 | Newsletter bi-setmanal curat amb 3 seccions fixes | P2 | Intern (no visible web) | Comunicació | Patró MMCA "Muekly". |
| F5 | Secció "Com funciona la Nau" (assemblea, equip, comissions) | **P1** | Secció Nau Vida | Gestió cultural | Patró La Escocesa. Sigil·la atractiuent. |
| F6 | Transparència (pressupostos, decisions, manifestos) | P2 | Secció Nau Vida + footer | Gestió cultural | Patró Can Batlló. Actiu de legitimitat. |
| F7 | "Nau Prod" — serveis externs via residents professionals | P3 optativa | Secció apart | Gestió cultural + Assemblea | Patró Fanzingo. Ingressos propis sense tocar assemblea. |

### Àrea G — Infraestructura i accessibilitat (10 funcions)

| # | Funció | Prioritat | Destí | Responsable | Notes equip |
|---|--------|-----------|-------|-------------|-------------|
| G1 | Multi-entorn via flag baseURL | **P0** | `hugo.toml` | Desenvolupament | Consens. treu hardcoded. |
| G2 | Mantenir no-indexació mentre privat | **P0** | Todo site | Sysadmin | Fins aproducció explicit. |
| G3 | Basic Auth al staging (Edge Function) | **P0** | Netlify | Sysadmin | Ja implementat. cal env vars. |
| G4 | i18n EN subset per suffix (4-5 pàgines institucionals) | P1 | `i18n/` | Desenvolupament | Evitar traduir tot. |
| G5 | i18n arquitectura preparada per 4 idiomes (implementar 2) | P2 | `i18n/` | Desenvolupament | Horitzó. |
| G6 | SEO/schema.org (Event, Place, OpenGraph) | P2 | `head.html` | Desenvolupament | Quan es desbloquegi indexació. |
| G7 | WCAG 2.1 AA + Lighthouse >95 | **P1** | Todo site | UX/UI + Usabilitat | Sense això, producció no autoritzada. |
| G8 | Política privacitat RGPD-compliant | **P1** | Secció Privacitat | Sysadmin | Esmenta Google Fonts, Netlify Forms, Decap. |
| G9 | Sitemap i robots invertits quan producció | P2 | `static/` | Sysadmin | Desbloquejar quan deploy aprovat. |
| G10 | Backup + rollback plan + handover doc | P2 | `docs/` | Sysadmin | Patró M6.3-6.4. |

---

## 2. Què promocionar a portada — debat d'equip

### Veus en conflicte

- **Comunicació** vol 6+ coses a la home (agenda + residents + arxiu + notícies + newsletter + CTA sòcia +赶快 últimes notícies).
- **UX/UI** diu que 6 blocs a la home és garbuix; la home ha de tenir **3 max**.
- **Gestió cultural** vol que l'arxiu sigui protagonista.
- **Desenvolupament** recorda que cada cosa a la home és una dependència que cal sostenir.
- **Usabilitat** recorda que hi haurà 5 públics diferents i la home no pot parlar a tots simultàniament.

### Decisió: **portada amb 4 blocs, en aquest ordre**

```
┌──────────────────────────────────────┐
│ 1. CLAIM FUNDACIONAL (sticky)         │  ← A1: Sagrera > TAV
├──────────────────────────────────────┤
│ 2. HERO + ARXIU                       │  ← E3: mosaic/graelle d'imatges
│    (NO slideshow Unsplash)            │     pròpies de residents, amb copy
├──────────────────────────────────────┤
│ 3. AQUESTA SETMANA                    │  ← B5: 3-4 activitats destacades
│    (cards scroll-snap mobile)         │     (filtre pròpia + entitats)
├──────────────────────────────────────┤
│ 4. FES-TE SÒCIA + PARTICIPA            │  ← C6 + F1: 
│    (CTA + 3 rutas: sòcia / lloguer /  │     acció única + 3 enllaços
│     proposa activitat)                │     secundaris
└──────────────────────────────────────┘
```

**Justificació de cada bloc:**

- **Bloc 1 (Claim):** tots els models coincideixen. La Sagrera és la raó d'existir. Brutalista la fa gegant. Proposta 1 la fa sticky translucent. Tria d'estil ve després.
- **Bloc 2 (Hero arxiu):** aquesta és la **única imatge gran** de la home. **NO** slideshow d'Unsplash. Sí una **graelle estàtica o rotativa molt lenta** d'imatges pròpies de residents amb crèdit. És l'avantatge únic. Patró island6 amb copy. Si la proposta 3 guanya, aquest bloc es converteix en SVG isomètric de la nau.
- **Bloc 3 (Aquesta setmana):** un sol CTA d'agenda, 3-4 cards. Scroll-snap a mobile (proposta 1). És la resposta a "què hi faig avui?".
- **Bloc 4 (Participa):** un sol botó principal ("Fes-te sòcia") + 3 enllaços secundaris (lloguer / propose activitat / butlletí). Aquesta és la porta "participar-hi" de la proposta 2.

### Què NO va a portada

| Funció | Raó |
|--------|-----|
| Llistat complet de residents | Caldria 30 cards. Massa. Link a `/residents/`. |
| Notícies feed | Tots els models coincideixen: no escala. Aniran a `/noticies/`. |
| Agenda completa | La home mostra 3-4 destacades; la resta a `/agenda/`. |
| Història llarga | Va a `/nau-vida/`. A la home només el claim. |
| Convocatòries | P3 — no existeix programa públic encara. |
| Edicions | P3 — sense producció editorial real. |
| Transparència | Va a `/nau-vida/transparencia/`. A la home només enllaç al footer. |
| Tours / openhouse | P3 — només si l'assemblea els obre. |
| Nau Prod | P3 optatiu — decideix assemblea. |
| Login / admin | A `/admin/` separat. |

---

## 3. Què oblidar — descartades o aparcaes

### Funcions que cal **descartar** (no implementar)

| # | Funció | Raó | Veus |
|---|--------|-----|------|
| D1 | Slideshow d'Unsplash | Tots: rebutjat unànime. Substitueix per E3. | Totes |
| D2 | "Tot el site en EN" | GLM va detectar: cost continu sense ROI. Només 4-5 pàgines institucionals. | GLM |
| D3 | Newsletter indiscriminat | Patró error comú a tots 11 centres analitzats. Segmenta des del principi. | GLM + Qwen |
| D4 | Cercador upgrade fuse.js (>100 entrades) | Apre nails quan el problema existeix. Avui amb 50 pàgules, el JS inline basta. | GLM |
| D5 | Prototip zombi indefinit | Sense data límit, tot s'aplaca. **6 mesos**. | Tots |

### Funcions que cal **aparcar** (pendents de definició assemblea)

| # | Funció | Bloqueig |
|---|--------|----------|
| P | Camp `familia` per resident | L'assemblea ha de definir el catàleg de tipus + families. |
| P | Calendari complet amb filtres (B1) | Bloquejat fins protocol assemblea D4. |
| P | "Nau Prod" serveis externs | Decideix assemblea. |
| P | Open calls / residències | L'assemblea ha de decidir obrir el programa. |
| P | Edicions pròpies | Sense editorial real no va enlloc. |
| P | Restaurant/cafè vinculat | Confirmar amb assemblea. |
| P | Visualització isomètrica SVG | Decideix entre propostes 1-4 primer. |

### Funcions **internes** (no visibles al web públic)

Aquestes són **eines** del centre, no contingut públic:

| Funció | Destí |
|--------|-------|
| Comissions (governança interna) | Intranet o CMS privat |
| Gestió de reserves | Eina externa (Cal.com, SimplyBook) o CMS |
| Pressupostos detalle | Secció transparència pública però document, no aplicació |
| Handover doc, rollback plan | `docs/` privat |
| Titularitat jurídica doc | `docs/` privat |

**Lliçó crítica (Desenvolupament):** el web **no** és un SW de gestió.
Reserves, calendari assemblea i facturació van separats. El web només
**interfície pública** + **formularis que armien email**.

---

## 4. Millor forma d'administrar-les — governança editorial

### 4.1 Triple capa de responsabilitat

```
┌─────────────────── ASSEMBA(sobirana) ──────────────────┐
│ Defineix: catàleg de tipus, preus, condicions,        │
│           transparència, programa públic,              │
│           pertinença de residents.                     │
└───────────────────────────┬───────────────────────────┘
                            │ delega
┌───────────────────────────▼───────────────────────────┐
│         COMISSIÓ COMUNICACIÓ (governança editorial)    │
│ Coordina: newsletter, contingut intern, SLA edició,   │
│           coherència marca.                            │
└─────┬─────────────┬─────────────┬─────────────┬───────┘
      │             │             │             │
      ▼             ▼             ▼             ▼
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌────────────┐
│RESPONSABLE│ │GESTIÓ     │ │EQUIFOTO/  │ │SYSADMIN    │
│CONTINGUT  │ │CULTURAL   │ │COMUNICACIÓ│ │(TU)        │
│           │ │           │ │           │ │            │
│ Notícies   │ │ Agenda    ││ Newsletter│ │Hugo / Net. │
│ Activitats │ │ Residents ││ Xarxes    │ │ CMS swap   │
│ Residents  │ │ Arxiu     ││ Arxiu lliure│ │ Auth / domini│
│ "com es   │ │ Espais    ││ per enviar│ │ SEO / RGPD  │
│  fa" page │ │           ││           │ │             │
└───────────┘ └───────────┘ └───────────┘ └────────────┘
```

### 4.2 Què decideix qui

| Decision | Approvació |
|----------|------------|
| Afegir/seleccionar un resident | Comissió comunicació + assemblea |
| Publicar una activitat | Responsable contingut + gestió cultural (subdelegat per entitat) |
| Editar pàgines institucionals (qui som, com funciona) | Comissió comunicació |
| Publicar notícies | Responsable contingut (auto) |
| Editar imatges de l'arxiu | Equip Foto/Comunicació |
| Pujar/modificar handover doc, rollback | Sysadmin |
| Swap CMS | Assemblea (decisió crítica) |
| Pujar a producció | Assemblea explícita |
| Modificar preus / condicions lloguer | Assemblea |

### 4.3 SLA d'edició

| Tipus de contingut | SLA | Autor |
|--------------------|------|-------|
| Activitats pròpies | 48h abans | Responsable contingut |
| Activitats d'entitats | Subdelegat a 1 editor per entitat | Entitat |
| Notícies |mates 24h | Responsable contingut |
| Arxiu (fotos noves) | Mensual | Equip foto/Comunicació |
| Pàgines "qui som", "com funciona", transparència | Semestral | Comissió comunicació |
| Pressupostos + decisions | Trimestral | Comissió comunicació |

### 4.4 Quin CMS / eina per cada funció

La decisió de CMS va **per TYPE de contingut**, no global:

| Contingut | Eina recomanada |
|-----------|------------------|
| Notícies + activitats + residents | Sveltia CMS (drop-in Decap) o TinaCMS |
| Arxiu visual | Formulari Netlify Forms → responsable; NO CMS directe (patrimoni delicat) |
| Pàgines institucionals (qui som, com funciona) | Commit via PR (cal revisió de comissió) |
| Newsletter | Brevo o Mailchimp (extern) |
| Reserves / lloguer | Netlify Forms → email (no SW de reserves encara) |

**No ampliar Decap** (consens unànime dels 3 models). Preparar comparativa
`docs/cms-comparativa.md` abans de swap (proposta M2.4 de GLM-5.2).

### 4.5 Edició per entitat — el problema clau

**Decap expulsa editors no tècnics** (tots 3 models coincideixen). Cal:
- Una persona editora per entitat, sense compte GitHub.
- O bé: calendari/enviament via formulari → responsable contingut decideix i publica.
- O bé: swap a Sveltia/Tina que permet OAuth email.

**Recomanació de l'equip:** fase 1 = **formulari "propose activitat"**
(recol·lecta dades + email responsable), fase 2 = swap a Sveltia amb
sub-usuaris per entitat quan el volum justifiqui.

---

## 5. Matriu final de funcionalitats per prioritat

### P0 — imprescindibles, sense les quals no hi ha web (10)

```
A1 Claim fundacional          D4 Protocol assemblea (fora web)
A2 Correcció adreça           F2 Formulari contacte general
A3 Paleta taronja real        G1 Multi-entorn baseURL
B2 Activitats pròpia vs entitats G2 No-indexació
B5 Aquesta setmana (home)     G3 Basic Auth staging
C1 Migració residents         C1bé
```

### P1 — necessàries per producció decent, en 6 mesos (13)

```
A4 Tipografia decidida        B6 Horari regular residents
B1 Agenda amb filtres         C2 Pàgina resident individual
B4 Accessibilitat per activitat C3 15+ residents reals
C5 Comissions vs projectes    C6 "Fes-te sòcia"
D2 Espais reals verificats    D3 Formulari lloguer
E1 Arxiu visual (`arxiu.yaml`) E3 Mosaic d'arxiu a home
F1 Formulari propose activitat F3 Newsletter segmentat
F5 "Com funciona la Nau"     G4 i18n EN subset
                              G7 WCAG AA
                              G8 Privacitat RGPD
```

### P2 —maduresa institucional, 6-12 mesos (10)

```
A5 Història visible           B3 Calendari setmanal
C4 Camp familia               E2 Subsecció Memòria
F4 Newsletter bi-setmanal curat F6 Transparència
G5 i18n 4 idiomes             G6 SEO/schema.org
G9 Sitemap invertit           G10 Backup/rollback/handover
```

### P3 — opcionals / decideix assemblea (8)

```
B7 Tours                       B8 Openhouse
D5 Visualització isomètrica   E4 Edicions pròpies
F7 "Nau Prod"                 Restaurant/cafè
Mercat/fair recurrent         Residències + open calls
```

### Descartades (5)

```
Slideshow Unsplash      "Tot el site en EN"
Newsletter indiscriminat Cercador upgrade (fusible.js)
Prototip zombi indefinit
```

---

## 6. Recomanació sintètica de l'equip

1. **Guanyadora provisional:** proposta 1 (Nau App) com a base,
   hi afegim elements de la 4 (Brutalista) per força expressiva.
   Nota: la proposta 3 (Nau Virtual) és la més expressiva però la més
   costosa d'implementar; reserva-la per v2 si la nau vol invertir-hi.

2. **Portada:** 4 blocs (claim, mosaic arxiu, aquesta setmana, participa).

3. **«Fes-te sòcia» ** com a motivador transversal, present a la home
   i al footer. És la contribució més original i reproduïble de Qwen 3.7 Max.

4. **Arxiu visual** com a **actiu únic** de la nau. No és decoració,
   és patrimoni. Únic al sector per la combinació de fotografia + art urbà
   efímer.

5. **Protocol assemblea D4** és el **bloqueig crític**. Sense això, ni
   calendari ni reserva ni notícies per entitat tenen legitim. L'assemblea
   ha de tancar-lo abans de M4.

6. **CMS swap alentit.** No ampliar Decap, no decidir swap sense
   comparativa escrita. Subdelegar edicions via formulari mentre tant.

7. **Data límit: 6 mesos.** Prototip zombi. Sinó, tot s'aplaca.