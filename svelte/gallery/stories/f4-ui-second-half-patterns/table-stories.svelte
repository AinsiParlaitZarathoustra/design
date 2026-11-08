<script lang="ts">
  import Table from "../../../src/lots/f4-ui-second-half-patterns/table/table.svelte";
  import TableBody from "../../../src/lots/f4-ui-second-half-patterns/table/table-body.svelte";
  import TableCaption from "../../../src/lots/f4-ui-second-half-patterns/table/table-caption.svelte";
  import TableCell from "../../../src/lots/f4-ui-second-half-patterns/table/table-cell.svelte";
  import TableFooter from "../../../src/lots/f4-ui-second-half-patterns/table/table-footer.svelte";
  import TableHead from "../../../src/lots/f4-ui-second-half-patterns/table/table-head.svelte";
  import TableHeader from "../../../src/lots/f4-ui-second-half-patterns/table/table-header.svelte";
  import TableRow from "../../../src/lots/f4-ui-second-half-patterns/table/table-row.svelte";

  interface Props {
    story?: string;
  }

  interface Row {
    name: string;
    sessions: number;
    tokens: string;
    cost: string;
  }

  let { story = "default" }: Props = $props();

  const ROWS: Row[] = [
    { name: "atlas", sessions: 48, tokens: "1.2M", cost: "$18.40" },
    { name: "design", sessions: 21, tokens: "640K", cost: "$9.10" },
    { name: "server", sessions: 17, tokens: "512K", cost: "$7.75" },
    { name: "docs", sessions: 6, tokens: "88K", cost: "$1.20" },
  ];

  const LONG_ROWS: Row[] = [
    {
      name: "atlas-desktop-and-every-fork-made-from-it-by-the-team",
      sessions: 1204,
      tokens: "120.4M",
      cost: "$1,840.00",
    },
    ...ROWS,
  ];

  const MANY_ROWS: Row[] = Array.from({ length: 24 }, (_, i) => ({
    ...ROWS[i % ROWS.length]!,
    name: `${ROWS[i % ROWS.length]!.name}-${i + 1}`,
  }));

  const scenario = $derived.by(() => {
    switch (story) {
      case "with-footer":
        return { rows: ROWS, caption: "Usage, last 7 days", footer: true, selected: undefined };
      case "selected":
        return { rows: ROWS, caption: undefined, footer: false, selected: 1 };
      case "empty":
        return { rows: [] as Row[], caption: undefined, footer: false, selected: undefined };
      case "long-text":
        return { rows: LONG_ROWS, caption: undefined, footer: false, selected: undefined };
      case "many-items":
        return { rows: MANY_ROWS, caption: undefined, footer: false, selected: undefined };
      default:
        return { rows: ROWS, caption: undefined, footer: false, selected: undefined };
    }
  });
</script>

<div class="w-full max-w-xl">
  <Table>
    {#if scenario.caption}
      <TableCaption>{scenario.caption}</TableCaption>
    {/if}
    <TableHeader>
      <TableRow>
        <TableHead>Project</TableHead>
        <TableHead class="text-right">Sessions</TableHead>
        <TableHead class="text-right">Tokens</TableHead>
        <TableHead class="text-right">Cost</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#if scenario.rows.length === 0}
        <TableRow>
          <TableCell colspan={4} class="h-16 text-center text-muted-foreground">
            No sessions this week.
          </TableCell>
        </TableRow>
      {:else}
        {#each scenario.rows as r, i (`${r.name}-${i}`)}
          <TableRow data-selected={i === scenario.selected || undefined}>
            <TableCell class="max-w-48 truncate font-medium">{r.name}</TableCell>
            <TableCell class="text-right tabular-nums">{r.sessions}</TableCell>
            <TableCell class="text-right tabular-nums">{r.tokens}</TableCell>
            <TableCell class="text-right tabular-nums">{r.cost}</TableCell>
          </TableRow>
        {/each}
      {/if}
    </TableBody>
    {#if scenario.footer}
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell class="text-right tabular-nums">92</TableCell>
          <TableCell class="text-right tabular-nums">2.4M</TableCell>
          <TableCell class="text-right tabular-nums">$36.45</TableCell>
        </TableRow>
      </TableFooter>
    {/if}
  </Table>
</div>
