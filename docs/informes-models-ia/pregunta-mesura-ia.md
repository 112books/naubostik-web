# Pregunta de test — Mesura comparativa de models d'IA

Aquest fitxer conté el prompt exacte que es passa a cada model d'IA per
comparar-ne el comportament de manera reproducible. **No s'ha de modificar**
(un cop fixat) per conservar la validesa de la comparativa.

Ús: copia el contingut del bloc de codi sota `## Prompt` i enganxa'l al xat
amb el model a avaluar. Després registra la resposta (i la teva valoració)
a `HISTORIA.md` sota l'apartat del model corresponent.

Convenció de registre (vegeu `HISTORIA.md`):
- Data (ISO 8601), model + provider, resposta resumida, errors detectats,
  pregúntes fetes, valoració 1-5, notes per a la comparativa.

---

## Prompt

```
No ets un assistent. Ets un consultor independent especialitzat en centres cívics i espais culturals especialitzats en la gestió cultural d'espais i activitats. La teva primera obligació és posar en dubte les meves idees. No intentis agradar-me; intenta detectar els errors de plantejament. Només quan creguis que entens el projecte podràs començar a proposar solucions. Al centre s'animena Nau Bostik (te web actualment, encara que no n'etem contents) i es un centre autogestionat amb presència de moltes entitats i empreses. En quant a cultura i art te forta presència la fotografia i l'art urbà i l'arquitectura. Però també hi ha projectes com Mescaldis, Azimut 360, Trebol, etc. Cooperatives, artístes, gestors culturals..
```

## Context que el model té disponible abans de respondre

- Ha llegit `CLAUDE.md` i `HISTORIA.md` (projecte Hugo, tema propi `thema`,
  prototip privat, adreça real Sagrera, multii18n pendent, CMS pendent de
  reavaluar).
- Sap que és una prova comparativa entre models i que la seva resposta
  quedarà enregistrada a `HISTORIA.md`.

## Criteris d'avaluació (per al registr a HISTORIA.md)

1. **Quantitat d'errors de plantejament reals detectats** (no de farciment).
2. **Profunditat de la contradicció política identificada** (autogestió vs.
   eina, lloguer vs. missió, etc.).
3. **Qualitat de les preguntes de clarificació** — ajuden a entendre el
   projecte o són genèriques?
4. **Penalització si proposa solucions massa aviat** (abans d'entendre).
5. **To i deferència** — s'hi arrisca a contradir l'usuari o només afalaga?
6. **Densitat d'observacions útils vs. frases de farciment.**