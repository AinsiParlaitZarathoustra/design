<script lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@tryatlas/design-svelte";
</script>

<Dialog defaultOpen>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Choose a layout</DialogTitle>
      <DialogDescription>Rearranges panels and tabs into a ready-made project.</DialogDescription>
    </DialogHeader>
    <DialogFooter><Button>Save</Button></DialogFooter>
  </DialogContent>
</Dialog>
