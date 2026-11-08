<script lang="ts">
  // Progressive ("gradual") blur for a scroll edge. Desktop's `GradualBlur`,
  // ported as it is.
  //
  // A plain gradient fade hides content by painting the background colour over it.
  // This instead blurs it, ramping from nothing to full over the band, so text
  // dissolves rather than being curtained off. The technique (after
  // reactbits.dev/animations/gradual-blur): stack N layers, each with a stronger
  // `backdrop-filter`, and mask each one to a narrow horizontal band. Where the
  // bands overlap the blurs composite, and the result reads as continuous.
  //
  // Cost: every layer is a live `backdrop-filter`. `layers` defaults to 5 and
  // should not casually grow. A `contain` on the container keeps each layer's
  // work scoped. `layers={0}` turns the effect off.

  export type BlurEdge = "top" | "bottom";
  export type BlurCurve = "linear" | "bezier" | "ease-in" | "ease-out";

  interface Props {
    /** Which edge of the (positioned) parent to sit on. */
    position: BlurEdge;
    /** Band height, any CSS length. */
    height?: string;
    /** Peak blur radius in rem at the strongest layer. */
    strength?: number;
    /** How many masked layers to stack. 0 disables the effect entirely. */
    layers?: number;
    /**
     * Ramp shape across the band. `bezier` (smoothstep) eases in and out and is
     * the most natural for a reading edge; `linear` ramps evenly.
     */
    curve?: BlurCurve;
    /** Bias the ramp so most of the blur happens near the edge. */
    exponential?: boolean;
    /** Optional colour wash composited under the blur. Pass a CSS colour. */
    tint?: string;
    class?: string;
    style?: string;
  }

  let {
    position,
    height = "5rem",
    strength = 2,
    layers = 5,
    curve = "bezier",
    exponential = true,
    tint,
    class: className,
    style,
  }: Props = $props();

  const CURVES: Record<string, (p: number) => number> = {
    linear: (p) => p,
    bezier: (p) => p * p * (3 - 2 * p),
    "ease-in": (p) => p * p,
    "ease-out": (p) => 1 - Math.pow(1 - p, 2),
  };

  // The mask runs FROM the edge we sit on, so band 1 (least blurred) is the one
  // furthest into the content and band N (most blurred) hugs the edge.
  const direction = $derived(position === "top" ? "to top" : "to bottom");

  const blurLayers = $derived.by(() => {
    if (layers <= 0) return [] as string[];
    const step = 100 / layers;
    const curveFn = CURVES[curve] ?? CURVES.linear!;
    const out: string[] = [];

    for (let i = 1; i <= layers; i++) {
      const progress = curveFn(i / layers);
      const blur = exponential
        ? Math.pow(2, progress * 4) * 0.0625 * strength
        : 0.0625 * (progress * layers + 1) * strength;

      // Four stops per band: ramp up, hold, ramp down. Neighbouring bands
      // overlap by one step, which is what keeps the seams invisible.
      const p1 = Math.round((step * i - step) * 10) / 10;
      const p2 = Math.round(step * i * 10) / 10;
      const p3 = Math.round((step * i + step) * 10) / 10;
      const p4 = Math.round((step * i + step * 2) * 10) / 10;
      let stops = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) stops += `, black ${p3}%`;
      if (p4 <= 100) stops += `, transparent ${p4}%`;

      const mask = `linear-gradient(${direction}, ${stops})`;
      const filter = `blur(${blur.toFixed(3)}rem)`;
      out.push(
        `position: absolute; inset: 0; mask-image: ${mask}; -webkit-mask-image: ${mask}; backdrop-filter: ${filter}; -webkit-backdrop-filter: ${filter};`,
      );
    }
    return out;
  });

  const rootStyle = $derived(
    `position: absolute; left: 0; right: 0; ${position}: 0; height: ${height}; pointer-events: none; isolation: isolate; contain: layout paint; ${style ?? ""}`,
  );
</script>

{#if !(layers <= 0 && !tint)}
  <div aria-hidden="true" class={className} style={rootStyle}>
    {#each blurLayers as layerStyle, i (i)}
      <div style={layerStyle}></div>
    {/each}
    <!-- Colour wash over the blur. Reaches full tint at 65% and holds it the
         rest of the way, so the strip nearest the edge has a real backing. -->
    {#if tint}
      <div
        style="position: absolute; inset: 0; background: linear-gradient({direction}, transparent 0%, {tint} 65%, {tint} 100%);"
      ></div>
    {/if}
  </div>
{/if}
