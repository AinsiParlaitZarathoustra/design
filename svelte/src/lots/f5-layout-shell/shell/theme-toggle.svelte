<script lang="ts">
  import { Moon, Sun } from "lucide-svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import { Tooltip, TooltipContent, TooltipTrigger } from "../../f2-overlays-menus/index";

  /**
   * The light and dark switch, a footer tool of the rail. Ported from
   * `ThemeToggle` in `src/components/shell/app-shell.tsx`: the glyph and the
   * label name the theme it switches to, and the app decides what it stores.
   */
  interface Props {
    appearance: "dark" | "light";
    onToggle: () => void;
  }

  let { appearance, onToggle }: Props = $props();
  const next = $derived(appearance === "dark" ? "light" : "dark");
</script>

<Tooltip>
  <TooltipTrigger>
    {#snippet child(props)}
      <IconButton
        {...props}
        icon={appearance === "dark" ? Sun : Moon}
        label={`Switch to ${next} theme`}
        size="sm"
        onclick={onToggle}
      />
    {/snippet}
  </TooltipTrigger>
  <TooltipContent>Switch to {next}</TooltipContent>
</Tooltip>
