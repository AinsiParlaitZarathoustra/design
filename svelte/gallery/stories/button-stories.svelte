<script lang="ts">
  import { ArrowRight, Loader2, Plus, Trash2 } from "lucide-svelte";
  import Button from "../../src/ui/button.svelte";
  import Icon from "../../src/ui/icon.svelte";
  import Kbd from "../../src/ui/kbd.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const VARIANTS = [
    "default",
    "secondary",
    "outline",
    "ghost",
    "ghost-destructive",
    "link",
    "destructive",
    "destructive-outline",
    "warning-outline",
  ] as const;
  const SIZES = ["xs", "sm", "md", "lg"] as const;
</script>

{#if story === "default"}
  <Button>Continue</Button>
{:else if story === "variants"}
  <div class="flex flex-wrap items-center gap-2">
    {#each VARIANTS as variant}
      <Button {variant}>{variant}</Button>
    {/each}
  </div>
{:else if story === "sizes"}
  <div class="flex items-center gap-2">
    {#each SIZES as size}
      <Button {size}>Size {size}</Button>
    {/each}
  </div>
{:else if story === "secondary"}
  <Button variant="secondary">Continue</Button>
{:else if story === "outline"}
  <Button variant="outline">Continue</Button>
{:else if story === "ghost"}
  <Button variant="ghost">Continue</Button>
{:else if story === "destructive"}
  <Button variant="destructive">Delete</Button>
{:else if story === "ghost-destructive"}
  <Button variant="ghost-destructive">Discard</Button>
{:else if story === "disabled"}
  <div class="flex flex-wrap items-center gap-2">
    {#each VARIANTS as variant}
      <Button {variant} disabled>{variant}</Button>
    {/each}
  </div>
{:else if story === "loading"}
  <Button disabled>
    <Icon icon={Loader2} size="sm" class="animate-spin" />
    Saving…
  </Button>
{:else if story === "with-icon"}
  <div class="flex flex-wrap items-center gap-2">
    <Button>
      <Icon icon={Plus} size="sm" />
      New session
    </Button>
    <Button variant="outline">
      Open
      <Icon icon={ArrowRight} size="sm" />
    </Button>
    <Button variant="destructive-outline">
      <Icon icon={Trash2} size="sm" />
      Discard changes
    </Button>
    <Button variant="default">
      Send
      <Kbd variant="inverse" text="↵" />
    </Button>
  </div>
{:else if story === "pressed"}
  <Button variant="ghost" aria-pressed={true}>Wrap lines</Button>
{:else if story === "long-text"}
  <div class="flex w-64 flex-col items-start gap-2">
    <Button>Approve every pending tool call in this session and continue the run</Button>
    <p class="caption">Buttons never wrap: give them room, or shorten the label.</p>
  </div>
{/if}
