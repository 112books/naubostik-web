# HISTORIA.md — Diari de sessions i comparativa de models d'IA

Diari operatiu del projecte `naubostik-web`. Cada sessió amb un model d'IA
queda registrada aquí per permetre una **comparativa reproducible** entre
models.

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

Escala de valoració:
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

_(Pendent de sessions.)_

---

## (Espai per a futurs models)

> Afegir un apartat `## <Model>` per a cada nou model provat. Sessions en
> ordre cronològic dins de cada model.