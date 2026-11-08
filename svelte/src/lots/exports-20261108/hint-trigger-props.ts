// `hintTriggerProps`, ported from `ui/tooltip.tsx`: the props a hint's wrapped
// element takes. The tooltip does not name its trigger, so a string label
// becomes the `aria-label` unless the element already has a name, and the
// native `title` is dropped.

type TriggerProps = Record<string, unknown> & {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  disabled?: boolean;
};

export function hintTriggerProps(props: TriggerProps, label: unknown) {
  const named = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;
  return {
    title: undefined,
    "aria-label": named || typeof label !== "string" ? props["aria-label"] : label,
  };
}
