import { cn } from "../../lib/utils.ts";
import { ClaudeMark, CursorMark, GeminiMark, OpenAIMark, OpenCodeMark } from "./brand-marks.tsx";

/**
 * A model, as a chip with its family's mark: the Claude spark, the Gemini
 * star, the OpenAI knot, the Cursor cube, the OpenCode frame. The marks are
 * inline SVG (`brand-marks.tsx`), so the badge needs no asset files: Claude
 * and Gemini keep their brand colours, the monochrome ones take the chip's
 * ink.
 *
 * Pass `family` when the app knows it (desktop does, from the agent's
 * metadata); without it the badge guesses from the model string.
 */

type ModelFamily = "claude" | "openai" | "gemini" | "cursor" | "opencode";

// `familyOf` and `agentFamily` are display-string heuristics for the web app,
// which only has a model or agent name to go on. Desktop never calls them: it
// knows the family and passes `family`.

function familyOf(model: string): ModelFamily | null {
  const m = model.toLowerCase();
  if (m.includes("claude") || m.includes("opus") || m.includes("sonnet")) return "claude";
  if (m.startsWith("gpt") || m.includes("codex") || /^o\d/.test(m)) return "openai";
  if (m.includes("gemini")) return "gemini";
  return null;
}

/** The mark for a coding agent: Claude Code, Codex, Gemini CLI, Cursor, OpenCode. */
function agentFamily(agent: string): ModelFamily | null {
  const a = agent.toLowerCase();
  if (a.includes("claude")) return "claude";
  if (a.includes("codex") || a.includes("openai")) return "openai";
  if (a.includes("gemini")) return "gemini";
  if (a.includes("cursor")) return "cursor";
  if (a.includes("opencode")) return "opencode";
  return null;
}

const MARK: Record<ModelFamily, React.ComponentType<{ className?: string }>> = {
  claude: ClaudeMark,
  openai: OpenAIMark,
  gemini: GeminiMark,
  cursor: CursorMark,
  // Beside the model's name the mark is decoration, so it drops its title.
  opencode: (props) => <OpenCodeMark title="" {...props} />,
};

function ModelMark({ family, className }: { family: ModelFamily; className?: string }) {
  const Mark = MARK[family];
  return (
    <Mark
      className={cn(family === "opencode" ? "h-3 w-auto shrink-0" : "size-3 shrink-0", className)}
    />
  );
}

function ModelBadge({
  model,
  family,
  className,
}: {
  model: string;
  /** The model's family when the app knows it; `null` draws no mark. Omitted, it is guessed from `model`. */
  family?: ModelFamily | null;
  className?: string;
}) {
  const shown = family !== undefined ? family : familyOf(model);
  return (
    <span
      data-slot="model-badge"
      className={cn(
        "inline-flex h-control-xs max-w-full items-center gap-1.5 rounded-full border border-border px-2 text-secondary-foreground",
        className,
      )}
    >
      {shown && <ModelMark family={shown} />}
      <span className="truncate font-mono text-2xs">{model}</span>
    </span>
  );
}

export { ModelBadge, ModelMark, agentFamily, familyOf };
export type { ModelFamily };
