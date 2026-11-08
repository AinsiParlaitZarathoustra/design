import type { Component } from "svelte";
import type { StoryEntry } from "../types";
import Stories from "./f8-blocks-foundations-stories.svelte";
import GlobeStories from "./f8-blocks-foundations/globe-stories.svelte";

const scenario = (story: string) => ({
  component: Stories as unknown as Component<Record<string, never>>,
  props: { story },
});

const globeScenario = (story: string) => ({
  component: GlobeStories as unknown as Component<Record<string, never>>,
  props: { story },
});

const entries: StoryEntry[] = [
  // Components/DitherField (Inside Theme Provider: blocked, no ThemeProvider port)
  { id: "components-ditherfield--default", title: "Components/DitherField", name: "Default", status: "porté", ...scenario("dither-default") },
  { id: "components-ditherfield--dots", title: "Components/DitherField", name: "Dots", status: "porté", ...scenario("dither-dots") },
  { id: "components-ditherfield--recoloured", title: "Components/DitherField", name: "Recoloured", status: "porté", ...scenario("dither-recoloured") },
  { id: "components-ditherfield--with-copy", title: "Components/DitherField", name: "With Copy", status: "porté", ...scenario("dither-with-copy") },
  { id: "components-ditherfield--no-canvas", title: "Components/DitherField", name: "No Canvas", status: "porté", ...scenario("dither-no-canvas") },

  // Foundations pages (Control heights and Motion are blocked: ModelBadge and Segmented are not ported)
  { id: "foundations-principles--page", title: "Foundations/Principles", name: "Page", status: "porté", ...scenario("foundations-principles") },
  { id: "foundations-colour--page", title: "Foundations/Colour", name: "Page", status: "écart identifié", ...scenario("foundations-colour") },
  { id: "foundations-type--page", title: "Foundations/Type", name: "Page", status: "écart identifié", ...scenario("foundations-type") },
  { id: "foundations-spacing--page", title: "Foundations/Spacing", name: "Page", status: "écart identifié", ...scenario("foundations-spacing") },
  { id: "foundations-radius--page", title: "Foundations/Radius", name: "Page", status: "porté", ...scenario("foundations-radius") },
  { id: "foundations-elevation--page", title: "Foundations/Elevation", name: "Page", status: "porté", ...scenario("foundations-elevation") },
  { id: "foundations-z-index--page", title: "Foundations/Z-index", name: "Page", status: "porté", ...scenario("foundations-z-index") },
  { id: "foundations-icons--page", title: "Foundations/Icons", name: "Page", status: "porté", ...scenario("foundations-icons") },

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
  { id: "blocks-infiniteslider--default", title: "Blocks/InfiniteSlider", name: "Default", status: "porté", ...scenario("infinite-slider-default") },
  { id: "blocks-infiniteslider--reverse", title: "Blocks/InfiniteSlider", name: "Reverse", status: "porté", ...scenario("infinite-slider-reverse") },
  { id: "blocks-infiniteslider--vertical", title: "Blocks/InfiniteSlider", name: "Vertical", status: "porté", ...scenario("infinite-slider-vertical") },
  { id: "blocks-infiniteslider--many-items", title: "Blocks/InfiniteSlider", name: "Many Items", status: "écart identifié", ...scenario("infinite-slider-many-items") },
  { id: "blocks-infiniteslider--capped", title: "Blocks/InfiniteSlider", name: "Capped", status: "porté", ...scenario("infinite-slider-capped") },

  // Blocks/TimelineCalendar
  { id: "blocks-timelinecalendar--default", title: "Blocks/TimelineCalendar", name: "Default", status: "porté", ...scenario("timeline-calendar-default") },
  { id: "blocks-timelinecalendar--empty", title: "Blocks/TimelineCalendar", name: "Empty", status: "porté", ...scenario("timeline-calendar-empty") },
  { id: "blocks-timelinecalendar--long-text", title: "Blocks/TimelineCalendar", name: "Long Text", status: "porté", ...scenario("timeline-calendar-long-text") },
  { id: "blocks-timelinecalendar--many-items", title: "Blocks/TimelineCalendar", name: "Many Items", status: "porté", ...scenario("timeline-calendar-many-items") },
  { id: "blocks-timelinecalendar--scrolled", title: "Blocks/TimelineCalendar", name: "Scrolled", status: "porté", ...scenario("timeline-calendar-scrolled") },
  { id: "blocks-timelinecalendar--flush", title: "Blocks/TimelineCalendar", name: "Flush", status: "porté", ...scenario("timeline-calendar-flush") },
  { id: "blocks-timelinecalendar--scrolled-to-end", title: "Blocks/TimelineCalendar", name: "Scrolled To End", status: "porté", ...scenario("timeline-calendar-scrolled-to-end") },
  { id: "blocks-timelinecalendar--measured-end", title: "Blocks/TimelineCalendar", name: "Measured End", status: "porté", ...scenario("timeline-calendar-measured-end") },

  // Blocks/ScrollRail
  { id: "blocks-scrollrail--default", title: "Blocks/ScrollRail", name: "Default", status: "porté", ...scenario("scroll-rail-default") },
  { id: "blocks-scrollrail--halfway", title: "Blocks/ScrollRail", name: "Halfway", status: "porté", ...scenario("scroll-rail-halfway") },
  { id: "blocks-scrollrail--empty", title: "Blocks/ScrollRail", name: "Empty", status: "porté", ...scenario("scroll-rail-empty") },

  // Blocks/Globe
  { id: "blocks-globe--default", title: "Blocks/Globe", name: "Default", status: "porté", ...globeScenario("globe-default") },
  { id: "blocks-globe--empty", title: "Blocks/Globe", name: "Empty", status: "porté", ...globeScenario("globe-empty") },
  { id: "blocks-globe--still", title: "Blocks/Globe", name: "Still", status: "porté", ...globeScenario("globe-still") },
  { id: "blocks-globe--long-text", title: "Blocks/Globe", name: "Long Text", status: "porté", ...globeScenario("globe-long-text") },
  { id: "blocks-globe--no-webgl", title: "Blocks/Globe", name: "No Webgl", status: "porté", ...globeScenario("globe-no-webgl") },
  { id: "blocks-globe--custom-fallback", title: "Blocks/Globe", name: "Custom Fallback", status: "porté", ...globeScenario("globe-custom-fallback") },

  // Components/LogoMarquee (Marks: blocked, the brand marks are not ported)
  { id: "components-logomarquee--default", title: "Components/LogoMarquee", name: "Default", status: "porté", ...scenario("logo-marquee-default") },
  { id: "components-logomarquee--no-label", title: "Components/LogoMarquee", name: "No Label", status: "porté", ...scenario("logo-marquee-no-label") },
  { id: "components-logomarquee--many-items", title: "Components/LogoMarquee", name: "Many Items", status: "écart identifié", ...scenario("logo-marquee-many-items") },
];

export default entries;
