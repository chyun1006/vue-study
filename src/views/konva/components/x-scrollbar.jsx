export default {
  props: {
    width: Number,
  },
  render() {
    return (
      <div
        class="horizontal-scrollbar"
        onScroll={this.onScroll}
      >
        <div class="scroll-inner" style={{ width: `${this.width}px` }}></div>
      </div>
    );
  },

  methods: {
    onScroll(e) {
      this.$emit("scroll", e);
    },
  },
};
