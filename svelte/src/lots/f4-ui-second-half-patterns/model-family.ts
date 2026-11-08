// `familyOf` and `agentFamily` are display-string heuristics for the web app,
// which only has a model or agent name to go on. Desktop never calls them: it
// knows the family and passes `family`.

export type ModelFamily = "claude" | "openai" | "gemini" | "cursor" | "opencode";

export function familyOf(model: string): ModelFamily | null {
  const m = model.toLowerCase();
  if (m.includes("claude") || m.includes("opus") || m.includes("sonnet")) return "claude";
  if (m.startsWith("gpt") || m.includes("codex") || /^o\d/.test(m)) return "openai";
  if (m.includes("gemini")) return "gemini";
  return null;
}

/** The mark for a coding agent: Claude Code, Codex, Gemini CLI, Cursor, OpenCode. */
export function agentFamily(agent: string): ModelFamily | null {
  const a = agent.toLowerCase();
  if (a.includes("claude")) return "claude";
  if (a.includes("codex") || a.includes("openai")) return "openai";
  if (a.includes("gemini")) return "gemini";
  if (a.includes("cursor")) return "cursor";
  if (a.includes("opencode")) return "opencode";
  return null;
}
