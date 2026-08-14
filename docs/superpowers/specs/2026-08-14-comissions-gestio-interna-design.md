# Disseny: Gestió interna de comissions i assemblees
**Data:** 2026-08-14
**Stack:** Hugo + Decap CMS + Netlify Identity + Netlify Edge Functions
**Estat:** Aprovat

---

## Context

Nau Bostik necessita una àrea interna per gestionar comissions de treball i assemblees. El web públic (Hugo estàtic) es manté independent. L'àrea interna s'afegeix sobre l'stack actual sense introduir cap nou sistema.

Principis:
- Cada comissió és aïllada de les altres (membres no veuen altres comissions)
- Un membre pot pertànyer a més d'una comissió (múltiples rols)
- Admins accedeixen a tot
- Recursos mínims: cap nou servidor, cap nova tecnologia
- Incremental: funcionalitats s'afegiran progressivament

---

## Rols i permisos

| Rol | Accés |
|-----|-------|
| `admin` | Tot el contingut públic i privat, totes les comissions |
| `comissio-{slug}` | Només `/intern/comissions/{slug}/` i assemblees |

Un membre pot tenir múltiples rols: `comissio-comunicacio` + `comissio-espais` accedeix a ambdues i cap altra.

---

## Estructura d'URLs

### Públic (sense autenticació)
```
/comissions/                        Llistat de comissions actives
/comissions/{slug}/                 Fitxa pública d'una comissió
/assemblees/                        Llistat d'assemblees
/assemblees/{slug}/                 Resum públic consensuat d'una assemblea
```

### Privat (requereix autenticació + rol)
```
/intern/                            Landing per a membres autenticats
/intern/comissions/{slug}/          Llistat d'actes de la comissió
/intern/comissions/{slug}/{data}/   Acta d'una reunió concreta
/intern/assemblees/                 Llistat d'actes completes d'assemblees
/intern/assemblees/{slug}/          Acta completa d'una assemblea
```

---

## Capa d'accés: Netlify Edge Function

Un sol fitxer `netlify/edge-functions/auth-intern.js` desplegat una vegada. Comprova el JWT de Netlify Identity a cada petició a `/intern/*`:

- `/intern/comissions/{slug}/*` → requereix rol `comissio-{slug}` o `admin`
- `/intern/assemblees/*` → requereix qualsevol rol `comissio-*` o `admin`
- Sense token vàlid → redirigeix a `/login/`
- Rol incorrecte → respon 403

Quan es crea una comissió nova, la funció la gestiona automàticament sense cap canvi de codi.

---

## Decap CMS: col·leccions

### Col·leccions públiques (accessibles a `admin`)
- `comissions` — fitxes públiques de comissions (`content/comissions/`)
- `assemblees-publica` — resum públic d'assemblees (`content/assemblees/`)

### Col·leccions privades per comissió (accessibles a `admin` + rol de comissió)
Per cada comissió `{slug}`, una col·lecció:
- `reunions-{slug}` — actes de reunió (`content/intern/comissions/{slug}/`)

### Col·lecció privada d'assemblees
- `assemblees-acta` — actes completes (`content/intern/assemblees/`)

**Quan es crea una comissió nova**, l'admin afegeix ~10 línies a `static/admin/config.yml` per la nova col·lecció de reunions i fa deploy. La fitxa pública es crea directament des del CMS sense codi.

---

## Camps: fitxa pública de comissió

```toml
title          = "Nom de la comissió"
descripcio     = "..."
objectius      = "..."              # markdown
dies_reunio    = "fix|convocatoria"
dies_detall    = "Cada dimarts"     # text lliure si fix
hora_habitual  = "19:00"
espai_habitual = "Sala polivalent"
participants   = ["Nom 1", "Nom 2"]
contacte       = "correu@exemple.com"
draft          = false
```

---

## Camps: acta de reunió

```toml
title              = "Reunió 2026-08-20"
comissio           = "comunicacio"   # slug de la comissió
date               = 2026-08-20T19:00:00
espai              = "Sala polivalent"
assistents         = ["Nom 1", "Nom 2"]
ordre_del_dia      = "..."           # markdown
punts_tractats     = "..."           # markdown
decisions          = "..."           # markdown
tasques            = []              # llista: {qui, que, quan}
proxima_reunio     = 2026-09-03T19:00:00
documents          = []              # llista de fitxers adjunts
estat              = "esborrany"     # esborrany | aprovada
draft              = false           # Hugo compila la pàgina; l'accés el controla l'Edge Function
```

---

## Camps: acta completa d'assemblea

```toml
title         = "Assemblea ordinària tardor 2026"
date          = 2026-10-15T18:30:00
espai         = "Sala gran"
assistents    = 42                   # nombre o llista
ordre_del_dia = "..."                # markdown
punts_tractats = "..."               # markdown
decisions     = "..."                # markdown
tasques       = []
proxima       = 2027-01-15T18:30:00
documents     = []
estat         = "esborrany"
draft         = false           # Hugo compila la pàgina; l'accés el controla l'Edge Function
```

---

## Camps: resum públic d'assemblea

```toml
title    = "Assemblea ordinària tardor 2026"
date     = 2026-10-15T18:30:00
resum    = "..."   # markdown, consensuat per publicar
draft    = false
```

---

## Procés: crear una comissió nova

1. **Admin** crea fitxa pública a Decap CMS (`/comissions/{slug}/`) — zero codi
2. **Admin** afegeix col·lecció `reunions-{slug}` a `static/admin/config.yml` (~10 línies) i fa deploy
3. **Admin** crea rol `comissio-{slug}` a Netlify Identity (tauler web, sense codi)
4. **Admin** convida membres per correu — reben email, creen contrasenya, accés immediat

---

## Procés: convidar un membre a una comissió

1. Admin va a Netlify Identity → Invite users → introdueix correu
2. Assigna rol `comissio-{slug}` (i altres si és membre de més d'una)
3. El membre rep email, crea contrasenya, accedeix a `/intern/comissions/{slug}/`

---

## Fitxers a crear / modificar

| Fitxer | Acció | Notes |
|--------|-------|-------|
| `netlify/edge-functions/auth-intern.js` | Crear | Lògica d'accés per rol |
| `netlify.toml` | Modificar | Afegir edge function a ruta `/intern/*` |
| `static/admin/config.yml` | Modificar | Afegir col·leccions privades |
| `themes/thema/layouts/comissions/` | Crear | Templates públics de comissió |
| `themes/thema/layouts/intern/` | Crear | Templates privats (reunions, actes) |
| `themes/thema/static/css/main.css` | Modificar | Estils àrea interna |
| `content/comissions/` | Crear | Fitxes públiques de comissions |
| `content/intern/` | Crear | Contingut privat (no indexat) |
| `content/assemblees/` | Crear | Pàgines públiques d'assemblea |
| `static/login/index.html` | Crear | Pàgina de login amb Netlify Identity widget |

---

## Fora d'abast (ara)

- Votació digital — es fa analògicament i es registra manualment al camp `decisions`
- Assistència virtual a assemblees — fase futura
- Notificacions per correu automàtiques — fase futura
- Agregació de notícies externes — projecte separat
- Workflow d'aprovació d'activitats d'entitats — projecte separat
