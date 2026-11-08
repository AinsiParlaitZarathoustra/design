<script lang="ts" module>
  import type { HTMLInputAttributes } from "svelte/elements";

  /**
   * Props of a `SecretInput` (`src/ui/secret-input.tsx`): an `Input` whose
   * draft is handed to `onCommit`, without the field's own value props.
   */
  export interface SecretInputProps
    extends Omit<
      HTMLInputAttributes,
      | "class"
      | "size"
      | "type"
      | "value"
      | "defaultValue"
      | "onchange"
      | "oninput"
      | "onblur"
      | "onkeydown"
    > {
    configured?: boolean;
    onCommit: (value: string) => void;
    size?: "xs" | "sm" | "md" | "lg";
    class?: string;
    oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
    onblur?: (event: FocusEvent) => void;
    onkeydown?: (event: KeyboardEvent) => void;
  }
</script>

<script lang="ts">
  import Input from "../../ui/input.svelte";

  /**
   * A masked field for a secret that is already stored somewhere else, ported
   * from `SecretInput` in `src/ui/secret-input.tsx`.
   *
   * It never holds the stored value: the field is always the replacement draft,
   * and `configured` only changes the placeholder to say one exists. A draft is
   * handed to `onCommit` on Enter or when the field loses focus, then cleared;
   * Escape drops it. An empty draft commits nothing, so tabbing through a row
   * can't erase a key.
   */

  let {
    configured = false,
    placeholder,
    onCommit,
    onblur,
    onkeydown,
    oninput,
    ...props
  }: SecretInputProps = $props();

  let draft = $state("");

  function commit() {
    const value = draft.trim();
    if (!value) return;
    draft = "";
    onCommit(value);
  }
</script>

<Input
  {...props}
  type="password"
  autocomplete="off"
  spellcheck={false}
  value={draft}
  placeholder={configured ? "Stored. Type to replace" : (placeholder ?? "Not set")}
  oninput={(event) => {
    draft = event.currentTarget.value;
    oninput?.(event);
  }}
  onblur={(event) => {
    commit();
    onblur?.(event);
  }}
  onkeydown={(event) => {
    if (event.key === "Enter") commit();
    if (event.key === "Escape" && draft) {
      event.preventDefault();
      event.stopPropagation();
      draft = "";
    }
    onkeydown?.(event);
  }}
/>
