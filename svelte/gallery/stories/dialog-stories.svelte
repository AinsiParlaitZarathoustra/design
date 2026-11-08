<script lang="ts">
  import { Image as ImageIcon, X } from "lucide-svelte";
  import Button from "../../src/ui/button.svelte";
  import Kbd from "../../src/ui/kbd.svelte";
  import Input from "../../src/ui/input.svelte";
  import Icon from "../../src/ui/icon.svelte";
  import IconButton from "../../src/ui/icon-button.svelte";
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
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const LAYOUTS = ["Writing", "Review", "Pairing", "Terminal", "Research", "Focus"];

</script>

  {#snippet openTrigger(props: Record<string, unknown>)}
    <Button variant="outline" {...props}>Open dialog</Button>
  {/snippet}

  {#snippet openImageTrigger(props: Record<string, unknown>)}
    <Button variant="outline" {...props}>Open image</Button>
  {/snippet}

  {#snippet cancelButton(props: Record<string, unknown>)}
    <Button variant="ghost" {...props}>Cancel</Button>
  {/snippet}

  {#snippet saveButton(props: Record<string, unknown>)}
    <Button {...props}>Save<Kbd variant="inverse" text="↵" /></Button>
  {/snippet}

  {#snippet deleteButton(props: Record<string, unknown>)}
    <Button variant="destructive" {...props}>Delete</Button>
  {/snippet}

  {#snippet closeIcon(props: Record<string, unknown>)}
    <IconButton icon={X} label="Close" size="sm" {...props} />
  {/snippet}

{#if story === "default"}
  <Dialog>
    <DialogTrigger child={openTrigger} />
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename session</DialogTitle>
        <DialogDescription>The name shows in the sidebar and in shared links.</DialogDescription>
      </DialogHeader>
      <Input defaultValue="Refactor the settings panel" aria-label="Name" />
      <DialogFooter>
        <DialogClose child={cancelButton} />
        <DialogClose child={saveButton} />
      </DialogFooter>
    </DialogContent>
  </Dialog>
{:else if story === "open"}
  <Dialog defaultOpen>
    <DialogTrigger child={openTrigger} />
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename session</DialogTitle>
        <DialogDescription>The name shows in the sidebar and in shared links.</DialogDescription>
      </DialogHeader>
      <Input defaultValue="Refactor the settings panel" aria-label="Name" />
      <DialogFooter>
        <DialogClose child={cancelButton} />
        <DialogClose child={saveButton} />
      </DialogFooter>
    </DialogContent>
  </Dialog>
{:else if story === "destructive"}
  <Dialog defaultOpen>
    <DialogTrigger child={openTrigger} />
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete this session?</DialogTitle>
        <DialogDescription>
          Its transcript and checkpoints go with it. This cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose child={cancelButton} />
        <DialogClose child={deleteButton} />
      </DialogFooter>
    </DialogContent>
  </Dialog>
{:else if story === "without-close-button"}
  <Dialog defaultOpen>
    <DialogTrigger child={openTrigger} />
    <DialogContent showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>Rename session</DialogTitle>
        <DialogDescription>The name shows in the sidebar and in shared links.</DialogDescription>
      </DialogHeader>
      <Input defaultValue="Refactor the settings panel" aria-label="Name" />
      <DialogFooter>
        <DialogClose child={cancelButton} />
        <DialogClose child={saveButton} />
      </DialogFooter>
    </DialogContent>
  </Dialog>
{:else if story === "long-text"}
  <Dialog defaultOpen>
    <DialogTrigger child={openTrigger} />
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Allow this agent to read every project attached to the session, including the ones added
          later?
        </DialogTitle>
        <DialogDescription>
          Access is read-only. The agent asks again before it writes anything, and you can revoke
          access from the session's project list at any time. Projects added later inherit this
          choice until you change it.
        </DialogDescription>
      </DialogHeader>
      <Input defaultValue="Refactor the settings panel" aria-label="Name" />
      <DialogFooter>
        <DialogClose child={cancelButton} />
        <DialogClose child={saveButton} />
      </DialogFooter>
    </DialogContent>
  </Dialog>
{:else if story === "media"}
  <Dialog defaultOpen>
    <DialogTrigger child={openImageTrigger} />
    <DialogContent variant="media" showCloseButton={false} aria-describedby={undefined}>
      <div class="flex h-control-lg shrink-0 items-center gap-2 border-b border-border px-3">
        <DialogTitle variant="quiet">
          screenshot-2026-11-04-at-14.32.18-settings-page.png
        </DialogTitle>
        <DialogClose child={closeIcon} />
      </div>
      <div class="flex min-h-0 flex-1 items-center justify-center bg-muted text-muted-foreground">
        <Icon icon={ImageIcon} size="xl" />
      </div>
    </DialogContent>
  </Dialog>
{:else if story === "large-blurred"}
  <Dialog defaultOpen>
    <DialogTrigger child={openTrigger} />
    <DialogContent size="lg" blur>
      <DialogHeader>
        <DialogTitle>Choose a layout</DialogTitle>
        <DialogDescription>Rearranges panels and tabs into a ready-made project.</DialogDescription>
      </DialogHeader>
      <div class="grid grid-cols-3 gap-3">
        {#each LAYOUTS as name}
          <div class="rounded-xl border border-border bg-background p-2.5">
            <div class="aspect-16/10 rounded-md border border-border-subtle bg-card"></div>
            <div class="mt-2 text-sm font-medium text-foreground">{name}</div>
          </div>
        {/each}
      </div>
    </DialogContent>
  </Dialog>
{/if}
