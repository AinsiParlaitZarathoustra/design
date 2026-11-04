import { expect, userEvent, waitFor } from "storybook/test";

/**
 * Closes the open popup (Escape unless `close` says otherwise) and checks it leaves through
 * `POPUP_EXIT`: Base UI marks it `data-ending-style`, the popup runs
 * `scale-out` while it does, and only then is it hidden (unmounted, or —
 * Select keeps its popup mounted — hidden in place).
 *
 * The animation is 120ms, shorter than `waitFor`'s polling could promise to
 * catch, so a MutationObserver records the animation name the moment the
 * attribute lands.
 */
export async function expectPopupExit(
  slot: string,
  close: () => Promise<unknown> = () => userEvent.keyboard("{Escape}"),
) {
  const popup = await waitFor(() => {
    const el = document.querySelector<HTMLElement>(`[data-slot=${slot}]`);
    if (!el) throw new Error(`no [data-slot=${slot}] open`);
    return el;
  });
  await waitFor(() => expect(popup.checkVisibility()).toBe(true));
  const seen = new Promise<string>((resolve) => {
    const observer = new MutationObserver(() => {
      if (!popup.hasAttribute("data-ending-style")) return;
      observer.disconnect();
      resolve(getComputedStyle(popup).animationName);
    });
    observer.observe(popup, { attributes: true, attributeFilter: ["data-ending-style"] });
  });
  await close();
  await expect(await seen).toBe("scale-out");
  await waitFor(() => expect(popup.isConnected && popup.checkVisibility()).toBe(false));
}
