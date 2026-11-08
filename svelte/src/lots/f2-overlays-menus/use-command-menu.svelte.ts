/**
 * Binds ⌘K / Ctrl+K and returns the open state, so a button can also open the
 * menu. Ported from `useCommandMenu` in `command-menu.tsx`. Call during component
 * initialisation: it registers the document listener for the component's life.
 */
export function useCommandMenu() {
  let open = $state(false);

  $effect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        open = !open;
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return {
    get open() {
      return open;
    },
    setOpen(next: boolean) {
      open = next;
    },
  };
}
