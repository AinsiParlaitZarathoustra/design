# Conventions du port Svelte — figées par le lot témoin

Ces règles viennent du lot `Button` / `Input` / `Dialog` / `TabStrip`, qui est
passé par la comparaison pixel et les tests avant d'être distribué aux vagues
suivantes. Un lot qui s'en écarte doit le justifier dans son rapport.

## Arborescence

`src/` reprend l'arborescence de la source (`ui/`, `components/`, `styles/`,
`theme/`, `lib/`), et les mêmes noms de fichiers. La galerie vit hors de `src`
(`gallery/`), donc `svelte-package -i src -o dist` ne la publie pas. Le paquet
reste `@tryatlas/design-svelte` 0.1.15, `private`, sans publication.

## Props et composition

| React (`@tryatlas/design`) | Svelte 5 |
|---|---|
| `children` ReactNode | snippet enfant (`{@render children?.()}`) |
| `render={<Button …/>}` (Base UI) | `child` snippet qui reçoit les attributs à étaler : `{#snippet child(props)}<Button {...props}>…{/snippet}` |
| `icon={LucideIcon}` | même prop, composant Lucide Svelte ; un élément se passe par le snippet enfant |
| `defaultValue` / `defaultOpen` | même nom, appliqué une seule fois au montage |
| `value` / `open` contrôlés | `bind:value` / `bind:open` ; `oninput` / `onOpenChange` restent disponibles |
| `onSelect`, `onClose`, `onOpenChange` | mêmes noms, mêmes signatures (pas d'événements `on:`) |
| `className` | `class`, fusionné par `cn()` après la recette |
| props DOM restantes | `...rest` étalé sur l'élément racine |

Un snippet `child` **reçoit directement le dictionnaire d'attributs**, pas un
objet `{ props }` : `{#snippet child(attrs)}<Button {...attrs}>` est la forme
canonique.

## Recettes et styles

- Les recettes `cva` sont copiées sans modification (`button-variants.ts`,
  `input-variants.ts`, `kbd-variants.ts`, `icon-button-variants.ts`).
- `styles.css` et son découpage sont copiés du SHA. Tailwind v4 est importé par
  la galerie et le consommateur, puis `@source` couvre `src`, `gallery` et
  `dist` (`scripts/gallery.css` et `fixtures/consumer/src/app.css`).
- Le DOM accessible suit la source : `data-slot`, `aria-*`, `role`, et les
  attributs `data-open` / `data-closed` pour les animations.
- Une différence de DOM admise est documentée et testée (voir
  « Écarts connus »).

## Thèmes, apparence, échelle

`data-theme` et `data-appearance` vont sur `<html>` ; le zoom est
`document.documentElement.style.zoom` **et** `--ui-zoom`, comme le décorateur
Storybook de la source. La galerie applique les deux depuis l'URL :

```
/?story=primitives-dialog--open&theme=dracula&appearance=light&scale=1.15
```

Les 15 thèmes viennent de `themes/*.toml` ; l'ordre de cascade reste
`tokens.css → themes.css → utilities.css → syntax.css → session.css →
canvas.css`, et `styles.css` garde aussi `default-theme.css` pour l'entrée
`styles-core.css`.

## Stories et galerie

- L'identifiant de story de la source est conservé tel quel
  (`primitives-button--default`, `layout-tabstrip--overflow`), donc l'URL
  cible est une bijection directe de `index.json`.
- Une famille a un seul composant de scénarios (`gallery/stories/*-stories.svelte`)
  qui reçoit `story="…"` ; le registre `gallery/registry.ts` porte les
  identifiants, le mode de capture (`element` ou `page`) et l'apparence.
- Une story d'overlay ouverte porte `mode: "page"` ; une story normale
  `mode: "element"`. La galerie ajoute le même `padding: 1rem` que le
  `body` Storybook pour que la capture pleine page s'aligne.

## Preuves

- Tests composant : `tests/*.test.ts` (happy-dom), un fichier par famille et
  les fixtures dans `tests/fixtures/`.
- Captures : `scripts/compare.ts`, `screenshots/report.json` et les PNG
  `source` / `target` / `diff`. Seuil de bruit : 0 %, mesuré par deux captures
  successives de la source. Le comparateur gèle les animations au début après
  stabilisation, désactive le caret, et normalise le `scrollLeft` du tablist
  sur la source quand la révélation de l'onglet actif dépend du chargement de
  la police (la source se contredit alors avec elle-même).
- Un export est `vérifié` s'il a un test ou une capture identique ; une story
  est `vérifiée` si toutes ses captures du rapport sont identiques.

## Écarts connus, assumés et testés

1. **Base UI n'est pas porté.** `Dialog` est une implémentation native
   (rôles, focus trap, Escape, restauration du focus, portail, phases
   d'animation). Le comportement est couvert par `tests/dialog.test.ts` et par
   six captures identiques ; les primitives React ne sont pas installées.
2. **`Hint`** dessine son propre tooltip (délai 300 ms, fenêtre chaude,
   portail) au lieu de composer Base UI ; le déclencheur est enveloppé dans un
   `<span role="group">`, ce que la source fait déjà pour les contrôles
   désactivés. La story `IconButton/WithHint` n'est pas encore portée.
3. **`TabStrip.renderTab`** n'est pas porté ; la story
   `layout-tabstrip--context-menu-on-tabs` est marquée `non porté`. `tabProps`
   l'est (drag-to-reorder).
4. **`DialogContent` fixe `aria-labelledby`** sur l'id du titre dès le rendu
   serveur, alors que la source ne l'ajoute qu'après le montage du `Title` :
   sans cela le HTML SSR n'a pas de nom accessible.
5. **Icônes** : `lucide-svelte` 1.0.1 remplace `lucide-react` 1.62 ; les tracés
   des glyphes utilisés par le lot témoin sont identiques au pixel.
