#!/usr/bin/env bash
# Regenerate brand image assets from neuralshift/assets/logo.jpg (1254x1254)
# and scripts/og-card.html. Reproducible; rerun after editing the source logo
# or the OG card template. Requires: sips + cwebp (logos) and Google Chrome
# (OG card render). Run from the repo root: scripts/gen-assets.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/neuralshift/assets"
SRC="$ASSETS/logo.jpg"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

echo "==> Logo: 512x512 (schema.org / OG logo reference)"
sips -s format png -z 512 512 "$SRC" --out "$ASSETS/logo-512.png" >/dev/null

echo "==> Logo: 64x64 nav mark (displays ~32px @2x) — png + webp"
sips -s format png -z 64 64 "$SRC" --out "$ASSETS/logo-nav.png" >/dev/null
cwebp -quiet -q 88 "$ASSETS/logo-nav.png" -o "$ASSETS/logo-nav.webp"

echo "==> OG share card: 1200x630 (headless Chrome, real web fonts)"
"$CHROME" \
  --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 \
  --default-background-color=00000000 --virtual-time-budget=5000 \
  --screenshot="$ASSETS/og-image.png" \
  "file://$ROOT/scripts/og-card.html" 2>/dev/null

echo "==> Done:"
for f in logo-512.png logo-nav.png logo-nav.webp og-image.png; do
  printf "    %-16s %7s bytes\n" "$f" "$(stat -f%z "$ASSETS/$f")"
done
