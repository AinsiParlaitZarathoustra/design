import type { Meta, StoryObj } from "@storybook/react-vite";
import { CanvasSurface } from "../../../src/components/canvas/canvas-chrome.tsx";
import { PresenceCursor, PresenceLayer } from "../../../src/components/canvas/presence-cursor.tsx";
import { HUES } from "../../../src/lib/hue.ts";
import { LONG_NAME } from "./fixtures.ts";

const NAMES = [
  "Ana Ruiz",
  "Omar Haddad",
  "Lena Fischer",
  "Kofi Mensah",
  "Raj Patel",
  "Mei Tanaka",
  "Priya Nair",
  "Tomás Silva",
];

/** Placed the way an app's frame loop would: a transform on the root. */
const at = (x: number, y: number) => ({ transform: `translate3d(${x}px, ${y}px, 0)` });

function Demo({ long }: { long: boolean }) {
  return (
    <div className="h-64">
      <CanvasSurface className="rounded-lg border border-border">
        <PresenceLayer>
          {long ? (
            <PresenceCursor name={LONG_NAME} hue="purple" style={at(48, 64)} />
          ) : (
            // Every identity hue a peer can be: grey never is.
            HUES.filter((h) => h !== "grey").map((hue, i) => (
              <PresenceCursor
                key={hue}
                name={NAMES[i]!}
                hue={hue}
                style={at(32 + (i % 4) * 150, 40 + Math.floor(i / 4) * 96)}
              />
            ))
          )}
        </PresenceLayer>
      </CanvasSurface>
    </div>
  );
}

const meta = {
  title: "Blocks/Presence cursor",
  component: Demo,
  tags: ["autodocs"],
  args: { long: false },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One cursor per identity hue, labelled with the first name. */
export const AllHues: Story = {};
/** A first name long enough to truncate. */
export const LongName: Story = { args: { long: true } };
