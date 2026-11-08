// The `f4-ui-second-half-patterns` lot's public surface. The pilot wires this file
// into `src/index.ts`; nothing here edits the root entry.

export { default as ModelBadge } from "./model-badge.svelte";
export { familyOf, agentFamily, type ModelFamily } from "./model-family";

export { default as Pill, type PillSize, type PillSurface } from "./pill.svelte";

export { default as Progress } from "./progress.svelte";
export type { ProgressTone } from "./progress-model";
export { default as ProgressTrack } from "./progress-track.svelte";
export { default as ProgressIndicator } from "./progress-indicator.svelte";
export { default as ProgressLabel } from "./progress-label.svelte";
export { default as ProgressValue } from "./progress-value.svelte";

export { default as AI21Mark } from "./provider-marks/ai21-mark.svelte";
export { default as AzureMark } from "./provider-marks/azure-mark.svelte";
export { default as CerebrasMark } from "./provider-marks/cerebras-mark.svelte";
export { default as CohereMark } from "./provider-marks/cohere-mark.svelte";
export { default as DeepInfraMark } from "./provider-marks/deep-infra-mark.svelte";
export { default as DeepSeekMark } from "./provider-marks/deep-seek-mark.svelte";
export { default as ElevenLabsMark } from "./provider-marks/eleven-labs-mark.svelte";
export { default as FireworksMark } from "./provider-marks/fireworks-mark.svelte";
export { default as GroqMark } from "./provider-marks/groq-mark.svelte";
export { default as HuggingFaceMark } from "./provider-marks/hugging-face-mark.svelte";
export { default as JinaMark } from "./provider-marks/jina-mark.svelte";
export { default as KimiMark } from "./provider-marks/kimi-mark.svelte";
export { default as MetaMark } from "./provider-marks/meta-mark.svelte";
export { default as MistralMark } from "./provider-marks/mistral-mark.svelte";
export { default as OpenRouterMark } from "./provider-marks/open-router-mark.svelte";
export { default as PerplexityMark } from "./provider-marks/perplexity-mark.svelte";
export { default as QwenMark } from "./provider-marks/qwen-mark.svelte";
export { default as ReplicateMark } from "./provider-marks/replicate-mark.svelte";
export { default as TogetherMark } from "./provider-marks/together-mark.svelte";
export { default as VoyageMark } from "./provider-marks/voyage-mark.svelte";
export { default as XAIMark } from "./provider-marks/xai-mark.svelte";
export { default as ZhipuMark } from "./provider-marks/zhipu-mark.svelte";

export { default as Separator } from "./separator.svelte";

export { default as Skeleton, type SkeletonRadius } from "./skeleton.svelte";

export { default as StatusDot, type StatusDotTone } from "./status-dot.svelte";

export { default as PriorityIcon, type Priority } from "./priority-icon.svelte";

export { default as Table } from "./table/table.svelte";
export { default as TableBody } from "./table/table-body.svelte";
export { default as TableCaption } from "./table/table-caption.svelte";
export { default as TableCell } from "./table/table-cell.svelte";
export { default as TableFooter } from "./table/table-footer.svelte";
export { default as TableHead } from "./table/table-head.svelte";
export { default as TableHeader } from "./table/table-header.svelte";
export { default as TableRow } from "./table/table-row.svelte";

export { default as Tabs } from "./tabs/tabs.svelte";
export { default as TabsList } from "./tabs/tabs-list.svelte";
export { default as TabsTrigger } from "./tabs/tabs-trigger.svelte";
export { default as TabsContent } from "./tabs/tabs-content.svelte";

export { default as Tag } from "./tag.svelte";
export { default as HueDot } from "./hue-dot.svelte";
export { default as LabelMark } from "./label-mark.svelte";

export { default as TextLink } from "./text-link.svelte";

export { default as UploadIcon, type UploadIconHandle } from "./upload-icon.svelte";

export { default as DotMatrix } from "./dot-matrix.svelte";
export { default as SegmentMeter } from "./segment-meter.svelte";

export { default as KpiStrip, type KpiCell } from "./kpi-strip.svelte";
export { default as DeltaChip, type DeltaTone } from "./delta-chip.svelte";

export { default as Rail } from "./rail.svelte";
export { default as RailNode } from "./rail-node.svelte";

export { default as SectionHeader } from "./section-header.svelte";

export { default as StatCard } from "./stat-card.svelte";
export { default as MeterCard } from "./meter-card.svelte";
export { default as StatGrid } from "./stat-grid.svelte";

export { default as Panel } from "./panel.svelte";

export { default as StepList, type StepListStep, type StepStatus } from "./step-list.svelte";

export { default as SettingCard } from "./setting-card.svelte";
export { default as SettingRow } from "./setting-row.svelte";
export { default as DrillInRow } from "./drill-in-row.svelte";

export { default as Toaster } from "./toast/toaster.svelte";
export { default as Toast } from "./toast/toast.svelte";
export { default as ToastAction } from "./toast/toast-action.svelte";
export { default as ToastClose } from "./toast/toast-close.svelte";
export { default as ToastContent } from "./toast/toast-content.svelte";
export { default as ToastDescription } from "./toast/toast-description.svelte";
export { default as ToastPortal } from "./toast/toast-portal.svelte";
export { default as ToastProvider } from "./toast/toast-provider.svelte";
export { default as ToastTitle } from "./toast/toast-title.svelte";
export { default as ToastViewport } from "./toast/toast-viewport.svelte";
export {
  ToastManager,
  createToastManager,
  toast,
  useToastManager,
} from "./toast/toast-manager.svelte";
export type { ToastItem, ToastOptions, ToastSeed, ToastType } from "./toast/toast-types";

export { default as NextPage } from "./next-page.svelte";

export { default as PersonAvatar } from "./person-avatar.svelte";

// The label hue palette lives in the shared `lib`; the lot re-exports it because
// the oracle's family exports it.
export { HUES } from "../../lib/hue";
