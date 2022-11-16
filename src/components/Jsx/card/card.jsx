import "./card.less";
export default {
  render() {
      console.log(this.$slots)
    return (
      <div class="s-card">
        <header>
          <span>{this.title}</span>
          <div class="title-extra" >{this.$slots.extra}</div>
        </header>
        <div class="card-content">
            {this.$slots.default}
        </div>
        <footer>
            {this.$slots.actions}
        </footer>
      </div>
    );
  },
  props: {
    title: String,
  },
};
