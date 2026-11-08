/**
 * The open state of one dropdown menu, shared by its trigger and content
 * through Svelte context. Adapter for `DropdownMenu` (lot f2). The trigger is
 * found by id, so the same lookup works whether the trigger draws its own
 * button or hands its props to a `child` snippet.
 */
let uid = 0;

export class MenuState {
  open = $state(false);
  readonly triggerId = `dropdown-menu-trigger-${++uid}`;

  get trigger(): HTMLElement | null {
    return document.getElementById(this.triggerId);
  }

  close() {
    this.open = false;
  }
}
