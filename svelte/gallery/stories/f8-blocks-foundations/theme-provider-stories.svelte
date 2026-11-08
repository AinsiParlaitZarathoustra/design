<script lang="ts">
  import DitherField from "../../../src/lots/f8-blocks-foundations/blocks/dither-field.svelte";
  import ThemeProvider from "../../../src/lots/f8-blocks-foundations/deps/theme-provider.svelte";
  import { STORAGE_KEY } from "../../../src/lib/theme-script";

  interface Props {
    appearance?: string;
  }

  let { appearance = "dark" }: Props = $props();

  // The source's decorator seeds the stored setting from the toolbar, so the
  // provider and the toolbar agree on the appearance. It runs before the
  // provider reads the setting on mount.
  $effect.pre(() => {
    try {
      localStorage.setItem(STORAGE_KEY, appearance);
    } catch {
      // A blocked storage API leaves the provider on the URL's appearance.
    }
  });
</script>

<ThemeProvider theme="atlas">
  <div class="relative h-80 w-full overflow-hidden rounded-md border border-border">
    <DitherField />
  </div>
</ThemeProvider>
