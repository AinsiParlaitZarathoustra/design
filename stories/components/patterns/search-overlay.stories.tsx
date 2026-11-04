import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileCode, User } from "lucide-react";
import { type ReactNode, useState } from "react";
import { fn, userEvent, within } from "storybook/test";

import {
  type SearchResult,
  type SearchStatus,
  SearchOverlay,
  SearchResultRow,
} from "../../../src/components/patterns/search-overlay.tsx";
import { optionId } from "../../../src/components/patterns/command-list.ts";
import { CommandPanel } from "../../../src/ui/command.tsx";
import { Button } from "../../../src/ui/button.tsx";
import { Icon } from "../../../src/ui/icon.tsx";

const fileIcon = <Icon icon={FileCode} size="lg" />;
const onSubmit = fn().mockName("onSubmit");
const onOpen = fn().mockName("onOpen");

const LINES = [
  "export function splitHighlights(text: string, ranges: Range[]) {",
  "  const split = text.split(/\\s+/);",
  "// split the stack before the dialog closes",
  "  return split.length > 0 ? split : [text];",
];

/** A grep hit for `query` in a fixed set of files: the deterministic fixture. */
function grep(query: string, count = 12): SearchResult[] {
  const q = query.toLowerCase();
  return Array.from({ length: count }, (_, i) => {
    const line = LINES[i % LINES.length]!;
    const text = line.trim();
    const at = text.toLowerCase().indexOf(q);
    const path =
      i === 3
        ? "src/features/command-palette/components/a-very-deeply-nested-folder/that-keeps-going/and-going/command-palette-content.tsx"
        : `src/components/patterns/file-${i + 1}.tsx`;
    return {
      id: `${path}:${i * 7 + 3}`,
      title: path,
      meta: `:${i * 7 + 3}`,
      // Ranges index the text as shown: trimmed here, so found in the trimmed
      // line (desktop's adapter re-bases the backend's offsets the same way).
      detail: text,
      highlights: at < 0 || !q ? [] : [[at, at + q.length] as const],
      icon: fileIcon,
      mono: true,
    };
  });
}

