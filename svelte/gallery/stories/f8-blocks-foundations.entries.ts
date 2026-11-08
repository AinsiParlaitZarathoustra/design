import type { Component } from "svelte";
import type { StoryEntry } from "../types";
import Stories from "./f8-blocks-foundations-stories.svelte";

const scenario = (story: string) => ({
  component: Stories as unknown as Component<Record<string, never>>,
  props: { story },
});

const entries: StoryEntry[] = [
  // Components/DitherField (Inside Theme Provider: blocked, no ThemeProvider port)
  { id: "components-ditherfield--default", title: "Components/DitherField", name: "Default", status: "porté", ...scenario("dither-default") },
  { id: "components-ditherfield--dots", title: "Components/DitherField", name: "Dots", status: "porté", ...scenario("dither-dots") },
  { id: "components-ditherfield--recoloured", title: "Components/DitherField", name: "Recoloured", status: "porté", ...scenario("dither-recoloured") },
  { id: "components-ditherfield--with-copy", title: "Components/DitherField", name: "With Copy", status: "porté", ...scenario("dither-with-copy") },
  { id: "components-ditherfield--no-canvas", title: "Components/DitherField", name: "No Canvas", status: "porté", ...scenario("dither-no-canvas") },

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

  // Blocks/ScrollRail
  { id: "blocks-scrollrail--default", title: "Blocks/ScrollRail", name: "Default", status: "porté", ...scenario("scroll-rail-default") },
  { id: "blocks-scrollrail--halfway", title: "Blocks/ScrollRail", name: "Halfway", status: "porté", ...scenario("scroll-rail-halfway") },
  { id: "blocks-scrollrail--empty", title: "Blocks/ScrollRail", name: "Empty", status: "porté", ...scenario("scroll-rail-empty") },

  // Components/LogoMarquee (Marks: blocked, the brand marks are not ported)
  { id: "components-logomarquee--default", title: "Components/LogoMarquee", name: "Default", status: "porté", ...scenario("logo-marquee-default") },
  { id: "components-logomarquee--no-label", title: "Components/LogoMarquee", name: "No Label", status: "porté", ...scenario("logo-marquee-no-label") },
  { id: "components-logomarquee--many-items", title: "Components/LogoMarquee", name: "Many Items", status: "écart identifié", ...scenario("logo-marquee-many-items") },
];

export default entries;
