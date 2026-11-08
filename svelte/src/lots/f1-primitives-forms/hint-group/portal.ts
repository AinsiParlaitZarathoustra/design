/**
 * Moves a node to `<body>` for as long as it is mounted, as React's
 * `createPortal(…, document.body)` does for the group's strip. The strip is
 * fixed-positioned, so it must not sit inside a panel that clips its overflow.
 */
export function portal(node: HTMLElement) {
  document.body.appendChild(node);
  return {
    destroy() {
      node.remove();
    },
  };
}
