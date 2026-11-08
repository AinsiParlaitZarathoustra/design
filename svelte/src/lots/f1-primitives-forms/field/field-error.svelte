<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * The error of a field. Several errors collapse to a list, and duplicates
   * by message are shown once, as `FieldError` in `src/components/ui/field.tsx`
   * does. It renders nothing when there is nothing to show.
   */
  interface FieldErrorItem {
    message?: string;
  }

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
    errors?: Array<FieldErrorItem | undefined>;
  }

  let { class: className, children, errors, ...rest }: Props = $props();

  const uniqueErrors = $derived(
    [...new Map((errors ?? []).map((error) => [error?.message, error])).values()],
  );
  const showErrors = $derived(
    uniqueErrors.length === 1 ? !!uniqueErrors[0]?.message : uniqueErrors.length > 1,
  );
</script>

{#if children || showErrors}
  <div role="alert" data-slot="field-error" class={cn("text-xs font-medium text-error", className)} {...rest}>
    {#if children}
      {@render children()}
    {:else if uniqueErrors.length === 1}
      {uniqueErrors[0]?.message}
    {:else}
      <ul class="ml-4 flex list-disc flex-col gap-1">
        {#each uniqueErrors as error, index (index)}
          {#if error?.message}
            <li>{error.message}</li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>
{/if}
