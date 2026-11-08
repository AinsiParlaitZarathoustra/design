/** Moves a node to the end of `document.body`, the way a portal does. */
export function portal(node: HTMLElement) {
  document.body.append(node);
  return {
    destroy() {
      node.remove();
    },
  };
}
