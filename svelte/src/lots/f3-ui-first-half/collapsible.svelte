<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { setCollapsible } from "./collapsible-context";

  /** A disclosure: one trigger that shows and hides its panel. Unstyled. */
  interface Props {
    /** The open state. Bind it to control the collapsible. */
    open?: boolean;
    /** Open at first render, when `open` is not bound. */
    defaultOpen?: boolean;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let {
    open = $bindable(),
    defaultOpen = false,
    disabled = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  // Uncontrolled unless the parent binds `open`: the first render takes `defaultOpen`.
  let uncontrolled = $state(untrack(() => defaultOpen));
  const isOpen = $derived(open ?? uncontrolled);

  const uid = $props.id();

  setCollapsible({
    get open() {
      return isOpen;
    },
    get disabled() {
      return disabled;
    },
    panelId: `${uid}-panel`,
    toggle: () => {
      if (disabled) return;
      if (open !== undefined) open = !isOpen;
      else uncontrolled = !isOpen;
    },
  });
</script>

<div
  data-slot="collapsible"
  data-open={isOpen ? "" : undefined}
  data-closed={isOpen ? undefined : ""}
  data-disabled={disabled ? "" : undefined}
  class={className}
  {...rest}
>
  {@render children?.()}
</div>
