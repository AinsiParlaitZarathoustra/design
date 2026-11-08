import type { Component } from "svelte";
import type { StoryEntry } from "../types";
import ModelBadgeStories from "./f4-ui-second-half-patterns/model-badge-stories.svelte";
import PillStories from "./f4-ui-second-half-patterns/pill-stories.svelte";
import ProgressStories from "./f4-ui-second-half-patterns/progress-stories.svelte";
import ProviderMarksStories from "./f4-ui-second-half-patterns/provider-marks-stories.svelte";
import SeparatorStories from "./f4-ui-second-half-patterns/separator-stories.svelte";
import SkeletonStories from "./f4-ui-second-half-patterns/skeleton-stories.svelte";
import SpinnerStories from "./f4-ui-second-half-patterns/spinner-stories.svelte";
import StatusIconStories from "./f4-ui-second-half-patterns/status-icon-stories.svelte";
import TableStories from "./f4-ui-second-half-patterns/table-stories.svelte";
import TabsStories from "./f4-ui-second-half-patterns/tabs-stories.svelte";
import TextLinkStories from "./f4-ui-second-half-patterns/text-link-stories.svelte";
import DotMatrixStories from "./f4-ui-second-half-patterns/dot-matrix-stories.svelte";
import KpiStripStories from "./f4-ui-second-half-patterns/kpi-strip-stories.svelte";
import SectionHeaderStories from "./f4-ui-second-half-patterns/section-header-stories.svelte";
import RailStories from "./f4-ui-second-half-patterns/rail-stories.svelte";
import StatCardStories from "./f4-ui-second-half-patterns/stat-card-stories.svelte";
import UploadIconStories from "./f4-ui-second-half-patterns/upload-icon-stories.svelte";
import TagStories from "./f4-ui-second-half-patterns/tag-stories.svelte";
import StatusDotStories from "./f4-ui-second-half-patterns/status-dot-stories.svelte";
import PanelStories from "./f4-ui-second-half-patterns/panel-stories.svelte";
import SettingCardStories from "./f4-ui-second-half-patterns/setting-card-stories.svelte";
import StepListStories from "./f4-ui-second-half-patterns/step-list-stories.svelte";
import ToastStories from "./f4-ui-second-half-patterns/toast-stories.svelte";
import NextPageStories from "./f4-ui-second-half-patterns/next-page-stories.svelte";
import PersonAvatarStories from "./f4-ui-second-half-patterns/person-avatar-stories.svelte";

// The entries of the `f4-ui-second-half-patterns` lot. Each id is the oracle's
// exact id from `storybook-static/index.json`. Each family's scenarios live in
// `f4-ui-second-half-patterns/<family>-stories.svelte`, selected by `story`.
type Scenarios = Component<Record<string, never>>;
const scenarios = (component: unknown, story: string) => ({
  component: component as Scenarios,
  props: { story },
});

