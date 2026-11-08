<script lang="ts">
  import { tick } from "svelte";
  import {
    BellGlyph,
    CopyGlyph,
    MenuGlyph,
    PlusMinusGlyph,
    RailGlyph,
    SendGlyph,
    TrashGlyph,
  } from "../../src/lots/f1-primitives-forms/animated-icon";
  import IconButton from "../../src/lots/f1-primitives-forms/icon-button.svelte";
  import Switch from "../../src/lots/f1-primitives-forms/switch.svelte";
  import Checkbox from "../../src/lots/f1-primitives-forms/checkbox.svelte";
  import Label from "../../src/lots/f1-primitives-forms/label.svelte";
  import {
    RadioGroup,
    RadioGroupItem,
    Toggle,
    ToggleGroup,
    ToggleGroupItem,
  } from "../../src/lots/f1-primitives-forms";
  import Input from "../../src/ui/input.svelte";
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
  } from "../../src/lots/f1-primitives-forms";
  import {
    ArrowUp,
    Copy,
    Filter,
    GitBranch,
    Minus,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Search,
    Settings,
    Share2,
    Trash2,
    WrapText,
    X,
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    CloudUpload,
    Columns2,
    GitCommitHorizontal,
    GitPullRequestArrow,
    Monitor,
    Moon,
    Pencil,
    Rows2,
    Sun,
  } from "lucide-svelte";
  import Hint from "../../src/ui/hint.svelte";
  import Icon from "../../src/ui/icon.svelte";
  import Kbd from "../../src/ui/kbd.svelte";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    Textarea,
  } from "../../src/lots/f1-primitives-forms";
  import {
    HintGroup,
    HintItem,
    ScrollArea,
    ScrollFade,
    useScrollEdges,
  } from "../../src/lots/f1-primitives-forms";
  import Segmented from "../../src/lots/f1-primitives-forms/segmented.svelte";
  import Slider from "../../src/lots/f1-primitives-forms/slider.svelte";
  import SplitButton from "../../src/lots/f1-primitives-forms/split-button.svelte";
  import SecretInput from "../../src/lots/f1-primitives-forms/secret-input.svelte";
  import MenuItem from "../../src/lots/f1-primitives-forms/deps/menu-item.svelte";
  import MenuSeparator from "../../src/lots/f1-primitives-forms/deps/menu-separator.svelte";
  import MenuShortcut from "../../src/lots/f1-primitives-forms/deps/menu-shortcut.svelte";

  interface Props {
    story?: string;
  }

  let { story = "off" }: Props = $props();

  const VARIANTS = [
    "ghost",
    "default",
    "secondary",
    "outline",
    "hairline",
    "destructive",
    "ghost-destructive",
    "floating",
  ] as const;
  const SIZES = ["2xs", "xs", "sm", "md", "lg"] as const;

  const RADIO_OPTIONS = [
    { value: "read", label: "Read-only" },
    { value: "ask", label: "Ask before writing" },
    { value: "write", label: "Read and write" },
  ];
  const RADIO_LONG_OPTIONS = [
    {
      value: "a",
      label: "Read every project attached to the session, including ones added later",
    },
    { value: "b", label: "Only the project the session started in" },
  ];
  const RADIO_MANY_OPTIONS = ["Fast", "Balanced", "Deep", "Custom", "Inherit from project", "Inherit from org"].map(
    (label) => ({ value: label, label }),
  );
  const TOGGLE_SIZES = ["sm", "default", "lg"] as const;

  const SEG_MODES = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ] as const;
  const SEG_LONG = [
    { value: "a", label: "Only this session" },
    { value: "b", label: "Every session in this project" },
    { value: "c", label: "Everywhere" },
  ] as const;

  const HINT_ACTIONS = [
    { icon: RefreshCw, label: "Refresh" },
    { icon: GitBranch, label: "Switch branch" },
    { icon: Copy, label: "Copy link" },
    { icon: Share2, label: "Share with team" },
    { icon: Trash2, label: "Delete" },
  ];
  const SCROLL_ROWS = Array.from(
    { length: 30 },
    (_, i) => `Session ${i + 1}: refactor the settings panel`,
  );

  let segDefaultValue = $state("dark");
  let segSmallValue = $state("dark");
  let segDisabledValue = $state("dark");
  let segNoSelectionValue = $state("custom");
  let segWithIconValue = $state<"split" | "unified">("split");
  let segIconOnlyValue = $state<"split" | "unified">("split");
  let segNodeLabelsValue = $state<"system" | "light" | "dark">("system");
  let segLongTextValue = $state<"a" | "b" | "c">("a");

  let sliderDefaultValue = $state(40);
  let sliderMinimumValue = $state(0);
  let sliderMaximumValue = $state(100);
  let sliderSteppedValue = $state(1);
  let sliderDisabledValue = $state(40);

  let splitWrap = $state<HTMLDivElement | null>(null);

  let sending = $state(false);
  let ringing = $state(false);

  let fadeRef = $state<HTMLDivElement | null>(null);
  const fadeRows = $derived(story === "scroll-fade-short-list" ? 4 : 30);
  const fadeEdges = useScrollEdges(
    () => fadeRef,
    () => fadeRows,
  );

  let switchOff = $state(false);
  let switchOn = $state(true);
  let switchMixedChecked = $state(false);
  let switchMixed = $state(true);
  let switchSmall = $state(true);
  let switchRow = $state(true);
  let checkOptions = $state({ thinking: true, web: false, plan: false });
  let webSwitch = $state<HTMLSpanElement | null>(null);

  /**
   * The `play` of the CheckAppearance story: click Web search, expect it on
   * with its check, click again, expect it off. Real clicks on the control.
   */
  async function playCheckAppearance(el: HTMLElement) {
    await tick();
    el.focus();
    el.click();
    await tick();
    if (el.getAttribute("aria-checked") !== "true") throw new Error("Web search did not turn on");
    el.click();
    await tick();
    if (el.getAttribute("aria-checked") !== "false") throw new Error("Web search did not turn off");
  }

  $effect(() => {
    const el = webSwitch;
    if (story !== "switch-check-appearance" || !el) return;
    void playCheckAppearance(el);
  });

  let inputGroupWrap = $state<HTMLDivElement | null>(null);

  /** The one-ring check of the InputGroup stories' `play`, past the border transition. */
  async function expectOneRing(input: HTMLInputElement) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const group = input.closest<HTMLElement>('[data-slot="input-group"]');
    if (!group) throw new Error("No input group around the input");
    const groupStyle = getComputedStyle(group);
    if (groupStyle.outlineStyle !== "solid") throw new Error("The group draws no ring");
    if (getComputedStyle(input).outlineStyle !== "none") throw new Error("The input draws a second ring");
    const rest = document.createElement("div");
    rest.className = "border border-border";
    document.body.append(rest);
    const restColor = getComputedStyle(rest).borderTopColor;
    rest.remove();
    if (groupStyle.borderTopColor !== restColor) throw new Error("The group border is not at rest");
  }

  async function playInputFocus(input: HTMLInputElement, byClick: boolean) {
    await tick();
    if (byClick) input.click();
    input.focus();
    if (document.activeElement !== input) throw new Error("The input does not have focus");
    await expectOneRing(input);
  }

  $effect(() => {
    const wrap = inputGroupWrap;
    if (!wrap) return;
    if (story !== "input-group-autofocused" && story !== "input-group-clicked") return;
    const input = wrap.querySelector("input");
    if (input) void playInputFocus(input, story === "input-group-clicked");
  });

  /**
   * The `play` of the SplitButton stories ends with a control focused, or with
   * the menu open: the same final state, without the interaction that a
   * screenshot cannot show.
   */
  $effect(() => {
    const wrap = splitWrap;
    if (!wrap) return;
    if (story === "splitbutton-default") {
      wrap.querySelector<HTMLElement>('[data-slot="split-button-menu"]')?.focus({ preventScroll: true });
    } else if (story === "splitbutton-disabled") {
      wrap
        .querySelector<HTMLElement>('[data-slot="split-button-primary"]')
        ?.focus({ preventScroll: true });
    } else if (story === "splitbutton-open") {
      wrap.querySelector<HTMLElement>('[data-slot="split-button-menu"]')?.click();
    }
  });
