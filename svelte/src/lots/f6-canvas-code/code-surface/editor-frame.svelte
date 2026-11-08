<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * A file view's chrome: desktop's file tab (`editor-panel.tsx`), a header
   * band with the path and the file's actions, then the editor. It holds no
   * state and renders no editor; the slots are filled by the app.
   */
  interface Props {
    /** The header's left side: usually `EditorBreadcrumbs`. */
    breadcrumbs?: Snippet;
    /** The header's right side: the file's actions. */
    actions?: Snippet;
    /** A one-line note under the header, in the warning tone. */
    notice?: Snippet;
    /** Floats over the body's top-right corner: a `FindBar`. */
    findBar?: Snippet;
    /** Below the body: an `EditorStatusBar`. */
    statusBar?: Snippet;
    /** The editor itself or an `EditorPreview`. */
    children?: Snippet;
    class?: string;
  }

  let { breadcrumbs, actions, notice, findBar, statusBar, children, class: className }: Props =
    $props();
</script>

<section
  data-slot="editor-frame"
  class={cn(
    "flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground",
    className,
  )}
>
  <div
    data-slot="editor-frame-header"
    class="flex h-control-lg shrink-0 items-center gap-2 overflow-hidden border-b border-border bg-background px-3"
  >
    <div class="flex min-w-0 flex-1 items-center">{@render breadcrumbs?.()}</div>
    {#if actions}
      <div class="ml-auto flex shrink-0 items-center gap-1 pl-2">{@render actions()}</div>
    {/if}
  </div>
  {#if notice}
    <div
      role="status"
      class="shrink-0 border-b border-border bg-warning-muted px-3 py-1.5 text-2xs text-warning"
    >
      {@render notice()}
    </div>
  {/if}
  <div
    data-slot="editor-frame-body"
    class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-editor-background text-editor-foreground"
  >
    {@render children?.()}
    {#if findBar}
      <div
        class="pointer-events-none absolute inset-x-3 top-2 z-panel flex justify-end *:pointer-events-auto"
      >
        {@render findBar()}
      </div>
    {/if}
  </div>
  {@render statusBar?.()}
</section>