const ENTRIES: StoryEntry[] = [
  // ModelBadge
  { id: "components-modelbadge--default", title: "Components/ModelBadge", name: "Default", status: "porté", ...scenarios(ModelBadgeStories, "default") },
  { id: "components-modelbadge--families", title: "Components/ModelBadge", name: "Families", status: "porté", ...scenarios(ModelBadgeStories, "families") },
  { id: "components-modelbadge--sizes", title: "Components/ModelBadge", name: "Sizes", status: "porté", ...scenarios(ModelBadgeStories, "sizes") },
  { id: "components-modelbadge--unknown", title: "Components/ModelBadge", name: "Unknown", status: "porté", ...scenarios(ModelBadgeStories, "unknown") },
  { id: "components-modelbadge--explicit-family", title: "Components/ModelBadge", name: "Explicit Family", status: "porté", ...scenarios(ModelBadgeStories, "explicit-family") },
  { id: "components-modelbadge--long-name", title: "Components/ModelBadge", name: "Long Name", status: "porté", ...scenarios(ModelBadgeStories, "long-name") },
  { id: "components-modelbadge--marks", title: "Components/ModelBadge", name: "Marks", status: "porté", ...scenarios(ModelBadgeStories, "marks") },
  // Pill
  { id: "components-pill--default", title: "Components/Pill", name: "Default", status: "porté", ...scenarios(PillStories, "default") },
  { id: "components-pill--with-icon", title: "Components/Pill", name: "With Icon", status: "porté", ...scenarios(PillStories, "with-icon") },
  { id: "components-pill--removable", title: "Components/Pill", name: "Removable", status: "porté", ...scenarios(PillStories, "removable") },
  { id: "components-pill--status-dots", title: "Components/Pill", name: "Status Dots", status: "porté", ...scenarios(PillStories, "status-dots") },
  { id: "components-pill--many-items", title: "Components/Pill", name: "Many Items", status: "porté", ...scenarios(PillStories, "many-items") },
  { id: "components-pill--long-text", title: "Components/Pill", name: "Long Text", status: "porté", ...scenarios(PillStories, "long-text") },
  { id: "components-pill--as-button", title: "Components/Pill", name: "As Button", status: "porté", ...scenarios(PillStories, "as-button") },
  { id: "components-pill--sizes", title: "Components/Pill", name: "Sizes", status: "porté", ...scenarios(PillStories, "sizes") },
  { id: "components-pill--trailing-action", title: "Components/Pill", name: "Trailing Action", status: "porté", ...scenarios(PillStories, "trailing-action") },
  { id: "components-pill--raised", title: "Components/Pill", name: "Raised", status: "porté", ...scenarios(PillStories, "raised") },
  // Progress
  { id: "components-progress--default", title: "Components/Progress", name: "Default", status: "porté", ...scenarios(ProgressStories, "default") },
  { id: "components-progress--empty", title: "Components/Progress", name: "Empty", status: "porté", ...scenarios(ProgressStories, "empty") },
  { id: "components-progress--complete", title: "Components/Progress", name: "Complete", status: "porté", ...scenarios(ProgressStories, "complete") },
  { id: "components-progress--loading", title: "Components/Progress", name: "Loading", status: "porté", ...scenarios(ProgressStories, "loading") },
  { id: "components-progress--long-text", title: "Components/Progress", name: "Long Text", status: "porté", ...scenarios(ProgressStories, "long-text") },
  { id: "components-progress--bare-track", title: "Components/Progress", name: "Bare Track", status: "porté", ...scenarios(ProgressStories, "bare-track") },
  { id: "components-progress--tones", title: "Components/Progress", name: "Tones", status: "porté", ...scenarios(ProgressStories, "tones") },
  { id: "components-progress--many-items", title: "Components/Progress", name: "Many Items", status: "porté", ...scenarios(ProgressStories, "many-items") },
  // ProviderMarks
  { id: "components-providermarks--all", title: "Components/ProviderMarks", name: "All", status: "porté", ...scenarios(ProviderMarksStories, "all") },
  { id: "components-providermarks--desktop-sizes", title: "Components/ProviderMarks", name: "Desktop Sizes", status: "porté", ...scenarios(ProviderMarksStories, "desktop-sizes") },
  { id: "components-providermarks--on-card", title: "Components/ProviderMarks", name: "On Card", status: "porté", ...scenarios(ProviderMarksStories, "on-card") },
  // Separator
  { id: "components-separator--default", title: "Components/Separator", name: "Default", status: "porté", ...scenarios(SeparatorStories, "default") },
  { id: "components-separator--strong", title: "Components/Separator", name: "Strong", status: "porté", ...scenarios(SeparatorStories, "strong") },
  { id: "components-separator--vertical", title: "Components/Separator", name: "Vertical", status: "porté", ...scenarios(SeparatorStories, "vertical") },
  // Skeleton
  { id: "components-skeleton--default", title: "Components/Skeleton", name: "Default", status: "porté", ...scenarios(SkeletonStories, "default") },
  { id: "components-skeleton--loading", title: "Components/Skeleton", name: "Loading", status: "porté", ...scenarios(SkeletonStories, "loading") },
  { id: "components-skeleton--static-panel", title: "Components/Skeleton", name: "Static Panel", status: "porté", ...scenarios(SkeletonStories, "static-panel") },
  { id: "components-skeleton--card", title: "Components/Skeleton", name: "Card", status: "porté", ...scenarios(SkeletonStories, "card") },
  // Spinner
  { id: "components-spinner--default", title: "Components/Spinner", name: "Default", status: "porté", ...scenarios(SpinnerStories, "default") },
  { id: "components-spinner--sizes", title: "Components/Spinner", name: "Sizes", status: "porté", ...scenarios(SpinnerStories, "sizes") },
  { id: "components-spinner--in-button", title: "Components/Spinner", name: "In Button", status: "porté", ...scenarios(SpinnerStories, "in-button") },
  { id: "components-spinner--with-text", title: "Components/Spinner", name: "With Text", status: "porté", ...scenarios(SpinnerStories, "with-text") },
  // StatusIcon
  { id: "components-statusicon--default", title: "Components/StatusIcon", name: "Default", status: "porté", ...scenarios(StatusIconStories, "default") },
  { id: "components-statusicon--error", title: "Components/StatusIcon", name: "Error", status: "porté", ...scenarios(StatusIconStories, "error") },
  { id: "components-statusicon--all-statuses", title: "Components/StatusIcon", name: "All Statuses", status: "porté", ...scenarios(StatusIconStories, "all-statuses") },
  { id: "components-statusicon--priorities", title: "Components/StatusIcon", name: "Priorities", status: "porté", ...scenarios(StatusIconStories, "priorities") },
  { id: "components-statusicon--many-items", title: "Components/StatusIcon", name: "Many Items", status: "porté", ...scenarios(StatusIconStories, "many-items") },
  // Table
  { id: "components-table--default", title: "Components/Table", name: "Default", status: "porté", ...scenarios(TableStories, "default") },
  { id: "components-table--with-footer", title: "Components/Table", name: "With Footer", status: "porté", ...scenarios(TableStories, "with-footer") },
  { id: "components-table--selected", title: "Components/Table", name: "Selected", status: "porté", ...scenarios(TableStories, "selected") },
  { id: "components-table--empty", title: "Components/Table", name: "Empty", status: "porté", ...scenarios(TableStories, "empty") },
  { id: "components-table--long-text", title: "Components/Table", name: "Long Text", status: "porté", ...scenarios(TableStories, "long-text") },
  { id: "components-table--many-items", title: "Components/Table", name: "Many Items", status: "porté", ...scenarios(TableStories, "many-items") },
  // Tabs
  { id: "components-tabs--default", title: "Components/Tabs", name: "Default", status: "porté", ...scenarios(TabsStories, "default") },
  { id: "components-tabs--small", title: "Components/Tabs", name: "Small", status: "porté", ...scenarios(TabsStories, "small") },
  { id: "components-tabs--segmented-with-icons", title: "Components/Tabs", name: "Segmented With Icons", status: "écart identifié", ...scenarios(TabsStories, "segmented-with-icons") },
  { id: "components-tabs--line", title: "Components/Tabs", name: "Line", status: "écart identifié", ...scenarios(TabsStories, "line") },
  { id: "components-tabs--disabled", title: "Components/Tabs", name: "Disabled", status: "porté", ...scenarios(TabsStories, "disabled") },
  { id: "components-tabs--long-text", title: "Components/Tabs", name: "Long Text", status: "écart identifié", ...scenarios(TabsStories, "long-text") },
  { id: "components-tabs--many-items", title: "Components/Tabs", name: "Many Items", status: "porté", ...scenarios(TabsStories, "many-items") },
  // TextLink
  { id: "components-textlink--default", title: "Components/TextLink", name: "Default", status: "porté", ...scenarios(TextLinkStories, "default") },
  { id: "components-textlink--muted", title: "Components/TextLink", name: "Muted", status: "porté", ...scenarios(TextLinkStories, "muted") },
  { id: "components-textlink--standalone-and-prose", title: "Components/TextLink", name: "Standalone And Prose", status: "porté", ...scenarios(TextLinkStories, "standalone-and-prose") },
  // UploadIcon
  { id: "components-uploadicon--default", title: "Components/UploadIcon", name: "Default", status: "porté", ...scenarios(UploadIconStories, "default") },
  { id: "components-uploadicon--sizes", title: "Components/UploadIcon", name: "Sizes", status: "porté", ...scenarios(UploadIconStories, "sizes") },
  { id: "components-uploadicon--driven-by-parent", title: "Components/UploadIcon", name: "Driven By Parent", status: "porté", ...scenarios(UploadIconStories, "driven-by-parent") },
  // Tag
  { id: "components-tag--default", title: "Components/Tag", name: "Default", status: "porté", ...scenarios(TagStories, "default") },
  { id: "components-tag--with-dot", title: "Components/Tag", name: "With Dot", status: "porté", ...scenarios(TagStories, "with-dot") },
  { id: "components-tag--no-hue", title: "Components/Tag", name: "No Hue", status: "porté", ...scenarios(TagStories, "no-hue") },
  { id: "components-tag--all-hues", title: "Components/Tag", name: "All Hues", status: "porté", ...scenarios(TagStories, "all-hues") },
  { id: "components-tag--every-theme", title: "Components/Tag", name: "Every Theme", status: "porté", ...scenarios(TagStories, "every-theme") },
  { id: "components-tag--label-marks", title: "Components/Tag", name: "Label Marks", status: "porté", ...scenarios(TagStories, "label-marks") },
  { id: "components-tag--dots", title: "Components/Tag", name: "Dots", status: "porté", ...scenarios(TagStories, "dots") },
  { id: "components-tag--long-text", title: "Components/Tag", name: "Long Text", status: "porté", ...scenarios(TagStories, "long-text") },
  // DotMatrix
  { id: "patterns-dotmatrix--default", title: "Patterns/DotMatrix", name: "Default", status: "porté", ...scenarios(DotMatrixStories, "default") },
  { id: "patterns-dotmatrix--empty", title: "Patterns/DotMatrix", name: "Empty", status: "porté", ...scenarios(DotMatrixStories, "empty") },
  { id: "patterns-dotmatrix--with-gaps", title: "Patterns/DotMatrix", name: "With Gaps", status: "porté", ...scenarios(DotMatrixStories, "with-gaps") },
  { id: "patterns-dotmatrix--many-items", title: "Patterns/DotMatrix", name: "Many Items", status: "porté", ...scenarios(DotMatrixStories, "many-items") },
  { id: "patterns-dotmatrix--meter", title: "Patterns/DotMatrix", name: "Meter", status: "porté", ...scenarios(DotMatrixStories, "meter") },
  { id: "patterns-dotmatrix--gauge", title: "Patterns/DotMatrix", name: "Gauge", status: "porté", ...scenarios(DotMatrixStories, "gauge") },
  { id: "patterns-dotmatrix--meter-hues", title: "Patterns/DotMatrix", name: "Meter Hues", status: "porté", ...scenarios(DotMatrixStories, "meter-hues") },
  // KpiStrip
  { id: "patterns-kpistrip--default", title: "Patterns/KpiStrip", name: "Default", status: "porté", ...scenarios(KpiStripStories, "default") },
  { id: "patterns-kpistrip--no-previous-period", title: "Patterns/KpiStrip", name: "No Previous Period", status: "porté", ...scenarios(KpiStripStories, "no-previous-period") },
  { id: "patterns-kpistrip--single", title: "Patterns/KpiStrip", name: "Single", status: "porté", ...scenarios(KpiStripStories, "single") },
  { id: "patterns-kpistrip--many-items", title: "Patterns/KpiStrip", name: "Many Items", status: "porté", ...scenarios(KpiStripStories, "many-items") },
  { id: "patterns-kpistrip--long-text", title: "Patterns/KpiStrip", name: "Long Text", status: "porté", ...scenarios(KpiStripStories, "long-text") },
  { id: "patterns-kpistrip--chips", title: "Patterns/KpiStrip", name: "Chips", status: "porté", ...scenarios(KpiStripStories, "chips") },
  { id: "patterns-kpistrip--tones", title: "Patterns/KpiStrip", name: "Tones", status: "porté", ...scenarios(KpiStripStories, "tones") },
  { id: "patterns-kpistrip--with-tones", title: "Patterns/KpiStrip", name: "With Tones", status: "porté", ...scenarios(KpiStripStories, "with-tones") },
  // SectionHeader
  { id: "patterns-sectionheader--default", title: "Patterns/SectionHeader", name: "Default", status: "porté", ...scenarios(SectionHeaderStories, "default") },
  { id: "patterns-sectionheader--title-only", title: "Patterns/SectionHeader", name: "Title Only", status: "porté", ...scenarios(SectionHeaderStories, "title-only") },
  { id: "patterns-sectionheader--with-action", title: "Patterns/SectionHeader", name: "With Action", status: "porté", ...scenarios(SectionHeaderStories, "with-action") },
  { id: "patterns-sectionheader--with-icon", title: "Patterns/SectionHeader", name: "With Icon", status: "porté", ...scenarios(SectionHeaderStories, "with-icon") },
  { id: "patterns-sectionheader--long-text", title: "Patterns/SectionHeader", name: "Long Text", status: "porté", ...scenarios(SectionHeaderStories, "long-text") },
  { id: "patterns-sectionheader--page", title: "Patterns/SectionHeader", name: "Page", status: "porté", ...scenarios(SectionHeaderStories, "page") },
  // Rail
  { id: "patterns-rail--default", title: "Patterns/Rail", name: "Default", status: "porté", ...scenarios(RailStories, "default") },
  // Panel
  { id: "patterns-panel--default", title: "Patterns/Panel", name: "Default", status: "porté", ...scenarios(PanelStories, "default") },
  { id: "patterns-panel--untitled", title: "Patterns/Panel", name: "Untitled", status: "porté", ...scenarios(PanelStories, "untitled") },
  { id: "patterns-panel--with-actions", title: "Patterns/Panel", name: "With Actions", status: "porté", ...scenarios(PanelStories, "with-actions") },
  { id: "patterns-panel--empty", title: "Patterns/Panel", name: "Empty", status: "porté", ...scenarios(PanelStories, "empty") },
  { id: "patterns-panel--long-text", title: "Patterns/Panel", name: "Long Text", status: "porté", ...scenarios(PanelStories, "long-text") },
  { id: "patterns-panel--stagger", title: "Patterns/Panel", name: "Stagger", status: "porté", ...scenarios(PanelStories, "stagger") },
  // SettingCard
  { id: "patterns-settingcard--default", title: "Patterns/SettingCard", name: "Default", status: "porté", ...scenarios(SettingCardStories, "default") },
  { id: "patterns-settingcard--disabled", title: "Patterns/SettingCard", name: "Disabled", status: "porté", ...scenarios(SettingCardStories, "disabled") },
  { id: "patterns-settingcard--long-text", title: "Patterns/SettingCard", name: "Long Text", status: "porté", ...scenarios(SettingCardStories, "long-text") },
  { id: "patterns-settingcard--many-items", title: "Patterns/SettingCard", name: "Many Items", status: "porté", ...scenarios(SettingCardStories, "many-items") },
  { id: "patterns-settingcard--narrow", title: "Patterns/SettingCard", name: "Narrow", status: "porté", ...scenarios(SettingCardStories, "narrow") },
  // StatCard
  { id: "patterns-statcard--default", title: "Patterns/StatCard", name: "Default", status: "porté", ...scenarios(StatCardStories, "default") },
  { id: "patterns-statcard--with-badge", title: "Patterns/StatCard", name: "With Badge", status: "porté", ...scenarios(StatCardStories, "with-badge") },
  { id: "patterns-statcard--empty", title: "Patterns/StatCard", name: "Empty", status: "porté", ...scenarios(StatCardStories, "empty") },
  { id: "patterns-statcard--long-text", title: "Patterns/StatCard", name: "Long Text", status: "porté", ...scenarios(StatCardStories, "long-text") },
  { id: "patterns-statcard--grid", title: "Patterns/StatCard", name: "Grid", status: "porté", ...scenarios(StatCardStories, "grid") },
  { id: "patterns-statcard--meters", title: "Patterns/StatCard", name: "Meters", status: "porté", ...scenarios(StatCardStories, "meters") },
  { id: "patterns-statcard--meter-no-hue", title: "Patterns/StatCard", name: "Meter No Hue", status: "porté", ...scenarios(StatCardStories, "meter-no-hue") },
  // StatusDot
  { id: "components-statusdot--default", title: "Components/StatusDot", name: "Default", status: "porté", ...scenarios(StatusDotStories, "default") },
  { id: "components-statusdot--tones", title: "Components/StatusDot", name: "Tones", status: "porté", ...scenarios(StatusDotStories, "tones") },
  { id: "components-statusdot--sizes", title: "Components/StatusDot", name: "Sizes", status: "porté", ...scenarios(StatusDotStories, "sizes") },
  { id: "components-statusdot--presence", title: "Components/StatusDot", name: "Presence", status: "porté", ...scenarios(StatusDotStories, "presence") },
  { id: "components-statusdot--on-an-icon", title: "Components/StatusDot", name: "On An Icon", status: "porté", ...scenarios(StatusDotStories, "on-an-icon") },
  // StepList
  { id: "components-steplist--running", title: "Components/StepList", name: "Running", status: "porté", ...scenarios(StepListStories, "running") },
  { id: "components-steplist--starting", title: "Components/StepList", name: "Starting", status: "porté", ...scenarios(StepListStories, "starting") },
  { id: "components-steplist--done", title: "Components/StepList", name: "Done", status: "porté", ...scenarios(StepListStories, "done") },
  { id: "components-steplist--failed", title: "Components/StepList", name: "Failed", status: "porté", ...scenarios(StepListStories, "failed") },
  { id: "components-steplist--live", title: "Components/StepList", name: "Live", status: "porté", ...scenarios(StepListStories, "live") },
  // Toast
  { id: "components-toast--default", title: "Components/Toast", name: "Default", status: "porté", ...scenarios(ToastStories, "default") },
  { id: "components-toast--open", title: "Components/Toast", name: "Open", status: "porté", ...scenarios(ToastStories, "open") },
  { id: "components-toast--error", title: "Components/Toast", name: "Error", status: "porté", ...scenarios(ToastStories, "error") },
  { id: "components-toast--loading", title: "Components/Toast", name: "Loading", status: "porté", ...scenarios(ToastStories, "loading") },
  { id: "components-toast--many-items", title: "Components/Toast", name: "Many Items", status: "porté", ...scenarios(ToastStories, "many-items") },
  { id: "components-toast--long-text", title: "Components/Toast", name: "Long Text", status: "écart identifié", ...scenarios(ToastStories, "long-text") },
  { id: "components-toast--composition", title: "Components/Toast", name: "Composition", status: "porté", ...scenarios(ToastStories, "composition") },
  // NextPage
  { id: "patterns-nextpage--scrolling", title: "Patterns/NextPage", name: "Scrolling", status: "porté", ...scenarios(NextPageStories, "scrolling") },
  { id: "patterns-nextpage--fails-once", title: "Patterns/NextPage", name: "Fails Once", status: "porté", ...scenarios(NextPageStories, "fails-once") },
  { id: "patterns-nextpage--loading", title: "Patterns/NextPage", name: "Loading", status: "porté", ...scenarios(NextPageStories, "loading") },
  { id: "patterns-nextpage--failed", title: "Patterns/NextPage", name: "Failed", status: "porté", ...scenarios(NextPageStories, "failed") },
  // PersonAvatar
  { id: "patterns-personavatar--default", title: "Patterns/PersonAvatar", name: "Default", status: "porté", ...scenarios(PersonAvatarStories, "default") },
  { id: "patterns-personavatar--with-photo", title: "Patterns/PersonAvatar", name: "With Photo", status: "porté", ...scenarios(PersonAvatarStories, "with-photo") },
  { id: "patterns-personavatar--error", title: "Patterns/PersonAvatar", name: "Error", status: "porté", ...scenarios(PersonAvatarStories, "error") },
  { id: "patterns-personavatar--email-only", title: "Patterns/PersonAvatar", name: "Email Only", status: "porté", ...scenarios(PersonAvatarStories, "email-only") },
  { id: "patterns-personavatar--sizes", title: "Patterns/PersonAvatar", name: "Sizes", status: "porté", ...scenarios(PersonAvatarStories, "sizes") },
  { id: "patterns-personavatar--long-text", title: "Patterns/PersonAvatar", name: "Long Text", status: "porté", ...scenarios(PersonAvatarStories, "long-text") },
];

export default ENTRIES;