</script>

{#snippet searchGroup(placeholder: string, defaultValue: string | undefined, disabled: boolean, invalid: boolean, autofocus: boolean)}
  <div class="w-80" bind:this={inputGroupWrap}>
    <InputGroup data-disabled={disabled || undefined}>
      <InputGroupAddon>
        <Icon icon={Search} size="sm" />
      </InputGroupAddon>
      <InputGroupInput
        {placeholder}
        {defaultValue}
        {disabled}
        aria-invalid={invalid || undefined}
        {autofocus}
      />
      <InputGroupAddon align="inline-end">
        <Kbd text="⌘K" />
      </InputGroupAddon>
    </InputGroup>
  </div>
{/snippet}

{#snippet hintDemo(side: "top" | "bottom", disabledLast: boolean)}
  <div class={side === "top" ? "flex min-h-32 items-end" : "flex min-h-32 items-start"}>
    <HintGroup {side}>
      <div class="flex gap-1 rounded-md border border-border p-1">
        {#each HINT_ACTIONS as action, i (action.label)}
          <HintItem label={action.label}>
            <IconButton
              icon={action.icon}
              label={action.label}
              disabled={disabledLast && i === HINT_ACTIONS.length - 1}
            />
          </HintItem>
        {/each}
      </div>
    </HintGroup>
  </div>
{/snippet}

{#snippet fieldDemo(
  label: string,
  description: string | undefined,
  error: string | undefined,
  disabled: boolean,
  orientation: "vertical" | "horizontal" | "responsive",
)}
  <div class="w-80">
    <Field {orientation} data-invalid={!!error} data-disabled={disabled}>
      <FieldLabel for="name">{label}</FieldLabel>
      <Input id="name" defaultValue="Refactor settings" {disabled} aria-invalid={!!error} />
      {#if description}
        <FieldDescription>{description}</FieldDescription>
      {/if}
      {#if error}
        <FieldError>{error}</FieldError>
      {/if}
    </Field>
  </div>
{/snippet}

{#snippet gallery(on: boolean)}
  <div class="grid w-fit grid-cols-3 gap-2">
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <CopyGlyph copied={on} size="lg" />
      <span class="caption">CopyGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <TrashGlyph armed={on} size="lg" />
      <span class="caption">TrashGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <RailGlyph open={on} size="lg" />
      <span class="caption">RailGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <MenuGlyph active={on} size="lg" />
      <span class="caption">MenuGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <PlusMinusGlyph open={on} size="lg" />
      <span class="caption">PlusMinusGlyph</span>
    </div>
    <div class="flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3">
      <BellGlyph muted={on} size="lg" />
      <span class="caption">BellGlyph</span>
    </div>
  </div>
{/snippet}

{#snippet radioDemo(options: { value: string; label: string }[], disabled: boolean, invalid: boolean)}
  <RadioGroup defaultValue={options[0]?.value} {disabled} aria-label="Project access">
    {#each options as option (option.value)}
      <Label><RadioGroupItem value={option.value} aria-invalid={invalid || undefined} />{option.label}</Label>
    {/each}
  </RadioGroup>
{/snippet}

{#snippet alignGroup(
  variant: "default" | "outline",
  spacing: number,
  orientation: "horizontal" | "vertical" | undefined,
  disabled: boolean,
)}
  <ToggleGroup
    {variant}
    size="default"
    {spacing}
    {orientation}
    {disabled}
    defaultValue={["left"]}
    aria-label="Alignment"
  >
    <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Align centre"><AlignCenter /></ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>
  </ToggleGroup>
{/snippet}

{#snippet segColumns()}<Icon icon={Columns2} size="sm" />{/snippet}
{#snippet segRows()}<Icon icon={Rows2} size="sm" />{/snippet}
{#snippet segSystemLabel()}
  <span class="flex items-center gap-1.5"><Icon icon={Monitor} size="sm" />System <span
      class="text-muted-foreground">· dark</span
    ></span>
{/snippet}
{#snippet segLightLabel()}
  <span class="flex items-center gap-1.5"><Icon icon={Sun} size="sm" />Light</span>
{/snippet}
{#snippet segDarkLabel()}
  <span class="flex items-center gap-1.5"><Icon icon={Moon} size="sm" />Dark</span>
{/snippet}

{#snippet commitMenu()}
  <MenuItem>
    <GitCommitHorizontal />
    Commit
    <MenuShortcut>⌘↵</MenuShortcut>
  </MenuItem>
  <MenuItem>
    <CloudUpload />
    Commit &amp; push
  </MenuItem>
  <MenuItem disabled title="No remote to open a pull request on">
    <GitPullRequestArrow />
    Commit, push &amp; PR
  </MenuItem>
  <MenuSeparator />
  <MenuItem>
    <Pencil />
    Edit pull request…
  </MenuItem>
{/snippet}

{#if story === "off"}
  {@render gallery(false)}
{:else if story === "on"}
  {@render gallery(true)}
{:else if story === "one-shots"}
  <div class="flex gap-3">
    <button
      type="button"
      class="label flex items-center gap-2 rounded border border-border px-3 py-1.5 hover:bg-element-hover"
      onclick={() => (sending = true)}
    >
      <SendGlyph {sending} onAnimationEnd={() => (sending = false)} />
      Send
    </button>
    <button
      type="button"
      class="label flex items-center gap-2 rounded border border-border px-3 py-1.5 hover:bg-element-hover"
      onclick={() => (ringing = true)}
    >
      <BellGlyph {ringing} onAnimationEnd={() => (ringing = false)} />
      Ring
    </button>
  </div>
{:else if story === "default"}
  <IconButton icon={Settings} label="Settings" />
{:else if story === "variants"}
  <div class="flex items-center gap-2">
    {#each VARIANTS as variant (variant)}
      <IconButton icon={Settings} label={variant} {variant} />
    {/each}
  </div>
{:else if story === "sizes"}
  <div class="flex items-center gap-2">
    {#each SIZES as size (size)}
      <IconButton icon={Settings} label={`Size ${size}`} {size} />
    {/each}
  </div>
{:else if story === "ghost-destructive"}
  <IconButton icon={Trash2} label="Delete" variant="ghost-destructive" />
{:else if story === "active"}
  <IconButton icon={Filter} label="Filter" active />
{:else if story === "pressed"}
  <IconButton icon={Settings} label="Settings" aria-pressed={true} />
{:else if story === "round-stepper"}
  <div class="flex items-center gap-2">
    <IconButton icon={Minus} label="Smaller" shape="round" variant="outline" />
    <span class="label tnum w-10 text-center">100%</span>
    <IconButton icon={Plus} label="Larger" shape="round" variant="outline" />
  </div>
{:else if story === "disabled"}
  <div class="flex items-center gap-2">
    <IconButton icon={RefreshCw} label="Refresh" disabled />
    <Hint label="Nothing to refresh yet" wrap>
      <IconButton icon={RefreshCw} label="Refresh" disabled />
    </Hint>
    <Hint label="Nothing to refresh yet" wrap>
      <IconButton icon={RefreshCw} label="Refresh" disabled focusableWhenDisabled />
    </Hint>
  </div>
{:else if story === "with-hint"}
  <div class="flex items-center gap-1">
    <Hint label="More actions">
      <IconButton icon={MoreHorizontal} label="More actions" />
    </Hint>
    <Hint label="Close" shortcut="Esc">
      <IconButton icon={X} label="Close" />
    </Hint>
  </div>
{:else if story === "element-icon"}
  <div class="flex items-center gap-1">
    <IconButton label="Refreshing" size="xs">
      <Icon icon={RefreshCw} size="xs" class="animate-spin" />
    </IconButton>
    <IconButton label="Show sidebar" size="xs" aria-pressed={true}>
      <RailGlyph open size="xs" />
    </IconButton>
  </div>
{:else if story === "tile-remove"}
  <div class="relative size-16 rounded-lg border border-border bg-muted">
    <IconButton
      icon={X}
      label="Remove image"
      size="2xs"
      shape="round"
      variant="outline"
      class="absolute -top-1.5 -right-1.5"
    />
  </div>
{:else if story === "floating"}
  <div
    class="relative size-16 rounded-lg border border-border bg-linear-to-br from-primary to-success"
  >
    <IconButton
      icon={X}
      label="Remove image"
      size="2xs"
      shape="round"
      variant="floating"
      class="absolute -top-1.5 -right-1.5"
    />
  </div>
{:else if story === "loading"}
  <div class="flex items-center gap-1">
    <IconButton icon={RefreshCw} label="Refresh models" size="xs" loading />
    <IconButton label="Sync" size="xs" loading>
      <RailGlyph open size="xs" />
    </IconButton>
    <IconButton icon={RefreshCw} label="Refresh models, idle" size="xs" loading={false} />
  </div>
{:else if story === "hint-default"}
  {@render hintDemo("bottom", false)}
{:else if story === "hint-opens-upward"}
  {@render hintDemo("top", false)}
{:else if story === "hint-with-disabled"}
  {@render hintDemo("bottom", true)}
{:else if story === "scroll-area-default"}
  <ScrollArea
    role="region"
    aria-label="Sessions"
    tabindex={0}
    class="h-48 w-72 rounded-md border border-border"
  >
    {#each SCROLL_ROWS as row (row)}
      <div class="label border-b border-border-subtle px-3 py-1.5">{row}</div>
    {/each}
  </ScrollArea>
{:else if story === "scroll-area-empty"}
  <ScrollArea class="flex h-48 w-72 items-center justify-center rounded-md border border-border">
    <span class="caption">No sessions yet</span>
  </ScrollArea>
{:else if story === "scroll-fade-default" || story === "scroll-fade-short-list"}
  <div class="relative w-72 overflow-hidden rounded-md border border-border bg-card">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      bind:this={fadeRef}
      role="region"
      aria-label="Rows"
      tabindex={0}
      class="h-56 overflow-auto"
    >
      {#each Array.from({ length: fadeRows }, (_, i) => i) as index (index)}
        <div class="label border-b border-border-subtle px-3 py-1.5">Row {index + 1}</div>
      {/each}
    </div>
    <ScrollFade at="top" visible={fadeEdges.top} class="from-card" />
    <ScrollFade at="bottom" visible={fadeEdges.bottom} class="from-card" />
  </div>
{:else if story === "switch-off"}
  <Switch
    checked={switchOff}
    onCheckedChange={(next) => (switchOff = next)}
    aria-label="Share telemetry"
  />
{:else if story === "switch-on"}
  <Switch checked={switchOn} onCheckedChange={(next) => (switchOn = next)} aria-label="Share telemetry" />
{:else if story === "switch-mixed"}
  <Switch
    checked={switchMixedChecked}
    mixed={switchMixed}
    onCheckedChange={(next) => {
      switchMixed = false;
      switchMixedChecked = next;
    }}
    aria-label="Share telemetry"
  />
{:else if story === "switch-small"}
  <Switch
    checked={switchSmall}
    size="sm"
    onCheckedChange={(next) => (switchSmall = next)}
    aria-label="Share telemetry"
  />
{:else if story === "switch-disabled"}
  <Switch checked disabled aria-label="Share telemetry" onCheckedChange={() => {}} />
{:else if story === "switch-check-appearance"}
  <div class="w-64 rounded-lg border border-border bg-popover p-1">
    <Switch
      appearance="check"
      checked={checkOptions.thinking}
      onCheckedChange={(thinking) => (checkOptions = { ...checkOptions, thinking })}
      description="Think before answering; slower, more careful."
    >
      Extended thinking
    </Switch>
    <Switch
      bind:ref={webSwitch}
      appearance="check"
      checked={checkOptions.web}
      onCheckedChange={(web) => (checkOptions = { ...checkOptions, web })}
      description="Let the agent fetch pages it cites."
    >
      Web search
    </Switch>
    <Switch
      appearance="check"
      checked={checkOptions.plan}
      onCheckedChange={(plan) => (checkOptions = { ...checkOptions, plan })}
    >
      Plan first
    </Switch>
  </div>
{:else if story === "switch-in-a-settings-row"}
  <div class="flex w-96 items-center justify-between gap-4 rounded-md border border-border p-3">
    <div class="flex flex-col gap-0.5">
      <span class="label">Share telemetry</span>
      <span class="caption">Coarse usage counts. Never prompts, paths or code.</span>
    </div>
    <Switch checked={switchRow} onCheckedChange={(next) => (switchRow = next)} aria-label="Share telemetry" />
  </div>
{:else if story === "checkbox-default"}
  <Label>
    <Checkbox />Show tool calls
  </Label>
{:else if story === "checkbox-checked"}
  <Label>
    <Checkbox defaultChecked />Show tool calls
  </Label>
{:else if story === "checkbox-indeterminate"}
  <Label>
    <Checkbox indeterminate />Show tool calls
  </Label>
{:else if story === "checkbox-disabled"}
  <div class="flex flex-col gap-2">
    <Label>
      <Checkbox disabled />Unchecked
    </Label>
    <Label>
      <Checkbox disabled defaultChecked />Checked
    </Label>
  </div>
{:else if story === "checkbox-error-state"}
  <Label>
    <Checkbox aria-invalid={true} />Show tool calls
  </Label>
{:else if story === "checkbox-long-text"}
  <div class="w-64">
    <Label class="items-start">
      <Checkbox class="mt-px" />Let the agent read every project attached to this session, including
      ones added later
    </Label>
  </div>
{:else if story === "checkbox-many-items"}
  <div class="flex flex-col gap-2">
    {#each ["Tool calls", "Thinking", "Diffs", "Checkpoints", "Costs", "Timestamps"] as item, i (item)}
      <Label>
        <Checkbox defaultChecked={i % 2 === 0} />{item}
      </Label>
    {/each}
  </div>
{:else if story === "label-default"}
  <Label>Session name</Label>
{:else if story === "label-with-input"}
  <div class="flex w-64 flex-col gap-1.5">
    <Label for="label-input">Session name</Label>
    <Input id="label-input" placeholder="Refactor settings" />
  </div>
{:else if story === "label-with-checkbox"}
  <Label>
    <Checkbox defaultChecked />Show tool calls
  </Label>
{:else if story === "label-disabled"}
  <div data-disabled="true" class="group">
    <Label>
      <Checkbox disabled />Share with team
    </Label>
  </div>
{:else if story === "label-long-text"}
  <Label class="w-48">Allow this agent to read every project attached to the session</Label>
{:else if story === "field-default"}
  {@render fieldDemo("Session name", "Shows in the sidebar and in shared links.", undefined, false, "vertical")}
{:else if story === "field-disabled"}
  {@render fieldDemo("Session name", "Shows in the sidebar and in shared links.", undefined, true, "vertical")}
{:else if story === "field-error-state"}
  {@render fieldDemo("Session name", "Shows in the sidebar and in shared links.", "A session name can't be empty.", false, "vertical")}
{:else if story === "field-long-text"}
  {@render fieldDemo(
    "The name everyone in the organisation sees for this session",
    "Shows in the sidebar, in shared links, in search, and in the weekly digest. Renaming a session does not break links that were already shared.",
    "A session with this name already exists in the project. Pick another name.",
    false,
    "vertical",
  )}
{:else if story === "field-horizontal"}
  <div class="w-80">
    <Field orientation="horizontal">
      <Checkbox id="share" defaultChecked />
      <FieldContent>
        <FieldLabel for="share">Share with the team</FieldLabel>
        <FieldDescription>Everyone in Acme can read it.</FieldDescription>
      </FieldContent>
    </Field>
  </div>
{:else if story === "field-form"}
  <form class="w-96" onsubmit={(event) => event.preventDefault()}>
    <FieldSet>
      <FieldLegend>Profile</FieldLegend>
      <FieldDescription>How teammates see you.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel for="f-name">Name</FieldLabel>
          <Input id="f-name" defaultValue="Ada Lovelace" />
        </Field>
        <Field data-invalid={true}>
          <FieldLabel for="f-email">Email</FieldLabel>
          <Input id="f-email" defaultValue="ada@" aria-invalid={true} />
          <FieldError errors={[{ message: "Enter a full email address." }]} />
        </Field>
        <FieldSeparator>Notifications</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="f-mentions" defaultChecked />
          <FieldLabel for="f-mentions">Mentions</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="f-digest" />
          <FieldLabel for="f-digest">Weekly digest</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  </form>
{:else if story === "field-choice-card"}
  <div class="flex w-96 flex-col gap-2">
    {#each [{ id: "c-private", title: "Private", body: "Only you can open it.", checked: true }, { id: "c-shared", title: "Shared", body: "Everyone in Acme can read it.", checked: false }] as c (c.id)}
      <FieldLabel for={c.id}>
        <Field orientation="horizontal">
          <Checkbox id={c.id} defaultChecked={c.checked} />
          <FieldContent>
            <FieldTitle>{c.title}</FieldTitle>
            <FieldDescription>{c.body}</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    {/each}
  </div>
{:else if story === "field-many-errors"}
  <div class="w-80">
    <Field data-invalid={true}>
      <FieldLabel for="pw">Key</FieldLabel>
      <Input id="pw" defaultValue="sk-" aria-invalid={true} />
      <FieldError
        errors={[
          { message: "Keys are at least 40 characters." },
          { message: "This key was revoked." },
          { message: "Keys are at least 40 characters." },
        ]}
      />
    </Field>
  </div>
{:else if story === "input-group-default"}
  {@render searchGroup("Search sessions", undefined, false, false, false)}
{:else if story === "input-group-disabled"}
  {@render searchGroup("Search sessions", undefined, true, false, false)}
{:else if story === "input-group-autofocused"}
  {@render searchGroup("Search sessions", undefined, false, false, true)}
{:else if story === "input-group-clicked"}
  {@render searchGroup("Search sessions", undefined, false, false, false)}
{:else if story === "input-group-error"}
  {@render searchGroup("Search sessions", "status:unknown", false, true, false)}
{:else if story === "input-group-long-text"}
  {@render searchGroup(
    "Search sessions",
    "sessions where the agent touched src/features/settings and the run failed after a checkpoint",
    false,
    false,
    false,
  )}
{:else if story === "input-group-with-button"}
  <div class="w-80">
    <InputGroup>
      <InputGroupInput readonly defaultValue="https://atlas.dev/s/7f3a9c" aria-label="Link" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Copy">
          <Copy />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
{:else if story === "input-group-with-text"}
  <div class="w-80">
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput defaultValue="atlas.dev" aria-label="Domain" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Clear">
          <X />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
{:else if story === "input-group-textarea"}
  <div class="w-96">
    <InputGroup>
      <InputGroupTextarea placeholder="Ask the agent to…" aria-label="Message" />
      <InputGroupAddon align="block-end">
        <InputGroupText>Balanced · 3 projects</InputGroupText>
        <InputGroupButton variant="default" size="icon-xs" class="ml-auto" aria-label="Send">
          <ArrowUp />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
{:else if story === "textarea-default"}
  <div class="w-80">
    <Textarea placeholder="Describe what the agent should do" />
  </div>
{:else if story === "textarea-disabled"}
  <div class="w-80">
    <Textarea placeholder="Describe what the agent should do" disabled defaultValue="Locked while the run is going" />
  </div>
{:else if story === "textarea-error"}
  <div class="w-80">
    <Textarea placeholder="Describe what the agent should do" aria-invalid={true} defaultValue="" />
  </div>
{:else if story === "textarea-long-text"}
  <div class="w-80">
    <Textarea
      placeholder="Describe what the agent should do"
      defaultValue="Refactor the settings panel so every row reads from one store selector. Keep the existing keyboard shortcuts, and don't touch the theme editor — it has its own store. Run the contract suites before you finish, and leave a checkpoint after each file you change so I can roll back one step at a time."
    />
  </div>
{:else if story === "radiogroup-default"}
  {@render radioDemo(RADIO_OPTIONS, false, false)}
{:else if story === "radiogroup-disabled"}
  {@render radioDemo(RADIO_OPTIONS, true, false)}
{:else if story === "radiogroup-error"}
  {@render radioDemo(RADIO_OPTIONS, false, true)}
{:else if story === "radiogroup-long-text"}
  <div class="w-64">
    {@render radioDemo(RADIO_LONG_OPTIONS, false, false)}
  </div>
{:else if story === "radiogroup-many-items"}
  {@render radioDemo(RADIO_MANY_OPTIONS, false, false)}
{:else if story === "toggle-default"}
  <Toggle>Wrap lines</Toggle>
{:else if story === "toggle-pressed"}
  <Toggle defaultPressed>Wrap lines</Toggle>
{:else if story === "toggle-outline"}
  <Toggle variant="outline">Wrap lines</Toggle>
{:else if story === "toggle-disabled"}
  <Toggle disabled>Wrap lines</Toggle>
{:else if story === "toggle-with-icon"}
  <Toggle defaultPressed><WrapText />Wrap lines</Toggle>
{:else if story === "toggle-sizes"}
  <div class="flex items-center gap-2">
    {#each TOGGLE_SIZES as size (size)}
      <Toggle {size} variant="outline" aria-label="Bold"><Bold /></Toggle>
    {/each}
    <Toggle variant="outline" aria-label="Italic" defaultPressed><Italic /></Toggle>
  </div>
{:else if story === "toggle-long-text"}
  <Toggle>Show every tool call the agent made, including the hidden ones</Toggle>
{:else if story === "togglegroup-default"}
  {@render alignGroup("default", 2, undefined, false)}
{:else if story === "togglegroup-outline"}
  {@render alignGroup("outline", 2, undefined, false)}
{:else if story === "togglegroup-joined"}
  {@render alignGroup("outline", 0, undefined, false)}
{:else if story === "togglegroup-vertical"}
  {@render alignGroup("default", 2, "vertical", false)}
{:else if story === "togglegroup-disabled"}
  {@render alignGroup("default", 2, undefined, true)}
{:else if story === "togglegroup-multiple"}
  <ToggleGroup multiple variant="outline" defaultValue={["bold", "italic"]} aria-label="Format">
    <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
  </ToggleGroup>
{:else if story === "togglegroup-with-text"}
  <ToggleGroup variant="outline" spacing={0} defaultValue={["7d"]} aria-label="Range">
    {#each ["1d", "7d", "30d", "90d", "All time"] as range (range)}
      <ToggleGroupItem value={range}>{range}</ToggleGroupItem>
    {/each}
  </ToggleGroup>
{:else if story === "segmented-default"}
  <Segmented
    value={segDefaultValue}
    onValueChange={(next) => (segDefaultValue = next)}
    options={SEG_MODES}
    aria-label="Appearance"
  />
{:else if story === "segmented-small"}
  <Segmented
    value={segSmallValue}
    onValueChange={(next) => (segSmallValue = next)}
    options={SEG_MODES}
    size="sm"
    aria-label="Appearance"
  />
{:else if story === "segmented-disabled"}
  <Segmented
    value={segDisabledValue}
    onValueChange={(next) => (segDisabledValue = next)}
    options={SEG_MODES}
    disabled
    aria-label="Appearance"
  />
{:else if story === "segmented-no-selection"}
  <Segmented
    value={segNoSelectionValue}
    onValueChange={(next) => (segNoSelectionValue = next)}
    options={SEG_MODES}
    aria-label="Appearance"
  />
{:else if story === "segmented-with-icon"}
  <Segmented
    value={segWithIconValue}
    onValueChange={(next) => (segWithIconValue = next)}
    options={[
      { value: "split", label: "Split", icon: segColumns },
      { value: "unified", label: "Unified", icon: segRows },
    ]}
    aria-label="Diff layout"
  />
{:else if story === "segmented-icon-only"}
  <Segmented
    value={segIconOnlyValue}
    onValueChange={(next) => (segIconOnlyValue = next)}
    options={[
      { value: "split", label: "Split", icon: segColumns, iconOnly: true },
      { value: "unified", label: "Unified", icon: segRows, iconOnly: true },
    ]}
    aria-label="Diff layout"
  />
{:else if story === "segmented-node-labels"}
  <Segmented
    value={segNodeLabelsValue}
    onValueChange={(next) => (segNodeLabelsValue = next)}
    options={[
      { value: "system", ariaLabel: "System", label: segSystemLabel },
      { value: "light", label: segLightLabel },
      { value: "dark", label: segDarkLabel },
    ]}
    aria-label="Appearance"
  />
{:else if story === "segmented-long-text"}
  <Segmented
    value={segLongTextValue}
    onValueChange={(next) => (segLongTextValue = next)}
    options={SEG_LONG}
    aria-label="Scope"
  />
{:else if story === "slider-default"}
  <div class="flex w-72 items-center gap-3">
    <Slider
      value={sliderDefaultValue}
      min={0}
      max={100}
      step={1}
      onValueChange={(next) => (sliderDefaultValue = next)}
      onValueCommitted={() => {}}
      aria-label="Volume"
    />
    <span class="label tnum w-8 text-right">{sliderDefaultValue}</span>
  </div>
{:else if story === "slider-minimum"}
  <div class="flex w-72 items-center gap-3">
    <Slider
      value={sliderMinimumValue}
      min={0}
      max={100}
      step={1}
      onValueChange={(next) => (sliderMinimumValue = next)}
      onValueCommitted={() => {}}
      aria-label="Volume"
    />
    <span class="label tnum w-8 text-right">{sliderMinimumValue}</span>
  </div>
{:else if story === "slider-maximum"}
  <div class="flex w-72 items-center gap-3">
    <Slider
      value={sliderMaximumValue}
      min={0}
      max={100}
      step={1}
      onValueChange={(next) => (sliderMaximumValue = next)}
      onValueCommitted={() => {}}
      aria-label="Volume"
    />
    <span class="label tnum w-8 text-right">{sliderMaximumValue}</span>
  </div>
{:else if story === "slider-stepped"}
  <div class="flex w-72 items-center gap-3">
    <Slider
      value={sliderSteppedValue}
      min={0.5}
      max={2}
      step={0.1}
      onValueChange={(next) => (sliderSteppedValue = next)}
      onValueCommitted={() => {}}
      aria-label="Volume"
    />
    <span class="label tnum w-8 text-right">{sliderSteppedValue}</span>
  </div>
{:else if story === "slider-disabled"}
  <div class="flex w-72 items-center gap-3">
    <Slider
      value={sliderDisabledValue}
      min={0}
      max={100}
      step={1}
      disabled
      onValueChange={(next) => (sliderDisabledValue = next)}
      onValueCommitted={() => {}}
      aria-label="Volume"
    />
    <span class="label tnum w-8 text-right">{sliderDisabledValue}</span>
  </div>
{:else if story === "splitbutton-default"}
  <div class="flex min-h-72 items-start justify-end p-4" bind:this={splitWrap}>
    <SplitButton
      label="Commit actions"
      menuLabel="More commit actions"
      icon={GitCommitHorizontal}
      onclick={() => {}}
    >
      Commit
      {#snippet menu()}{@render commitMenu()}{/snippet}
    </SplitButton>
  </div>
{:else if story === "splitbutton-busy"}
  <div class="flex min-h-72 items-start justify-end p-4">
    <SplitButton
      label="Commit actions"
      menuLabel="More commit actions"
      icon={GitCommitHorizontal}
      onclick={() => {}}
      busy
    >
      Commit
      {#snippet busyLabel()}Pushing…{/snippet}
      {#snippet menu()}{@render commitMenu()}{/snippet}
    </SplitButton>
  </div>
{:else if story === "splitbutton-disabled"}
  <div class="flex min-h-72 items-start justify-end p-4" bind:this={splitWrap}>
    <SplitButton
      label="Commit actions"
      menuLabel="More commit actions"
      icon={GitCommitHorizontal}
      onclick={() => {}}
      disabledReason="Nothing staged"
    >
      Commit
      {#snippet menu()}{@render commitMenu()}{/snippet}
    </SplitButton>
  </div>
{:else if story === "splitbutton-open"}
  <div class="flex min-h-72 items-start justify-end p-4" bind:this={splitWrap}>
    <SplitButton
      label="Commit actions"
      menuLabel="More commit actions"
      icon={GitCommitHorizontal}
      onclick={() => {}}
    >
      Commit
      {#snippet menu()}{@render commitMenu()}{/snippet}
    </SplitButton>
  </div>
{:else if story === "secretinput-empty"}
  <div class="w-72">
    <SecretInput onCommit={() => {}} />
  </div>
{:else if story === "secretinput-configured"}
  <div class="w-72">
    <SecretInput configured onCommit={() => {}} />
  </div>
{:else if story === "secretinput-custom-placeholder"}
  <div class="w-72">
    <SecretInput placeholder="sk-…" onCommit={() => {}} />
  </div>
{:else if story === "secretinput-disabled"}
  <div class="w-72">
    <SecretInput disabled configured onCommit={() => {}} />
  </div>
{:else if story === "secretinput-invalid"}
  <div class="w-72">
    <SecretInput aria-invalid={true} onCommit={() => {}} />
  </div>

{/if}
