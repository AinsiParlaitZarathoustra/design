#!/usr/bin/env bash
# Cut a git-tag release that carries the built dist/ (bun does not build git
# dependencies). main never holds dist/; the tag points at a detached commit
# that does. Usage: bun run release  (from a clean main; version from package.json)
set -euo pipefail
version="v$(node -p "require('./package.json').version")"
remote="${RELEASE_REMOTE:-origin}"
[ -z "$(git status --porcelain)" ] || { echo "release: working tree is not clean" >&2; exit 1; }
[ "$(git branch --show-current)" = "main" ] || { echo "release: run from main" >&2; exit 1; }
git rev-parse -q --verify "refs/tags/$version" >/dev/null && { echo "release: $version already exists" >&2; exit 1; }
bun run build
git switch --detach -q
git add -f dist
git commit -qm "Release $version"
git tag "$version"
git push -q "$remote" "$version"
git switch -q main
echo "release: pushed $version"
