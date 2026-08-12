#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════
#  Nau Bostik — Script de sync & deploy
#  Ús: ./sync-naubostik.sh
# ═══════════════════════════════════════════════════════════════════════

set -euo pipefail

# ── Variables ────────────────────────────────────────────────────────────
REMOTE="origin"
BUILD_DIR="public"
BRANCH="main"
REPO_STAGING="https://112books.github.io/naubostik-web/"
# Exclou graphify-out i altres bruticia git
EXCLUDE_PATTERN='graphify-out'

# ── Colors i helpers ─────────────────────────────────────────────────────
RED='\033[0;31m'
GRN='\033[0;32m'
YLW='\033[1;33m'
BLU='\033[0;34m'
DIM='\033[2m'
RST='\033[0m'

print() { echo -e "${BLU}▶${RST} $1"; }
ok()    { echo -e "${GRN}✓${RST} $1"; }
err()   { echo -e "${RED}✗ Error:${RST} $1" >&2; }
warn()  { echo -e "${YLW}⚠${RST}  $1"; }
dim()   { echo -e "${DIM}  $1${RST}"; }

# ── Funcions ─────────────────────────────────────────────────────────────
status() {
  echo ""
  CURRENT=$(git branch --show-current)
  print "Branca actual: ${YLW}${CURRENT}${RST}"
  echo ""
  git status --short
  echo ""
  dim "Últims commits:"
  git log --oneline -5
  echo ""
}

sync() {
  CURRENT=$(git branch --show-current)
  print "Sincronitzant amb ${REMOTE}/${CURRENT}..."

  git add -A
  if [[ -n "${EXCLUDE_PATTERN:-}" ]]; then
    git reset --quiet -- "${EXCLUDE_PATTERN}" 2>/dev/null || true
  fi

  if ! git diff --cached --quiet; then
    git commit -m "Auto-sync"
  fi

  git pull --rebase "$REMOTE" "$CURRENT" || {
    err "Pull/rebase fallat. Resol els conflictes manualment."
    exit 1
  }

  git push "$REMOTE" "$CURRENT" || exit 1
  ok "Sync complet (${CURRENT})"
}

build_prod() {
  print "Build producció (GitHub Pages, baseURL naubostik-web)..."
  hugo --minify \
       --cleanDestinationDir \
       --baseURL "https://112books.github.io/naubostik-web/"
  ok "Build correcte → ./${BUILD_DIR}/"
}

server_local() {
  print "Arrancant servidor local (http://localhost:1313)..."
  print "Ctrl+C per aturar."
  echo ""
  hugo server -D
}

deploy_pages() {
  CURRENT=$(git branch --show-current)
  if [[ "$CURRENT" != "$BRANCH" ]]; then
    warn "No estàs a la branca ${BRANCH} (estes a ${CURRENT})."
    read -r -p "  Canviar a ${BRANCH} i continuar? [s/N] " confirm
    if [[ "$confirm" =~ ^[Ss]$ ]]; then
      git checkout "$BRANCH"
    else
      err "Operació cancel·lada."
      exit 1
    fi
  fi

  print "Afegint canvis (excloent ${EXCLUDE_PATTERN})..."
  git add -A . ":!${EXCLUDE_PATTERN}"

  if ! git diff --cached --quiet; then
    print "Hi ha canvis: demanem missatge de commit."
    DEFAULT_MSG="Deploy Nau Bostik"
    read -r -p "  Missatge commit [${DEFAULT_MSG}]: " msg
    msg="${msg:-$DEFAULT_MSG}"
    git commit -m "$msg"
  else
    dim "Sense canvis nous per confirmar."
  fi

  print "Pujant a GitHub (branca ${BRANCH})..."
  dim "El GitHub Action (.github/workflows/hugo.yml) farà el deploy a GitHub Pages."
  git push "$REMOTE" "$BRANCH" || exit 1
  ok "Deploy iniciat → ${REPO_STAGING}"
  dim "Segueix el progrés a: https://github.com/112books/naubostik-web/actions"
}

clean() {
  print "Netejant directiva build (./${BUILD_DIR}/)..."
  rm -rf "$BUILD_DIR"
  ok "Netejat."
  dim "Hmm, també les imatges orfes de static/img/espais/ es revisen manualment."
}

# ── Menú ─────────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Nau Bostik — Sync & Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
CURRENT=$(git branch --show-current 2>/dev/null || echo "?")
echo -e " Branca: ${YLW}${CURRENT}${RST}"
echo ""
echo " 1) Status"
echo " 2) Sync (git add+commit+pull+push)"
echo " 3) Servidor local  →  localhost:1313"
echo " 4) Build local (producció)"
echo " 5) Deploy GitHub Pages  →  112books.github.io/naubostik-web/"
echo " 6) Netejar ./${BUILD_DIR}/"
echo "───────────────────────────────"
echo " 0) Sortir"
echo ""

read -r -p "Opció: " opt
echo ""

case $opt in
  1) status ;;
  2) sync ;;
  3) server_local ;;
  4) build_prod ;;
  5) deploy_pages ;;
  6) clean ;;
  0) exit 0 ;;
  *) err "Opció no vàlida: '${opt}'" ; exit 1 ;;
esac

echo ""
