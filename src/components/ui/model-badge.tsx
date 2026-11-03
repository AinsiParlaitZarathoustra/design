import { cn } from "../../lib/utils.ts";
import { ClaudeMark, CursorMark, GeminiMark, OpenAIMark, OpenCodeMark } from "./brand-marks.tsx";

/**
 * A model, as a chip with its family's mark: the Claude spark, the Gemini
 * star, the OpenAI knot, the Cursor cube. The marks are inline SVG
 * (`brand-marks.tsx`), so the badge needs no asset files: Claude and Gemini
 * keep their brand colours, the monochrome ones take the chip's ink.
 */

type Family = "claude" | "openai" | "gemini" | "cursor" | "opencode";

function familyOf(model: string): Family | null {
  const m = model.toLowerCase();
  if (m.includes("claude") || m.includes("opus") || m.includes("sonnet")) return "claude";
  if (m.startsWith("gpt") || m.includes("codex") || /^o\d/.test(m)) return "openai";
  if (m.includes("gemini")) return "gemini";
  return null;
}

/** The mark for a coding agent: Claude Code, Codex, Gemini CLI, Cursor, OpenCode. */
function agentFamily(agent: string): Family | null {
  const a = agent.toLowerCase();
  if (a.includes("claude")) return "claude";
  if (a.includes("codex") || a.includes("openai")) return "openai";
  if (a.includes("gemini")) return "gemini";
  if (a.includes("cursor")) return "cursor";
  if (a.includes("opencode")) return "opencode";
  return null;
}

const MARK: Record<Family, (props: React.ComponentProps<"svg">) => React.ReactElement> = {
  claude: ClaudeMark,
  openai: OpenAIMark,
  gemini: GeminiMark,
  cursor: CursorMark,
  opencode: OpenCodeMark,
};

function ModelMark({ family, className }: { family: Family; className?: string }) {
  const Mark = MARK[family];
  return <Mark className={cn("size-3", family === "opencode" && "w-auto", className)} />;
}

function ModelBadge({ model, className }: { model: string; className?: string }) {
  const family = familyOf(model);
  return (
    <span
      data-slot="model-badge"
      className={cn(
        "inline-flex h-control-xs max-w-full items-center gap-1.5 rounded-full border border-border px-2 text-secondary-foreground",
        className,
      )}
    >
      {family && <ModelMark family={family} />}
      <span className="truncate font-mono text-2xs">{model}</span>
    </span>
  );
}

export { ModelBadge, ModelMark, agentFamily, familyOf };
