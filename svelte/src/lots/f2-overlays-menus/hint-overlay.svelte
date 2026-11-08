<script lang="ts">
  import { untrack } from "svelte";
  import Kbd from "../../ui/kbd.svelte";
  import { portal } from "./portal";
  import {
    HINT_ALPHABET,
    HINT_OVERLAY_ATTR,
    activateHintTarget,
    generateHintLabels,
    scanHintTargets,
    type HintTarget,
  } from "./hint-targets";

  /**
   * Hint mode: a keycap over every clickable thing on screen; type its letters to
   * click it, or hold ⌥ to focus it instead. Ported from `hint-overlay.tsx`: while
   * open it owns the keyboard (a capture-phase listener stops every key before the
   * app sees it), and `ignoreKey` lets one through (the host's own trigger). Nothing
   * animates: hint mode is a keyboard action used many times a day.
   */
  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Where to look for targets; the whole document by default. */
    root?: ParentNode | null;
    /** The label letters, easiest first. */
    alphabet?: string;
    /** True lets the key through untouched (the host's own trigger). */
    ignoreKey?: (event: KeyboardEvent) => boolean;
    /** After a target was activated: clicked, or focused (⌥ held, or a field). */
    onActivate?: (element: HTMLElement, mode: "click" | "focus") => void;
    /** The focus modifier's glyph in the legend; "Alt" off macOS. */
    focusKeyLabel?: string;
  }

  let {
    open,
    onOpenChange,
    root = null,
    alphabet = HINT_ALPHABET,
    ignoreKey,
    onActivate,
    focusKeyLabel = "⌥",
  }: Props = $props();

  // The badges' frosted recipe, as `ui/hud.ts`: the lot keeps it here until that
  // module lands in the shared primitives.
  const HUD = "glass-hud backdrop-blur-glass bg-gradient-to-b from-popover/85 to-card/90";
  const STEP = 120;

  let targets = $state<HintTarget[]>([]);
  let labels = $state<string[]>([]);
  let typed = $state("");

  /** A letter from the physical key, so ⌥ (which turns `f` into `ƒ`) and non-US layouts still type the label's letters. */
  function charFromEvent(event: KeyboardEvent): string | null {
    if (/^Key[A-Z]$/.test(event.code)) return event.code.slice(3).toLowerCase();
    if (/^Digit[0-9]$/.test(event.code)) return event.code.slice(5);
    if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) return event.key.toLowerCase();
    return null;
  }

  // Scan and label on open, before paint, so the keycaps arrive with the overlay;
  // clear on close.
  $effect.pre(() => {
    const isOpen = open;
    const scope = root;
    const alpha = alphabet;
    untrack(() => {
      if (!isOpen) {
        targets = [];
        labels = [];
        typed = "";
        return;
      }
      const found = scanHintTargets(scope ?? document);
      targets = found;
      labels = generateHintLabels(found.length, alpha);
      typed = "";
    });
  });

  // Re-measure on scroll and resize, once a frame, so the keycaps follow.
  $effect(() => {
    if (!open) return;
    let frame = 0;
    const remeasure = () => {
      targets = targets.map((t) => ({ el: t.el, rect: t.el.getBoundingClientRect() }));
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        remeasure();
      });
    };
    // Capture, because scroll events from inner containers don't bubble.
    window.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
    };
  });

  /** ↑/↓/PgUp/PgDn scroll whatever scrolls under the viewport's centre. */
  function scrollActive(dy: number) {
    let node = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2) as HTMLElement | null;
    while (node && node !== document.body) {
      const style = getComputedStyle(node);
      if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) {
        node.scrollBy({ top: dy });
        return;
      }
      node = node.parentElement;
    }
    window.scrollBy({ top: dy });
  }

  $effect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (ignoreKey?.(event)) return;
      event.preventDefault();
      event.stopImmediatePropagation();

      if (event.key === "Escape") return onOpenChange(false);
      if (event.key === "Backspace") {
        typed = typed.slice(0, -1);
        return;
      }
      if (event.key === "ArrowDown") return scrollActive(STEP);
      if (event.key === "ArrowUp") return scrollActive(-STEP);
      if (event.key === "PageDown") return scrollActive(window.innerHeight * 0.9);
      if (event.key === "PageUp") return scrollActive(-window.innerHeight * 0.9);

      const character = charFromEvent(event);
      if (!character) return;
      const next = typed + character;
      const matches: number[] = [];
      labels.forEach((label, i) => {
        if (label.startsWith(next)) matches.push(i);
      });
      if (matches.length === 0) return; // A dead end: ignore the key.
      if (matches.length === 1) {
        const target = targets[matches[0]!];
        onOpenChange(false);
        if (target) {
          activateHintTarget(target.el, { focusOnly: event.altKey });
          onActivate?.(target.el, event.altKey ? "focus" : "click");
        }
        return;
      }
      typed = next;
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  });
</script>

{#if open}
  <div use:portal>
    <div {...{ [HINT_OVERLAY_ATTR]: "" }} class="pointer-events-none fixed inset-0 z-drag overflow-hidden">
      {#each targets as target, i (i)}
        {@const label = labels[i]}
        {#if label && !(typed && !label.startsWith(typed))}
          <span
            data-hint-label={label}
            class={`absolute inline-flex h-4 items-center rounded-full px-1.5 font-sans text-2xs font-semibold uppercase tracking-wide text-foreground ${HUD}`}
            style="left: {Math.max(0, target.rect.left)}px; top: {Math.max(0, target.rect.top)}px; transform: translate(-2px, -2px);"
          >{#if typed}<span class="text-muted-foreground">{label.slice(0, typed.length)}</span>{/if}<span>{label.slice(typed.length)}</span></span>
        {/if}
      {/each}

      <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div class={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 ${HUD}`}>
          <span class="font-mono text-sm text-foreground">
            {#if typed}
              <span class="tracking-widest">{typed.toUpperCase()}</span>
            {:else}
              <span class="text-muted-foreground">{targets.length} targets — type the letters</span>
            {/if}
          </span>
          <span class="flex items-center gap-1.5 text-2xs text-muted-foreground">
            <Kbd>{focusKeyLabel}</Kbd> focus
            <Kbd>esc</Kbd> close
          </span>
        </div>
      </div>
    </div>
  </div>
{/if}