const MESSAGES = Array.from({ length: 40 }, (_, i) => ({
  id: `m${i}`,
  time: `${String(9 + Math.floor(i / 6)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  text: [
    "Can you split the palette into a list and a dialog?",
    "Why does the highlight jump when the list scrolls?",
    "Run the tests again with the theme set to light",
    "Make the search overlay share the command shell",
  ][i % 4]!,
}));

interface DemoProps {
  mode: "live" | "submit";
  /** How the fixture answers a search. */
  fixture: "files" | "none" | "error" | "pending" | "chat" | "many";
  recent?: string[];
  idleHint?: ReactNode;
  defaultOpen?: boolean;
  initialQuery?: string;
}

/** Holds the query, status and results, and answers a search from the
 *  fixtures a microtask later: idle → searching → done. */
function Demo({
  mode,
  fixture,
  recent: initialRecent = [],
  idleHint,
  defaultOpen = true,
  initialQuery = "",
}: DemoProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState<SearchStatus>(initialQuery ? "searching" : "idle");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recent, setRecent] = useState(initialRecent);

  const answer = (q: string): SearchResult[] => {
    if (fixture === "files") return grep(q);
    if (fixture === "many") return grep(q, 200);
    if (fixture === "chat") {
      const needle = q.trim().toLowerCase();
      return MESSAGES.filter((m) => m.text.toLowerCase().includes(needle))
        .slice(0, 200)
        .map((m) => {
          const at = m.text.toLowerCase().indexOf(needle);
          return {
            id: m.id,
            title: "You",
            meta: m.time,
            detail: m.text,
            highlights: needle ? [[at, at + needle.length] as const] : [],
            icon: <Icon icon={User} size="lg" />,
          };
        });
    }
    return [];
  };

  const search = (q: string) => {
    setStatus("searching");
    if (fixture === "pending") return;
    void Promise.resolve().then(() => {
      if (fixture === "error") return setStatus("error");
      setResults(answer(q));
      setStatus("done");
      setRecent((r) => [q, ...r.filter((x) => x !== q)]);
    });
  };

  const live = mode === "live";
  const shown = live ? answer(query) : results;
  return (
    <div className="flex min-h-svh items-start justify-center p-8">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open search
      </Button>
      <SearchOverlay
        open={open}
        onOpenChange={setOpen}
        title={live ? "Find in session" : "Search in files"}
        placeholder={live ? "Find a question you asked…" : "Search in files…"}
        query={query}
        onQueryChange={(q) => {
          setQuery(q);
          if (!q.trim() && !live) setStatus("idle");
        }}
        mode={mode}
        onSubmit={(q) => {
          onSubmit(q);
          search(q);
        }}
        status={live ? "done" : status}
        error="ripgrep exited with code 2"
        results={shown}
        onOpen={onOpen}
        count={live ? String(shown.length) : status === "done" ? String(results.length) : undefined}
        recent={recent}
        onPickRecent={(q) => setQuery(q)}
        onForgetRecent={(q) => setRecent((r) => r.filter((x) => x !== q))}
        onClearRecent={() => setRecent([])}
        idleHint={idleHint}
        notice={
          fixture === "many" && status === "done"
            ? "Showing the first 200 matches. Narrow the search to see the rest."
            : undefined
        }
      />
    </div>
  );
}

const field = () => within(document.body).findByRole("combobox");

const meta = {
  title: "Patterns/SearchOverlay",
  component: Demo,
  args: { mode: "submit", fixture: "files" },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'Find-in-files (`mode="submit"`: Enter searches) and find-in-session (`mode="live"`) on the command shell. The host owns the query, the status, the results and the recent searches. ↑/↓ step the highlight, Enter opens the result (or, after an edit in submit mode, searches), Delete forgets a highlighted recent search. Matches are marked by colour alone, as in desktop\'s file search.',
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultOpen: false } };

export const FindInFilesIdle: Story = {
  args: { recent: ["splitHighlights", "useListHighlight", "TODO(atlas)", "z-drag", "glass-hud"] },
  tags: ["!autodocs"],
  play: async () => {
    await field();
    await userEvent.keyboard("{ArrowDown}");
  },
};
export const FindInFilesNoRecents: Story = {
  args: { idleHint: "Type to search across all files" },
  tags: ["!autodocs"],
};
export const Searching: Story = {
  args: { fixture: "pending" },
  tags: ["!autodocs"],
  play: async () => {
    await userEvent.type(await field(), "split{Enter}");
  },
};
export const Results: Story = {
  tags: ["!autodocs"],
  play: async () => {
    await userEvent.type(await field(), "split{Enter}");
  },
};
export const NoResults: Story = {
  args: { fixture: "none" },
  tags: ["!autodocs"],
  play: async () => {
    await userEvent.type(await field(), "kubernetes{Enter}");
  },
};
export const Failed: Story = {
  args: { fixture: "error" },
  tags: ["!autodocs"],
  play: async () => {
    await userEvent.type(await field(), "split(");
    await userEvent.keyboard("{Enter}");
  },
};
export const FindInChat: Story = {
  args: { mode: "live", fixture: "chat" },
  tags: ["!autodocs"],
  play: async () => {
    await userEvent.type(await field(), "split");
  },
};
export const ManyResults: Story = {
  args: { fixture: "many" },
  tags: ["!autodocs"],
  play: async () => {
    await userEvent.type(await field(), "split{Enter}");
  },
};

/** `SearchResultRow` on its own: a code hit, active, and a plain one. */
export const ResultRows: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="mx-auto max-w-2xl p-8">
      <div className="overflow-hidden rounded-xl border border-border bg-popover pt-2">
        <CommandPanel aria-label="Result rows">
          {grep("split", 2).map((r, i) => (
            <SearchResultRow
              key={r.id}
              id={optionId("rows", r.id)}
              result={r}
              active={i === 0}
              onOpen={onOpen}
            />
          ))}
        </CommandPanel>
      </div>
    </div>
  ),
};
