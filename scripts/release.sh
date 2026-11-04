#!/usr/bin/env bash
# Cut a git-tag release that carries the built dist/ (bun does not build git
# dependencies). main never holds dist/; the tag points at a detached commit
# that does. Usage: bun run release  (from a clean main, or a detached HEAD at
# <remote>/main such as a worktree's; version from package.json). The remote is
# RELEASE_REMOTE, default origin.
set -euo pipefail
version="v$(node -p "require('./package.json').version")"
remote="${RELEASE_REMOTE:-origin}"
[ -z "$(git status --porcelain)" ] || { echo "release: working tree is not clean" >&2; exit 1; }
branch="$(git branch --show-current)"
start="$(git rev-parse HEAD)"
if [ "$branch" != "main" ]; then
  git fetch -q "$remote" main
  if [ -n "$branch" ] || [ "$start" != "$(git rev-parse "$remote/main")" ]; then
    echo "release: run from main, or a detached HEAD at $remote/main" >&2
    exit 1
  fi
fi
git rev-parse -q --verify "refs/tags/$version" >/dev/null && { echo "release: $version already exists" >&2; exit 1; }
bun run build
git switch --detach -q
git add -f dist
git commit -qm "Release $version"
git tag -a "$version" -m "Release $version"
git push -q "$remote" "$version"
if [ -n "$branch" ]; then git switch -q "$branch"; else git switch -q --detach "$start"; fi
echo "release: pushed $version"
