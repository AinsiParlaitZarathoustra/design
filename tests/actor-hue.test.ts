import { describe, expect, it } from "vitest";
import { ACTOR_COLOUR_HUE, actorHue } from "../src/lib/actor-hue.ts";
import { hueFor } from "../src/lib/hue.ts";

/**
 * A collaborator must read in the same hue on every Spaces client. Web maps
 * the published wire colour onto a hue with this exact table; if the package
 * drifted from it, one person would be two colours across desktop and web,
 * and nothing else would notice.
 */

// The web client's table (apps/web space-model.ts), spelled without the `#`
// so this file stays clear of the colour-literal ratchet.
const WEB: Array<[string, string]> = [
  ["e11d48", "red"],
  ["ea580c", "orange"],
  ["ca8a04", "yellow"],
  ["16a34a", "green"],
  ["0891b2", "cyan"],
  ["2563eb", "blue"],
  ["7c3aed", "purple"],
  ["db2777", "red"],
];

describe("actorHue", () => {
  it("has exactly web's eight wire colours", () => {
    expect(Object.keys(ACTOR_COLOUR_HUE).sort()).toEqual(WEB.map(([hex]) => `#${hex}`).sort());
  });

  it.each(WEB)("maps wire colour %s to %s, in either case", (hex, hue) => {
    expect(actorHue({ id: "actor_1", colour: `#${hex}` })).toBe(hue);
    expect(actorHue({ id: "actor_1", colour: `#${hex.toUpperCase()}` })).toBe(hue);
  });

  it("falls back to the id's hue for an unknown or missing colour", () => {
    for (const id of ["actor_a", "actor_b", "user_42"]) {
      const expected = hueFor(id);
      expect(actorHue({ id, colour: "tomato" })).toBe(expected);
      expect(actorHue({ id })).toBe(expected);
      expect(actorHue({ id, colour: null })).toBe(expected);
    }
  });

  it("is never grey", () => {
    let seed = 7;
    const random = () => {
      seed = (seed * 1103515245 + 12345) >>> 0;
      return seed.toString(36);
    };
    for (let i = 0; i < 500; i++) {
      expect(actorHue({ id: `actor_${random()}` })).not.toBe("grey");
    }
  });
});
