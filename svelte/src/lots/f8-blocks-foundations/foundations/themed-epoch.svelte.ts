// The gallery writes the appearance on <html> in an effect, after the story has
// rendered, so a read at render time would see the root's default theme. This
// epoch moves past once the first frame has passed; readers of the live theme
// variables depend on it and read again, as the source does after its decorator.
const clock = $state({ frame: 0 });

if (typeof window !== "undefined") {
  requestAnimationFrame(() => {
    clock.frame++;
  });
}

export const themedEpoch = {
  get current() {
    return clock.frame;
  },
};
