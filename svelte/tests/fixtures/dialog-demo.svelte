<script lang="ts">
  import Button from "../../src/ui/button.svelte";
  import Input from "../../src/ui/input.svelte";
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../src/ui/dialog/index";

  interface Props {
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    showCloseButton?: boolean;
    blur?: boolean;
    size?: "default" | "lg";
  }

  let {
    defaultOpen = false,
    onOpenChange,
    showCloseButton = true,
    blur = false,
    size = "default",
  }: Props = $props();

  let open = $state(defaultOpen);
</script>

<Dialog bind:open {onOpenChange}>
  <DialogTrigger>
    {#snippet child(props)}
      <Button variant="outline" {...props}>Open dialog</Button>
    {/snippet}
  </DialogTrigger>
  <DialogContent {showCloseButton} {blur} {size}>
    <DialogHeader>
      <DialogTitle>Rename session</DialogTitle>
      <DialogDescription>The name shows in the sidebar and in shared links.</DialogDescription>
    </DialogHeader>
    <Input defaultValue="Refactor the settings panel" aria-label="Name" />
    <DialogFooter>
      <DialogClose>
        {#snippet child(props)}
          <Button variant="ghost" {...props}>Cancel</Button>
        {/snippet}
      </DialogClose>
      <DialogClose>
        {#snippet child(props)}
          <Button {...props}>Save</Button>
        {/snippet}
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
