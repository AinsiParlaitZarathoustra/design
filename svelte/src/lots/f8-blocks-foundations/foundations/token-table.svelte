<script lang="ts" module>
  import type { Snippet } from "svelte";

  /** A cell's text. */
  export type TokenCell = string;

  export interface TokenRow<T> {
    name: string;
    value: TokenCell;
    use: TokenCell;
    /** What the sample draws from, passed to the `sample` snippet. */
    data?: T;
  }
</script>

<script lang="ts" generics="T">
  /**
   * A table of tokens: the name you write, what it is, and a live sample. Three
   * columns leave the sample out.
   */
  interface Props {
    rows: TokenRow<T>[];
    columns?: string[];
    sample?: Snippet<[T]>;
  }

  let { rows, columns = ["Token", "Value", "Use", "Sample"], sample }: Props = $props();
</script>

<div class="overflow-hidden rounded-md border border-border">
  <table class="w-full border-collapse text-left">
    <thead>
      <tr class="bg-card">
        {#each columns as column (column)}
          <th class="eyebrow border-b border-border px-3 py-2 font-semibold">{column}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.name)}
        <tr class="border-b border-border-subtle last:border-b-0">
          <td class="px-3 py-2.5 align-middle">
            <code class="code">{row.name}</code>
          </td>
          <td class="px-3 py-2.5 align-middle">
            <code class="code text-muted-foreground">{row.value}</code>
          </td>
          <td class="label px-3 py-2.5 align-middle text-secondary-foreground">
            {row.use}
          </td>
          {#if columns.length === 4}
            <td class="px-3 py-2.5 align-middle">
              {#if sample && row.data !== undefined}{@render sample(row.data)}{/if}
            </td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
