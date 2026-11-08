import type { Component } from "svelte";
import type { StoryEntry } from "../types";
import Stories from "./f8-blocks-foundations-stories.svelte";
import GlobeStories from "./f8-blocks-foundations/globe-stories.svelte";
import CheckpointTraceStories from "./f8-blocks-foundations/checkpoint-trace-stories.svelte";

const scenario = (story: string) => ({
  component: Stories as unknown as Component<Record<string, never>>,
  props: { story },
});

const globeScenario = (story: string) => ({
  component: GlobeStories as unknown as Component<Record<string, never>>,
  props: { story },
});

const checkpointScenario = (story: string) => ({
  component: CheckpointTraceStories as unknown as Component<Record<string, never>>,
  props: { story },
});

const entries: StoryEntry[] = [
  // Components/DitherField
  { id: "components-ditherfield--default", title: "Components/DitherField", name: "Default", status: "écart identifié", ...scenario("dither-default") },
  { id: "components-ditherfield--dots", title: "Components/DitherField", name: "Dots", status: "écart identifié", ...scenario("dither-dots") },
  { id: "components-ditherfield--recoloured", title: "Components/DitherField", name: "Recoloured", status: "écart identifié", ...scenario("dither-recoloured") },
  { id: "components-ditherfield--inside-theme-provider", title: "Components/DitherField", name: "Inside Theme Provider", status: "écart identifié", ...scenario("dither-inside-theme-provider") },
  { id: "components-ditherfield--with-copy", title: "Components/DitherField", name: "With Copy", status: "écart identifié", ...scenario("dither-with-copy") },
  { id: "components-ditherfield--no-canvas", title: "Components/DitherField", name: "No Canvas", status: "porté", ...scenario("dither-no-canvas") },

  // Foundations pages
  { id: "foundations-principles--page", title: "Foundations/Principles", name: "Page", status: "porté", ...scenario("foundations-principles") },
  { id: "foundations-colour--page", title: "Foundations/Colour", name: "Page", status: "écart identifié", ...scenario("foundations-colour") },
  { id: "foundations-type--page", title: "Foundations/Type", name: "Page", status: "porté", ...scenario("foundations-type") },
  { id: "foundations-control-heights--page", title: "Foundations/Control heights", name: "Page", status: "porté", ...scenario("foundations-control-heights") },
  { id: "foundations-spacing--page", title: "Foundations/Spacing", name: "Page", status: "écart identifié", ...scenario("foundations-spacing") },
  { id: "foundations-radius--page", title: "Foundations/Radius", name: "Page", status: "écart identifié", ...scenario("foundations-radius") },
  { id: "foundations-elevation--page", title: "Foundations/Elevation", name: "Page", status: "porté", ...scenario("foundations-elevation") },
  { id: "foundations-z-index--page", title: "Foundations/Z-index", name: "Page", status: "écart identifié", ...scenario("foundations-z-index") },
  { id: "foundations-motion--page", title: "Foundations/Motion", name: "Page", status: "écart identifié", ...scenario("foundations-motion") },
  { id: "foundations-icons--page", title: "Foundations/Icons", name: "Page", status: "écart identifié", ...scenario("foundations-icons") },

  // Blocks/PlusDecorator
  { id: "blocks-plusdecorator--default", title: "Blocks/PlusDecorator", name: "Default", status: "porté", ...scenario("plus-default") },
  { id: "blocks-plusdecorator--all-corners", title: "Blocks/PlusDecorator", name: "All Corners", status: "porté", ...scenario("plus-all-corners") },

  // Blocks/DashedRails
  { id: "blocks-dashedrails--default", title: "Blocks/DashedRails", name: "Default", status: "porté", ...scenario("dashed-rails-default") },
  { id: "blocks-dashedrails--faded", title: "Blocks/DashedRails", name: "Faded", status: "porté", ...scenario("dashed-rails-faded") },
  { id: "blocks-dashedrails--fixed-offset", title: "Blocks/DashedRails", name: "Fixed Offset", status: "porté", ...scenario("dashed-rails-fixed-offset") },

  // Blocks/GhostCards
  { id: "blocks-ghostcards--default", title: "Blocks/GhostCards", name: "Default", status: "porté", ...scenario("ghost-default") },
  { id: "blocks-ghostcards--long-text", title: "Blocks/GhostCards", name: "Long Text", status: "porté", ...scenario("ghost-long-text") },

  // Blocks/GradualBlur
  { id: "blocks-gradualblur--bottom", title: "Blocks/GradualBlur", name: "Bottom", status: "porté", ...scenario("gradual-blur-bottom") },
  { id: "blocks-gradualblur--top", title: "Blocks/GradualBlur", name: "Top", status: "porté", ...scenario("gradual-blur-top") },
  { id: "blocks-gradualblur--tinted", title: "Blocks/GradualBlur", name: "Tinted", status: "porté", ...scenario("gradual-blur-tinted") },
  { id: "blocks-gradualblur--off", title: "Blocks/GradualBlur", name: "Off", status: "porté", ...scenario("gradual-blur-off") },

  // Blocks/InfiniteSlider
  { id: "blocks-infiniteslider--default", title: "Blocks/InfiniteSlider", name: "Default", status: "écart identifié", ...scenario("infinite-slider-default") },
  { id: "blocks-infiniteslider--reverse", title: "Blocks/InfiniteSlider", name: "Reverse", status: "écart identifié", ...scenario("infinite-slider-reverse") },
  { id: "blocks-infiniteslider--vertical", title: "Blocks/InfiniteSlider", name: "Vertical", status: "écart identifié", ...scenario("infinite-slider-vertical") },
  { id: "blocks-infiniteslider--many-items", title: "Blocks/InfiniteSlider", name: "Many Items", status: "écart identifié", ...scenario("infinite-slider-many-items") },
  { id: "blocks-infiniteslider--capped", title: "Blocks/InfiniteSlider", name: "Capped", status: "écart identifié", ...scenario("infinite-slider-capped") },

  // Blocks/TimelineCalendar
  { id: "blocks-timelinecalendar--default", title: "Blocks/TimelineCalendar", name: "Default", status: "porté", ...scenario("timeline-calendar-default") },
  { id: "blocks-timelinecalendar--empty", title: "Blocks/TimelineCalendar", name: "Empty", status: "porté", ...scenario("timeline-calendar-empty") },
  { id: "blocks-timelinecalendar--long-text", title: "Blocks/TimelineCalendar", name: "Long Text", status: "porté", ...scenario("timeline-calendar-long-text") },
  { id: "blocks-timelinecalendar--many-items", title: "Blocks/TimelineCalendar", name: "Many Items", status: "porté", ...scenario("timeline-calendar-many-items") },
  { id: "blocks-timelinecalendar--scrolled", title: "Blocks/TimelineCalendar", name: "Scrolled", status: "écart identifié", ...scenario("timeline-calendar-scrolled") },
  { id: "blocks-timelinecalendar--flush", title: "Blocks/TimelineCalendar", name: "Flush", status: "porté", ...scenario("timeline-calendar-flush") },
  { id: "blocks-timelinecalendar--scrolled-to-end", title: "Blocks/TimelineCalendar", name: "Scrolled To End", status: "porté", ...scenario("timeline-calendar-scrolled-to-end") },
  { id: "blocks-timelinecalendar--measured-end", title: "Blocks/TimelineCalendar", name: "Measured End", status: "porté", ...scenario("timeline-calendar-measured-end") },

  // Blocks/ScrollRail
  { id: "blocks-scrollrail--default", title: "Blocks/ScrollRail", name: "Default", status: "écart identifié", ...scenario("scroll-rail-default") },
  { id: "blocks-scrollrail--halfway", title: "Blocks/ScrollRail", name: "Halfway", status: "écart identifié", ...scenario("scroll-rail-halfway") },
  { id: "blocks-scrollrail--empty", title: "Blocks/ScrollRail", name: "Empty", status: "écart identifié", ...scenario("scroll-rail-empty") },

  // Blocks/Globe
  { id: "blocks-globe--default", title: "Blocks/Globe", name: "Default", status: "écart identifié", ...globeScenario("globe-default") },
  { id: "blocks-globe--empty", title: "Blocks/Globe", name: "Empty", status: "écart identifié", ...globeScenario("globe-empty") },
  { id: "blocks-globe--still", title: "Blocks/Globe", name: "Still", status: "écart identifié", ...globeScenario("globe-still") },
  { id: "blocks-globe--long-text", title: "Blocks/Globe", name: "Long Text", status: "écart identifié", ...globeScenario("globe-long-text") },
  { id: "blocks-globe--no-webgl", title: "Blocks/Globe", name: "No Webgl", status: "porté", ...globeScenario("globe-no-webgl") },
  { id: "blocks-globe--custom-fallback", title: "Blocks/Globe", name: "Custom Fallback", status: "écart identifié", ...globeScenario("globe-custom-fallback") },

  // Blocks/CheckpointTrace
  { id: "blocks-checkpointtrace--org-week", title: "Blocks/CheckpointTrace", name: "Org Week", status: "écart identifié", ...checkpointScenario("org-week") },
  { id: "blocks-checkpointtrace--keyboard", title: "Blocks/CheckpointTrace", name: "Keyboard", status: "écart identifié", ...checkpointScenario("keyboard") },
  { id: "blocks-checkpointtrace--pan-and-zoom", title: "Blocks/CheckpointTrace", name: "Pan And Zoom", status: "écart identifié", ...checkpointScenario("pan-and-zoom") },
  { id: "blocks-checkpointtrace--project-day", title: "Blocks/CheckpointTrace", name: "Project Day", status: "écart identifié", ...checkpointScenario("project-day") },
  { id: "blocks-checkpointtrace--live", title: "Blocks/CheckpointTrace", name: "Live", status: "écart identifié", ...checkpointScenario("live") },
  { id: "blocks-checkpointtrace--dense-clustering", title: "Blocks/CheckpointTrace", name: "Dense Clustering", status: "écart identifié", ...checkpointScenario("dense-clustering") },
  { id: "blocks-checkpointtrace--group-by-person", title: "Blocks/CheckpointTrace", name: "Group By Person", status: "écart identifié", ...checkpointScenario("group-by-person") },
  { id: "blocks-checkpointtrace--group-by-project", title: "Blocks/CheckpointTrace", name: "Group By Project", status: "écart identifié", ...checkpointScenario("group-by-project") },
  { id: "blocks-checkpointtrace--empty", title: "Blocks/CheckpointTrace", name: "Empty", status: "porté", ...checkpointScenario("empty") },
  { id: "blocks-checkpointtrace--loading", title: "Blocks/CheckpointTrace", name: "Loading", status: "porté", ...checkpointScenario("loading") },
  { id: "blocks-checkpointtrace--error-state", title: "Blocks/CheckpointTrace", name: "Error State", status: "porté", ...checkpointScenario("error-state") },
  { id: "blocks-checkpointtrace--error-with-retry", title: "Blocks/CheckpointTrace", name: "Error With Retry", status: "porté", ...checkpointScenario("error-with-retry") },
  { id: "blocks-checkpointtrace--long-titles", title: "Blocks/CheckpointTrace", name: "Long Titles", status: "écart identifié", ...checkpointScenario("long-titles") },
  { id: "blocks-checkpointtrace--team-week", title: "Blocks/CheckpointTrace", name: "Team Week", status: "écart identifié", ...checkpointScenario("team-week") },
  { id: "blocks-checkpointtrace--dense-clusters-with-titles", title: "Blocks/CheckpointTrace", name: "Dense Clusters With Titles", status: "écart identifié", ...checkpointScenario("dense-clusters-with-titles") },
  { id: "blocks-checkpointtrace--mixed-titles", title: "Blocks/CheckpointTrace", name: "Mixed Titles", status: "écart identifié", ...checkpointScenario("mixed-titles") },
  { id: "blocks-checkpointtrace--compact", title: "Blocks/CheckpointTrace", name: "Compact", status: "écart identifié", ...checkpointScenario("compact") },
  { id: "blocks-checkpointtrace--many-sessions", title: "Blocks/CheckpointTrace", name: "Many Sessions", status: "écart identifié", ...checkpointScenario("many-sessions") },
  { id: "blocks-checkpointtrace--placeholder-initials", title: "Blocks/CheckpointTrace", name: "Placeholder Initials", status: "écart identifié", ...checkpointScenario("placeholder-initials") },

  // Components/LogoMarquee
  { id: "components-logomarquee--default", title: "Components/LogoMarquee", name: "Default", status: "écart identifié", ...scenario("logo-marquee-default") },
  { id: "components-logomarquee--marks", title: "Components/LogoMarquee", name: "Marks", status: "écart identifié", ...scenario("logo-marquee-marks") },
  { id: "components-logomarquee--no-label", title: "Components/LogoMarquee", name: "No Label", status: "écart identifié", ...scenario("logo-marquee-no-label") },
  { id: "components-logomarquee--many-items", title: "Components/LogoMarquee", name: "Many Items", status: "écart identifié", ...scenario("logo-marquee-many-items") },
];

export default entries;
