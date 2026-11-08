<script lang="ts">
  import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Input,
    Kbd,
    TabStrip,
    type TabStripItem,
  } from "@tryatlas/design-svelte";
  import { FileText, Home } from "lucide-svelte";

  let open = $state(false);
  let name = $state("Refactor the settings panel");
  let active = $state<string | null>("readme");

  const items: TabStripItem[] = [
    { id: "app", title: "app-frame.tsx", icon: FileText, closable: true },
    { id: "readme", title: "README.md", icon: FileText, closable: true, dirty: true },
    { id: "home", title: "Home", icon: Home, pinned: true },
  ];
</script>

<main class="flex flex-col gap-3 p-4">
  <div class="flex items-center gap-2">
    <Button onclick={() => (open = true)}>Rename session <Kbd variant="inverse" text="↵" /></Button>
    <Button variant="outline">Cancel</Button>
  </div>

  <Input bind:value={name} aria-label="Name" />
  <p class="caption text-secondary-foreground">value: {name}</p>

  <div class="w-full max-w-3xl rounded-md border border-border bg-background p-1.5">
    <TabStrip
      aria-label="Open files"
      {items}
      activeId={active}
      onSelect={(id) => (active = id)}
      onClose={() => {}}
    />
  </div>
</main>

<Dialog bind:open>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Rename session</DialogTitle>
      <DialogDescription>The name shows in the sidebar and in shared links.</DialogDescription>
    </DialogHeader>
    <Input bind:value={name} aria-label="Name" />
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
