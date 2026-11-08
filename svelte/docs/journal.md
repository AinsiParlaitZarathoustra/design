# Journal de la migration — append-only

Heures locales (Europe/Paris). Une entrée par étape significative : SHA, lots,
preuves, échecs, dépendance bloquante, prochaine action.

## 2026-11-07 23:47 — 0A démarrage

- Source `tryatlas/design`, branche `main`, arbre propre, HEAD
  `0f4399832d06bc3558d35d5a96d6557f33d412b1` (= SHA épinglé), paquet
  `@tryatlas/design` 0.1.15, licence Apache-2.0.
- Outillage observé : Bun absent du PATH → installé 1.4.4 (`~/.bun/bin`) ;
  Node 26.0.0 ; npm 11.12.1 ; Chromium Playwright en cache ; Bun 1.4.4.
- Worktree d'intégration créé : `/Users/maximebuffet/Documents/design-svelte`,
  branche `migration/svelte-5`, détachée du SHA. Cible dans `svelte/`.
- Ports : oracle 6006, galerie 6100. Captures : `svelte/screenshots/`.
- `bun install --frozen-lockfile` dans la source : OK.

## 2026-11-07 23:49 — 0A contrôles source

| Commande | Résultat |
|---|---|
| `bun run theme:check` | OK, « every generated file matches » |
| `bun run typecheck` | OK |
| `bun run test` | 65 fichiers, 652 tests passés |
| `bun run build-storybook` | OK, `storybook-static/` (20 s) |
| `bun run format:check` | OK, 440 fichiers |
| `bun run build` | OK |
| `index.json` | 981 entrées : 853 stories, 128 docs, 138 titres |
| exports racine (runtime) | 498 |

Prochaine action : 0B inventaire + scaffold Svelte.

## 2026-11-08 00:03 — scaffold Svelte 5

- `svelte/` : Svelte 5.57.3, Vite 8.3.6, Tailwind 4.3.5, TypeScript 5.9.3,
  `@sveltejs/package` 3.0.2, Vitest 5.1.0.
- `src/styles`, `src/theme`, `src/lib`, `keys.toml`, `themes/`,
  `theme-rules/`, `scripts/generate-theme.ts`, `LICENSE`,
  `THIRD_PARTY_NOTICES.md` copiés du SHA.
- `bun run theme:check` passe après régénération du registre (le `sed` des
  extensions `.ts` l'avait rendu périmé ; la génération est reproduite à
  l'identique).
- Galerie Vite à `http://localhost:6100` avec URLs déterministes.

## 2026-11-08 00:10 — 0C lot témoin

- Composants : `Button`, `IconButton`, `Input`, `Kbd`, `Hint`, `Spinner`,
  `Icon`, `Dialog` (Root/Trigger/Content/Header/Footer/Title/Description/
  Close), `TabStrip` (+ `TabChip` et géométrie pure).
- Conventions figées dans `docs/conventions.md` (snippets, `bind:`, `child`,
  recettes, thèmes, preuves, écarts).
- `svelte-check` : 0 erreur (15 avertissements a11y/initialisation assumés).
- Tests : 5 fichiers, 70 tests passés.
- Comparateur : `scripts/compare.ts` (Playwright 1.65 / Chromium 1254,
  pixelmatch, animations gelées, caret masqué, scroll de tablist normalisé).
- 28 captures atlas sombre/clair × 14 stories du lot témoin : **toutes
  identiques au pixel** (0,000 %). Deux écarts corrigés en route : texte du
  déclencheur de la story `Media` (« Open image »), et flake de la source sur
  la révélation de l'onglet actif quand la police arrive après le layout effect.
- Paquet : `svelte-package` + `scripts/fix-dist.ts` ; tarball
  `design-svelte-0.1.15.tgz` (150 Ko).
- Consommateur `fixtures/consumer` : installation du tarball, `svelte-check`
  0 erreur, build Vite OK (CSS 149 Ko), SSR `svelte/server` OK (8 119 octets,
  6 contrôles), aucun import React dans `dist`.
- Prochaine action : matrice thèmes/zoom/viewport, manifeste, clôture.

## 2026-11-08 00:48 — matrices et écarts

- Matrice thèmes : 120/120 captures identiques (15 thèmes × 2 apparences ×
  Button, Input/Invalid, Dialog/Open, TabStrip/States).
- Zoom : 48 captures (0.9 / 1 / 1.15 / 1.3) ; un écart à 1.3 sur
  `TabStrip/Overflow` (0,08 %) venait de la révélation de l'onglet actif qui
  dépendait de l'objet `scroll` entier : elle se rejouait après une écriture
  programmatique de `scrollLeft`. La dépendance est maintenant `overflow` seul,
  comme le `useLayoutEffect` de la source ; 0,000 % après correction.
- Viewports 375 et 768 : 24/24 identiques.
- Badge, Kbd et Icon ajoutés (16 stories) ; `KbdCombo`/`KbdKeys` portés.
- `TabStrip/DragToReorder` : la source capture l'état **après** son `play`
  (ordre `readme, diff, app, …`) ; la galerie démarre dans cet ordre, faute de
  lanceur de `play`. 0,000 % après correction.
- `Icon/Sizes` en clair : 19 pixels d'anti-aliasing sur les légendes
  (0,0018 %), classé `écart identifié` ; le même cas en sombre est identique.
- `Badge/WithIcon` : 3 pixels d'anti-aliasing d'icône (0,0002 %), `within-noise`.
- Total : 275 captures, 52 stories, 272 identiques, 2 sous le bruit, 1 écart
  sous-pixel documenté.

## 2026-11-08 00:55 — contrôles source complets

- `storybook:smoke` : OK (23 primitives, 104 composants, 10 pages de
  fondations, 853 stories).
- `test:storybook` : 852/853 passent. Échec préexistant
  `Shell/SidebarControls` (`StoryLinks` provider manquant dans le décor) ;
  il n'est pas causé par le port et reste hors périmètre.
- `test:consumer` (worktree jetable `/tmp/design-consumer`) : OK, fixture
  consommateur `design.tgz` construite.
- `format:check` et `build` source : OK.
- Paquet Svelte : tarball 150 Ko, `svelte-check` 0 erreur, build Vite,
  SSR 8 119 octets, 6 contrôles, aucun import React.

## 2026-11-08 01:00 — état intégré

- Branche `migration/svelte-5` dans `/Users/maximebuffet/Documents/design-svelte`,
  cible `svelte/`.
- 73 tests / 5 fichiers, `theme:check` 15 thèmes, `svelte-check` 0 erreur
  (17 avertissements a11y/initialisation).
- 29 exports portés (22 vérifiés, 7 portés sans test direct), 52 stories
  portées dont 51 vérifiées et 1 écart sous-pixel.
- Reste : 729 exports et 801 stories inventoriés, vagues B/C/D ; gaps API
  `TabStrip.renderTab` et composition tooltip.
