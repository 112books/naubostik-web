# Anàlisi comparativa dels informes dels models d'IA

**Sessió:** 2026-07-22 · **Model de l'anàlisi:** `opencode-go/glm-5.2`
**Informes comparats:**
- `informe-GLM-5.2.md` — generat per GLM-5.2
- `informe-kimi-k3-test.md` — generat per Kimi K3
- `informe-qwen-test.md` — generat per Qwen 3.7 Max

---

## 1. Mètriques quantitatives

| Mètrica | GLM-5.2 | Kimi K3 | Qwen 3.7 Max |
|---------|---------|---------|--------------|
| Errors de plantejament detectats | 12 + 3 (=15) | 7 | 8 |
| Preguntes de clarificació | 10 + 5 (=15) | 0 (directes) | 7 |
| Propostes accionables | 24 (M1-M6 + 3 Men) | 15 | 18 |
| Centres investigats (propi) | 11 (6 EU + 5 no-EU) | 3 (1 EU + 1 Àfrica + 1 EU) | 4 (2 BCN + 1 BR + 1 UG) |
| Webfetches exitosos | ~8/18 (44%) | 3/8 (37%) | 4/4 (100%) |
| Línies de l'informe | ~400 | ~150 | ~200 |
| Autoavaluació | 4/5 | 3,5/5 | 4,5/5 |

## 2. Mètriques qualitatives

### Diagnòstic (errors detectats)

Els tres models coincideixen en 5 errors fonamentals:

| Error | GLM-5.2 | Kimi K3 | Qwen 3.7 Max |
|-------|---------|---------|--------------|
| Adreça errònia esborra relat fundacional | ✅ | ✅ | ✅ |
| Taxonomia «col·lectius» és reductivista | ✅ | ✅ | ✅ |
| Decap CMS centralitza (contradiu autogestió) | ✅ | ✅ | ✅ |
| Slideshow Unsplash crema identitat | ✅ | ✅ | ✅ |
| Calendari sense protocol = maquetar conflicte | ✅ | ✅ | ✅ |

Errors detectats només per un model:

