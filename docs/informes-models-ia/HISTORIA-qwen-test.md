# HISTORIA.md — Diari de sessions i comparativa de models d'IA

Diari operatiu del projecte `naubostik-web`. Cada sessió amb un model d'IA
queda registrada aquí per permetre una **comparativa reproducible** entre
models.

Model: Qwen 3.7 Max · Data: 2026-07-22

---

## Format d'entrada

```
### YYYY-MM-DD — Títol de la sessió
- **Model + provider:** ex. `opencode-go/glm-5.2`
- **Tasca:** objectiu i abast
- **Fitxers creats / modificats / eliminats:** llista
- **Iteracions fins al resultat:** N
- **Tokens aprox.:** si es coneixen
- **Temps aprox.:** minuts
- **Errors comesos:** i com s'han resolt
- **Rework:** cap / baix / mitjà / alt
- **Valoració (1–5):** amb nota breu
- **Notes:** observacions per a la comparativa
```

**Escala de valoració:**
- `1` — Inutilitzable.
- `2` — Funciona amb errors importants o molt rework.
- `3` — Correcte, sense més.
- `4` — Molt bona feina, detalls polits.
- `5` — Excel·lent: ràpid, econòmic, sense errors i amb valor afegit.

---

## GLM-5.2 (`opencode-go/glm-5.2`)

Model inicial. Les seves sessions estableixen el baseline de la comparativa.

### 2026-07-22 — Setup documental (CLAUDE.md + HISTORIA.md)

- **Model + provider:** `opencode-go/glm-5.2`
- **Tasca:** Anàlisi del projecte i creació de `CLAUDE.md` (instruccions +
  visió) i `HISTORIA.md` (diari + plantilla de comparativa).
- **Fitxers creats:** `CLAUDE.md`, `HISTORIA.md`.
- **Iteracions:** 1.
- **Tokens / temps:** no instrumentats; ~3 min.
- **Errors:** cap detectat.
- **Rework:** cap.
- **Valoració:** 4 — Documentació correcta en una passada.
- **Notes:** Va preguntar abans d'escriure (bona pràctica). Detectada la
  incoherència geogràfica Bordeta/Sagrera i apuntada com a TODO.

---

## Kimi K3 (`opencode-go/kimi-k3`)

_(Sessions registrades a l'apartat principal de `HISTORIA.md`.)_

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
  ja tenia). Fabra i Coats va resultar ser un club esportiu, no cultural.
- **Iteracions:** 1 per fitxer.
- **Tokens aprox.:** no instrumentats. **Temps aprox.:** ~10 min.
- **Errors comesos:** cap tècnic. Ha detectat que Fabra i Coats no era
  rellevant i ho ha descartat explícitament a l'informe.
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
