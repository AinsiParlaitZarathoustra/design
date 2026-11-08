<script lang="ts">
  import { untrack } from "svelte";
  import {
    Archive,
    Copy,
    Cpu,
    FilePlus,
    FileText,
    MessageSquare,
    Plus,
    Settings,
    MoreHorizontal,
    Pencil,
    Pin,
    RefreshCw,
    Trash2,
    Bold,
    Italic,
    Underline,
  } from "lucide-svelte";
  import {
    ColorHueSlider,
    ColorSaturationValuePlane,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    Select,
    Switch,
    type SelectOption,
    CommandDialog,
    CommandDialogPopup,
    CommandDialogTrigger,
    CommandEmpty,
    CommandFooter,
    CommandFooterHint,
    CommandGroupLabel,
    CommandInput,
    CommandItem,
    CommandItemIcon,
    CommandPanel,
    CommandShortcut,
    CommandSubmenuChevron,
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    menuContentVariants,
    menuItemVariants,
    menuLabelVariants,
    menuShortcutVariants,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../src/lots/f2-overlays-menus/index";
  import Button from "../../src/ui/button.svelte";
  import Kbd from "../../src/ui/kbd.svelte";
  import IconButton from "../../src/ui/icon-button.svelte";
  import Icon from "../../src/ui/icon.svelte";
  import Hint from "../../src/lots/f2-overlays-menus/tooltip-hint.svelte";
  import { hsvToHex, type HsvColor } from "../../src/theme/color";

  interface Props {
    story?: string;
  }

  let { story = "color-picker-default" }: Props = $props();

  // Each colour picker story owns its colour, as the source's `Picker` does.
  let pickerDefault = $state<HsvColor>({ h: 210, s: 0.6, v: 0.9 });
  let pickerRed = $state<HsvColor>({ h: 0, s: 0.8, v: 0.9 });
  let pickerBlack = $state<HsvColor>({ h: 0, s: 0, v: 0 });
  let hueAlone = $state(120);

  interface PopoverDemo {
    defaultOpen?: boolean;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    arrow?: boolean;
    surface?: "default" | "tinted" | "glass";
    backdrop?: boolean;
    body?: string;
  }

  const POPOVER_LONG_TEXT =
    "Atlas tells you when a run is waiting for approval, when a long build finishes, when a teammate mentions you in a shared session, and when a scheduled task fails. Each of these can be turned off on its own in Settings.";

  const SELECT_MODELS: SelectOption<string>[] = [
    { value: "fast", label: "Fast", description: "Quick edits and questions" },
    { value: "balanced", label: "Balanced", description: "The default for most work" },
    { value: "deep", label: "Deep", description: "Long refactors and planning" },
  ];
  const SELECT_LONG: SelectOption<string>[] = [
    { value: "a", label: "A model name long enough to truncate in the trigger" },
    { value: "b", label: "Short" },
  ];

  function initialSelectValue(scenario: string): string | null {
    if (scenario === "select-placeholder" || scenario === "select-empty") return null;
    if (scenario === "select-long-text") return "a";
    return "balanced";
  }
  let selectValue = $state<string | null>(untrack(() => initialSelectValue(story)));

  interface CommandDemo {
    defaultOpen?: boolean;
    query?: string;
    active?: number;
    empty?: boolean;
    disabledRow?: boolean;
  }

  const COMMAND_ROWS = [
    { icon: Plus, label: "New session", shortcut: "⌘N" },
    { icon: MessageSquare, label: "Open session…", submenu: true },
    { icon: FileText, label: "Open file…", shortcut: "⌘P" },
    { icon: Settings, label: "Settings", shortcut: "⌘,", submenu: false },
  ];
  const SLASH_ROWS = [
    { name: "compact", description: "Summarise the session so far and start fresh" },
    { name: "review", description: "Review the changes on this branch" },
    { name: "init", description: "Write an AGENTS.md for this project" },
    { name: "login", description: "Sign in to the agent's provider" },
  ];

  interface DropdownDemo {
    defaultOpen?: boolean;
    disabledItem?: boolean;
    longLabel?: boolean;
  }

  const SLASH = [
    { label: "Heading", kbd: "#" },
    { label: "Bullet list", kbd: "-" },
    { label: "Code block", kbd: "```" },
  ];
  let slashActive = $state(0);

  interface TooltipDemo {
    open?: boolean;
    label?: string;
    shortcut?: string;
    side?: "top" | "bottom" | "left" | "right";
  }
</script>

{#snippet picker(hsv: HsvColor, setHsv: (next: HsvColor) => void)}
  <div class="flex w-64 flex-col gap-3">
    <ColorSaturationValuePlane label="Saturation and brightness" value={hsv} onChange={setHsv} />
    <ColorHueSlider label="Hue" value={hsv.h} onChange={(h) => setHsv({ ...hsv, h })} />
    <div class="flex items-center gap-2">
      <span
        class="size-control-sm rounded border border-border"
        style="background: {hsvToHex(hsv)};"
        aria-hidden="true"
      ></span>
      <code class="code">{hsvToHex(hsv)}</code>
    </div>
  </div>
{/snippet}

{#snippet tooltipDemo(demo: TooltipDemo)}
  {@const label = demo.label ?? "Refresh"}
  {#snippet refreshTrigger(props: Record<string, unknown>)}
    <IconButton {...props} icon={RefreshCw} {label} variant="outline" />
  {/snippet}
  <div class="flex min-h-40 items-center justify-center">
    <Tooltip open={demo.open}>
      <TooltipTrigger child={refreshTrigger} />
      <TooltipContent side={demo.side ?? "top"} sideOffset={4}>
        {label}{#if demo.shortcut}<span class="ml-1.5 text-muted-foreground">{demo.shortcut}</span>{/if}
      </TooltipContent>
    </Tooltip>
  </div>
{/snippet}

{#snippet popoverTrigger(props: Record<string, unknown>)}
  <Button variant="outline" {...props}>Notifications</Button>
{/snippet}

{#snippet popoverDemo(demo: PopoverDemo)}
  <div class="relative flex min-h-64 items-start justify-center pt-4">
    {#if demo.backdrop}
      <div aria-hidden="true" class="absolute inset-x-0 top-14 flex flex-col gap-1.5 px-6">
        {#each Array.from({ length: 8 }, (_, i) => i) as i (i)}
          <p class="text-sm text-muted-foreground">
            Maya: the session from this morning is ready for review, line {i + 1}
          </p>
        {/each}
      </div>
    {/if}
    <Popover defaultOpen={demo.defaultOpen ?? false}>
      <PopoverTrigger child={popoverTrigger} />
      <PopoverContent
        side={demo.side ?? "bottom"}
        align={demo.align ?? "center"}
        arrow={demo.arrow ?? false}
        surface={demo.surface ?? "default"}
      >
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>{demo.body ?? "Choose when Atlas tells you a run needs you."}</PopoverDescription>
        </PopoverHeader>
        <div class="flex items-center justify-between gap-3 pt-1">
          <span class="label">Desktop alerts</span>
          <Switch checked onCheckedChange={() => {}} aria-label="Desktop alerts" />
        </div>
      </PopoverContent>
    </Popover>
  </div>
{/snippet}

{#snippet commandOpenTrigger(props: Record<string, unknown>)}
  <Button variant="outline" {...props}>Open palette <Kbd>⌘K</Kbd></Button>
{/snippet}

{#snippet commandDemo(demo: CommandDemo)}
  <CommandDialog defaultOpen={demo.defaultOpen ?? false}>
    <CommandDialogTrigger child={commandOpenTrigger} />
    <CommandDialogPopup title="Command palette">
      <CommandInput
        placeholder="Type a command or search…"
        value={demo.query ?? ""}
        aria-label="Command"
        aria-controls="command-demo-list"
      />
      <CommandPanel id="command-demo-list" aria-label="Commands">
        {#if demo.empty}
          <CommandEmpty>No results for “{demo.query}”</CommandEmpty>
        {:else}
          <CommandGroupLabel>Actions</CommandGroupLabel>
          {#each COMMAND_ROWS as row, i (row.label)}
            <CommandItem active={i === (demo.active ?? 0)} disabled={(demo.disabledRow ?? false) && i === COMMAND_ROWS.length - 1}>
              <CommandItemIcon>
                <Icon icon={row.icon} size="lg" />
              </CommandItemIcon>
              {row.label}
              {#if row.shortcut}<CommandShortcut>{row.shortcut}</CommandShortcut>{/if}
              {#if row.submenu}<CommandSubmenuChevron />{/if}
            </CommandItem>
          {/each}
        {/if}
      </CommandPanel>
      <CommandFooter>
        <CommandFooterHint>
          <Kbd variant="soft">↑</Kbd>
          <Kbd variant="soft">↓</Kbd>
          Navigate
        </CommandFooterHint>
        <span class="flex items-center gap-4">
          <CommandFooterHint>
            <Kbd variant="soft">↵</Kbd>
            Select
          </CommandFooterHint>
          <CommandFooterHint>
            <Kbd variant="soft">Esc</Kbd>
            Close
          </CommandFooterHint>
        </span>
      </CommandFooter>
    </CommandDialogPopup>
  </CommandDialog>
{/snippet}

{#snippet inlinePicker(listbox: boolean)}
  <div class="flex w-[420px] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-md">
    <div role={listbox ? "listbox" : undefined} aria-label={listbox ? "Slash commands" : undefined} class="py-1">
      <CommandGroupLabel size="compact">Commands</CommandGroupLabel>
      {#each SLASH_ROWS as row, i (row.name)}
        <CommandItem size="compact" {listbox} active={i === 1} disabled={row.name === "login"}>
          <span class="min-w-20 shrink-0 font-mono text-foreground">/{row.name}</span>
          <span class="min-w-0 flex-1 truncate text-xs text-muted-foreground">{row.description}</span>
        </CommandItem>
      {/each}
    </div>
    <CommandFooter size="compact">
      <span class="flex items-center gap-1.5">
        <Kbd>↑↓</Kbd>
        navigate
        <Kbd>↵</Kbd>
        select
      </span>
      <span class="flex items-center gap-1.5">
        <Kbd>esc</Kbd>
        close
      </span>
    </CommandFooter>
  </div>
{/snippet}

{#snippet cpuIcon()}
  <Icon icon={Cpu} size="sm" />
{/snippet}

{#snippet contextDemo(disabledItem: boolean)}
  <ContextMenu>
    <ContextMenuTrigger
      data-testid="area"
      class="caption flex h-56 w-96 items-center justify-center rounded-md border border-dashed border-border-strong"
    >
      Right-click here
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuGroup>
        <ContextMenuLabel>src/ui/button.tsx</ContextMenuLabel>
        <ContextMenuItem>
          <FilePlus />
          New file
        </ContextMenuItem>
        <ContextMenuItem>
          <Pencil />
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled={disabledItem}>
          <Copy />
          Copy path
          <ContextMenuShortcut>⌥⌘C</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked>Show hidden files</ContextMenuCheckboxItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Open with</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Editor</ContextMenuItem>
          <ContextMenuItem>Terminal</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem>
        <Trash2 />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
{/snippet}

{#snippet selectBox()}
  <div class="min-h-56">
    <Select
      value={selectValue}
      onValueChange={(next) => (selectValue = next)}
      options={story === "select-long-text" ? SELECT_LONG : story === "select-empty" ? [] : SELECT_MODELS}
      disabled={story === "select-disabled"}
      placeholder={story === "select-placeholder"
        ? "Choose a model"
        : story === "select-empty"
          ? "Add someone…"
          : undefined}
      empty={story === "select-empty" ? "Everyone is already here." : undefined}
      id={story === "select-with-label" ? "story-model" : undefined}
      aria-label={story === "select-with-label"
        ? undefined
        : story === "select-empty"
          ? "Person to add"
          : "Model"}
      variant={story === "select-ghost" ? "ghost" : "bordered"}
      shape={story === "select-pill" ? "pill" : "default"}
      size={story === "select-small" ? "sm" : "md"}
      indicator={story !== "select-no-indicator"}
      class={story === "select-long-text" ? "max-w-48" : undefined}
      leading={story === "select-with-icon" ? cpuIcon : undefined}
    />
  </div>
{/snippet}

{#snippet selectScenario()}
  {#if story === "select-with-label"}
    <div class="flex min-h-56 flex-col items-start gap-1.5">
      <label for="story-model" class="text-xs font-medium">Model</label>
      {@render selectBox()}
    </div>
  {:else}
    {@render selectBox()}
  {/if}
{/snippet}

{#snippet sessionTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={MoreHorizontal} label="Session actions" />
{/snippet}

{#snippet dropdownDemo(demo: DropdownDemo)}
  <div class="min-h-80">
    <DropdownMenu defaultOpen={demo.defaultOpen ?? false}>
      <DropdownMenuTrigger child={sessionTrigger} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Session</DropdownMenuLabel>
          <DropdownMenuItem>
            <Pencil />
            {demo.longLabel ? "Rename this session and every fork made from it" : "Rename"}
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy />
            Copy link
            <DropdownMenuShortcut>⌘⇧C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={demo.disabledItem ?? false}>
            <Pin />
            Pin
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem defaultChecked>Show tool calls</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show thinking</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioGroup defaultValue="recent">
            <DropdownMenuRadioItem value="recent">Most recent</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Archive />
            Move to
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>atlas</DropdownMenuItem>
            <DropdownMenuItem>design</DropdownMenuItem>
            <DropdownMenuItem>server</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
{/snippet}

{#snippet slashList()}
  <div class="flex w-[280px] flex-col gap-1">
    <input
      aria-label="Note"
      aria-controls="slash-list"
      aria-activedescendant={`slash-${slashActive}`}
      value="/"
      class="rounded border border-border bg-transparent px-2 py-1 text-xs"
      onkeydown={(event) => {
        if (event.key === "ArrowDown") slashActive = (slashActive + 1) % SLASH.length;
        if (event.key === "ArrowUp") slashActive = (slashActive - 1 + SLASH.length) % SLASH.length;
      }}
    />
    <div
      id="slash-list"
      role="listbox"
      aria-label="Blocks"
      class={menuContentVariants({ motion: false })}
    >
      <div role="group" aria-labelledby="slash-basic">
        <div id="slash-basic" class={menuLabelVariants()}>Basic</div>
        {#each SLASH as item, i (item.label)}
          <div
            id={`slash-${i}`}
            role="option"
            aria-selected={i === slashActive}
            data-active={i === slashActive ? "" : undefined}
            class={menuItemVariants({ highlight: "active" })}
          >
            {item.label}
            <span class={menuShortcutVariants({ highlight: "active", className: "font-mono" })}>
              {item.kbd}
            </span>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/snippet}

{#snippet boldTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={Bold} label="Bold" />
{/snippet}

{#snippet italicTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={Italic} label="Italic" />
{/snippet}

{#snippet underlineTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={Underline} label="Underline" />
{/snippet}

{#snippet commandTrigger(props: Record<string, unknown>)}
  <IconButton {...props} icon={RefreshCw} label="Command palette" variant="outline" />
{/snippet}

{#if story === "color-picker-default"}
  {@render picker(pickerDefault, (next) => (pickerDefault = next))}
{:else if story === "color-picker-red"}
  {@render picker(pickerRed, (next) => (pickerRed = next))}
{:else if story === "color-picker-black"}
  {@render picker(pickerBlack, (next) => (pickerBlack = next))}
{:else if story === "color-hue-slider-alone"}
  <div class="w-64">
    <ColorHueSlider label="Hue" value={hueAlone} onChange={(next) => (hueAlone = next)} />
  </div>
{:else if story === "tooltip-default" || story === "tooltip-exit"}
  {@render tooltipDemo({ shortcut: "⌘R" })}
{:else if story === "tooltip-open"}
  {@render tooltipDemo({ open: true, shortcut: "⌘R" })}
{:else if story === "tooltip-open-below"}
  {@render tooltipDemo({ open: true, shortcut: "⌘R", side: "bottom" })}
{:else if story === "tooltip-long-text"}
  {@render tooltipDemo({
    open: true,
    label: "Refresh the list of pull requests waiting for your review across every attached project",
  })}
{:else if story === "tooltip-hint-row"}
  <TooltipProvider>
    <div class="flex gap-1">
      <Hint label="Bold" shortcut="⌘B">{#snippet child(props)}{@render boldTrigger(props)}{/snippet}</Hint>
      <Hint label="Italic" shortcut="⌘I">{#snippet child(props)}{@render italicTrigger(props)}{/snippet}</Hint>
      <Hint label="Underline" shortcut="⌘U">{#snippet child(props)}{@render underlineTrigger(props)}{/snippet}</Hint>
    </div>
  </TooltipProvider>
{:else if story === "command-default"}
  {@render commandDemo({})}
{:else if story === "command-open"}
  {@render commandDemo({ defaultOpen: true })}
{:else if story === "command-empty"}
  {@render commandDemo({ defaultOpen: true, empty: true, query: "deploy to prod" })}
{:else if story === "command-disabled-row"}
  {@render commandDemo({ defaultOpen: true, disabledRow: true })}
{:else if story === "command-compact"}
  {@render inlinePicker(true)}
{:else if story === "command-compact-without-roles"}
  {@render inlinePicker(false)}
{:else if story === "contextmenu-default" || story === "contextmenu-open" || story === "contextmenu-exit"}
  {@render contextDemo(false)}
{:else if story === "contextmenu-disabled-item"}
  {@render contextDemo(true)}
{:else if story.startsWith("select-")}
  {@render selectScenario()}
{:else if story === "dropdownmenu-default"}
  {@render dropdownDemo({})}
{:else if story === "dropdownmenu-open" || story === "dropdownmenu-icon-rows-align" || story === "dropdownmenu-exit"}
  {@render dropdownDemo({ defaultOpen: true })}
{:else if story === "dropdownmenu-disabled-item"}
  {@render dropdownDemo({ defaultOpen: true, disabledItem: true })}
{:else if story === "dropdownmenu-long-text"}
  {@render dropdownDemo({ defaultOpen: true, longLabel: true })}
{:else if story === "dropdownmenu-recipes"}
  {@render slashList()}
{:else if story === "popover-default"}
  {@render popoverDemo({})}
{:else if story === "popover-open" || story === "popover-exit"}
  {@render popoverDemo({ defaultOpen: true })}
{:else if story === "popover-with-arrow"}
  {@render popoverDemo({ defaultOpen: true, arrow: true })}
{:else if story === "popover-tinted"}
  {@render popoverDemo({ defaultOpen: true, surface: "tinted" })}
{:else if story === "popover-glass"}
  {@render popoverDemo({ defaultOpen: true, surface: "glass", backdrop: true })}
{:else if story === "popover-long-text"}
  {@render popoverDemo({ defaultOpen: true, body: POPOVER_LONG_TEXT })}
{:else if story === "tooltip-hint-keycaps"}
  <div class="flex min-h-40 items-center justify-center">
    <Hint label="Command palette" shortcut="⌘⇧P" side="top">
      {#snippet child(props)}{@render commandTrigger(props)}{/snippet}
    </Hint>
  </div>
{/if}