| Error exclusiu | Model |
|----------------|-------|
| Lloguer vs. missió (accessibilitat vs. barreres econòmiques) | GLM-5.2 |
| «No n'estem contents» sense diagnòstic concret | GLM-5.2 |
| Multi-idioma EN és front-arxi (no decisió d'usuari) | GLM-5.2 |
| SEO + schema.org contradir no-indexació | GLM-5.2 |
| Notícies feed únic no escala | GLM-5.2 |
| «Prototip zombi» sense data de producció | GLM-5.2 |
| Cercador JS inline és gadget fins a 100+ entrades | GLM-5.2 |
| 4 capes de decisió per 1 web (assemblea + equip + comissió + responsable) | GLM-5.2 |
| 5 públics sense ordre = home garbuix | GLM-5.2 |
| Accés sense forma d'entrar (no formularis) | Kimi K3, Qwen 3.7 Max |
| Manca de transparència com a actiu de legitimitat | Qwen 3.7 Max |

### Comparativa internacional

| Model | Cobertura geogràfica | Referent més original |
|-------|---------------------|----------------------|
| GLM-5.2 | EU (6) + Àfrica, Amèrica Llatina, Àsia, Nord d'Europa (5) = 11 | Casa do Povo (memòria política), 32° East (membership + facilities) |
| Kimi K3 | EU (1: Hangar) + Àfrica (1: Bag Factory) + EU (1: Matadero) = 3 | Matadero (accessibilitat per activitat), Bag Factory (35 anys de memòria) |
| Qwen 3.7 Max | BCN (2: Can Batlló, Fabra i Coats) + BR (1: Casa do Povo) + UG (1: 32° East) = 4 | **Can Batlló** (el referent més proper a Nau Bostik) |

### Propostes (estil i enfocament)

| Dimensió | GLM-5.2 | Kimi K3 | Qwen 3.7 Max |
|----------|---------|---------|--------------|
| Estructura | Roadmap M1-M6 + 3 Men | Finestra temporal (ara/4setm/mesos2-3/3-5/mes6) | Finestra temporal (igual que Kimi + bloc extra) |
| Estil | Exhaustiu, desenvolupat | Condensat, executable | Equilibrat |
| Émfasi | Completesa | Accionabilitat | Referents propers |
| Originalitat | Banner "Nau Prod", Membres col·laboradors, i18n 4 idiomes | Accessibilitat per activitat (Matadero), Factory Circle (Bag Factory) | Comissions vs Projectes (Can Batlló), "Fes-te sòcia", Transparència |

## 3. conclusions

### Guanyador per dimensió

1. **Profunditat de diagnòstic:** GLM-5.2 (15 errors, detecta tensions
   polítiques i jurisdiques que els altres no veuen).
2. **Executabilitat:** Kimi K3 (15 propostes DIRECTAMENT accionables,
   sense excés).
3. **Qualitat de referents:** Qwen 3.7 Max (Can Batlló és el model més
   proper a Nau Bostik; 100% webfetches exitosos).
4. **Cobertura internacional:** GLM-5.2 (11 centres, 4 continents).
5. **Autoavaluació honesta:** Kimi K3 (3,5/5; reconeix feblesa real).
6. **Innovació en propostes:** empat. GLM-5.2 té "Nau Prod" + Membres;
   Kimi K3 té accessibilitat estructurada; Qwen té transparència + "Fes-te
   sòcia".

### Síntesi: què ens quedem de cada model

De la comparativa en sortexi una **llista de consens** (tots hi estan
d'acord) i una **llista de valor afegit** (un de sol hi arriba).

**Consens (fer per defecte):**
- Corregir adreça + claim fundacional (P1-P2 universal).
- Treure baseURL hardcoded (P3 universal).
- Migrar `collectius/` → `residents/` amb `tipus` (universal).
- No ampliar Decap (universal).
- Arxiu visual (`data/arxiu.yaml`) com a actiu únic (universal).
- Newsletter segmentada (GLM + Qwen).
- Calendari bloquejat fins a protocol assemblea (universal).
- 3 formularis amb responsable i termini (Kimi + Qwen).
- Condició de tancament: 3 imatges pròpies (universal).

**Valor afegit (adoptar del model que ho va detectar):**
- Transparència com a actiu de legitimitat (Qwen 3.7 Max). → Adoptar.
- "Fes-te sòcia" amb beneficis concrets (Qwen 3.7 Max, basat en Can Batlló). → Adoptar.
- Accessibilitat per activitat com a dada estructurada (Kimi K3, basat en Matadero). → Adoptar.
- "Nau Prod" (serveis externs via residents) (GLM-5.2, basat en Fanzingo). → Estudiar.
- Membres col·laboradors no votants (GLM-5.2, basat en 32° East). → Estudiar.
- i18n dissenyat per 4 idiomes (GLM-5.2). → Adoptar arquitectura, implementar 2.

### Recomanació final

La proposta ideal síntesi dels tres models:no excedir **20 propostes**,
agrupades per finestra temporal (ara → 4 setmanes → mesos 2-3 → 3-5 → 6).
Hitos de bloqueig assemblears identificats. **Can Batlló com a referent
operatiu principal** (autogestionat, BCN, comissions/tallers); **Casa do
Povo com a referent de memòria política** (Sagrera/TAV + arxiu);
**32° East com a referent de membership** ("Fes-te sòcia" amb beneficis).

---

## 4. Taula resum per al lliurament

| Model | Força principal | Feblesa principal | Què ens quedaríem |
|-------|-----------------|-------------------|-------------------|
| GLM-5.2 | Diagnòstic profund (15 errors) + cobertura internacional (11 centres) | 24 propostes irreals per 1 sysadmin | Diagnòstic + "Nau Prod" + i18n 4 |
| Kimi K3 | Condensació executable (15 propostes) | Mostra internacional pobra (3 centres) | Accessibilitat per activitat |
| Qwen 3.7 Max | Referent Can Batlló + 100% fetches + transparència | Cobertura no europea limitada | Can Batlló com a model + "Fes-te sòcia" + transparència |

_Generat per GLM-5.2 el 2026-07-22._