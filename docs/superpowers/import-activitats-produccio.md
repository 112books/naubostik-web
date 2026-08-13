# Script d'importació d'activitats de naubostik.com (producció)

> **Instruccions per a l'agent executor:** llegeix aquest document complet
> abans de fer res. No cal preguntar res a l'usuari — tota la informació
> necessària és aquí.

---

## Objectiu

Importar els events del site de producció `https://naubostik.com` al directori
`content/activitats/` del projecte Hugo a `/Users/joan/Documents/Obsidian/naubostik.com`.

Els events existents (`vacances-estiu-2026.md`, `mercat-agost-2026.md`,
`expo-habitar-projectar-2026.md`, `expo-ofrendas-del-vacio.md`) **no s'han de
tocar ni esborrar**. Només cal afegir els que falten.

---

## Estructura del frontmatter (TOML)

Cada event és un fitxer `.md` a `content/activitats/` amb frontmatter TOML
(`+++ ... +++`) amb aquests camps:

```toml
+++
title       = "Títol de l'event"         # obligatori
date        = 2026-08-23                  # data d'inici, format YYYY-MM-DD
draft       = false                       # sempre false
hora        = "10:00"                     # HH:MM 24h, string. Buit si desconegut.
hora_fi     = "19:00"                     # HH:MM 24h, string. Opcional.
planta      = "Planta baixa"             # un dels 5 valors vàlids (vegeu sota)
entitat     = "Nom de l'entitat"         # opcional. Buit si és activitat pròpia.
imatge      = "https://..."              # URL absoluta a la foto (WordPress CDN OK)
descripcio  = "Resum breu (1-2 frases)"  # per a les cards
preu        = "Gratuït"                  # o "3 €" o "" si no es coneix
hora_fi     = "19:00"                    # hora de fi, opcional
data_fi     = 2026-10-31                 # data de fi per a events multi-dia, opcional
link_extern = "https://..."             # URL externa amb més info, opcional
+++
```

### Valors vàlids per a `planta`

| Valor             | Quan usar-lo                                                   |
|-------------------|----------------------------------------------------------------|
| `"Nau Bostik"`    | Espai genèric / exterior / sense planta específica             |
| `"Planta baixa"`  | Nau Andy Warhol, Coworking, Mescladís, Sala Aureli Gandul...   |
| `"Primera planta"`| Sala Basiana, Sala 112, espais residencials planta 1            |
| `"Segona planta"` | Espais de la segona planta                                     |
| `"Tercera planta"`| Espais de la tercera planta                                    |

Si no es pot determinar la planta amb la informació disponible, usar `"Nau Bostik"`.

---

## On trobar els events a producció

1. **Pàgina principal d'events propis:** `https://naubostik.com/activitats/`
   (té paginació, revisa totes les pàgines)
2. **Events d'entitats residents:** `https://naubostik.com/esdeveniments-entitats/`
   (paginació també)
3. **Events individuals** (URL del tipus `/esdeveniment/nom-de-levent/` o
   `/esdeveniments-entitats/nom/`) — accedeix a cada un per obtenir els detalls.

---

## Procés per a cada event

Per a cada event trobat a producció:

1. Comprova si ja existeix un fitxer equivalent a `content/activitats/`
   (compara per títol o data). Si existeix, **salta'l**.

2. Extreu del HTML de la pàgina individual:
   - Títol
   - Data i hora (start i end si disponibles)
   - Espai / planta (busca "ESPAI →" o similar)
   - Preu (si mencionat)
   - Foto principal (primera `<img>` significant, preferiblement del CDN de WP)
   - Descripció curta (primer paràgraf o subtítol)
   - URL de la pàgina de producció (serà el `link_extern`)
   - Entitat organitzadora (si és un event d'entitat)

3. Determina el nom del fitxer:
   - Format: `slugify(títol)-YYYY.md`
   - Exemple: `mercat-roba-tardor-2026.md`
   - Usa lletres minúscules, guions, sense accents ni caràcters especials

4. Crea el fitxer `.md` a `content/activitats/` amb:
   - Frontmatter TOML complet
   - Cos en català: breu descripció (2-4 paràgrafs), extret o adaptat del HTML original

---

## Dates i priorització

- Importa **primer els events futurs** (date >= avui) i **events recents** dels
  últims 12 mesos.
- Pels events molt antics (>2 anys), importa'n una mostra representativa
  (els 10-20 més significatius), no cal importar-los tots.
- **Data d'avui per a l'agent:** 2026-08-13. Futur = date >= 2026-08-13.

---

## Nom dels fitxers existents (NO duplicar)

```
content/activitats/vacances-estiu-2026.md
content/activitats/mercat-agost-2026.md
content/activitats/expo-habitar-projectar-2026.md
content/activitats/expo-ofrendas-del-vacio.md
```

---

## Verificació final

Després de crear tots els fitxers:

```bash
cd /Users/joan/Documents/Obsidian/naubostik.com
hugo --minify 2>&1 | grep -E "ERROR|WARNING"
```

Ha de sortir net (sense errors ni warnings nous). Si hi ha errors de parsing
TOML, revisa els frontmatters (els valors string sempre entre cometes dobles,
les dates sense cometes).

**No fer commit.** L'usuari revisarà i farà commit manualment.
w