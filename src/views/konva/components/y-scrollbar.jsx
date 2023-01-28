import config from "./config"
export default {
  props: {
    height: Number,
  },
  render() {
    return (
      <div
        class="vertical-scrollbar"
        ref="vertical-scrollbar"
        onScroll={this.onScroll}
        style={{top:`${config.headerHeight}px`}}
      >
        <div class="scroll-inner" style={{ height: `${this.height}px` }}></div>
      </div>
    );
  },

  methods: {
    onScroll(e) {
      this.$emit("scroll", e);
    },
  },
};
