/**
 * While a modal is open, hides the rest of the page from assistive tech, as Base
 * UI's focus manager does for a modal popup: every other child of `<body>` gets
 * `aria-hidden="true"`. The layer holding `element` (its ancestor directly under
 * `<body>`) stays exposed. Returns the undo, which restores only what it hid.
 */
export function hideOthers(element: Element): () => void {
  let layer: Element = element;
  while (layer.parentElement && layer.parentElement !== document.body) layer = layer.parentElement;
  const hidden: Element[] = [];
  for (const child of Array.from(document.body.children)) {
    if (child === layer || child.tagName === "SCRIPT" || child.tagName === "STYLE") continue;
    if (child.getAttribute("aria-hidden") === "true") continue;
    child.setAttribute("aria-hidden", "true");
    hidden.push(child);
  }
  return () => {
    for (const child of hidden) child.removeAttribute("aria-hidden");
  };
}
