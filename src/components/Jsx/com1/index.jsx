import "./style.less";
import Child from "./child";
export default {
  render() {
    console.log("render");
    const contentScopeSlot = this.$scopedSlots.content
      ? this.$scopedSlots.content({ data: this.msg })
      : "";
    const defaultScopeSlot = this.$scopedSlots.default({ data: "adad" });

    return (
      <div class="title">
        <h1>{defaultScopeSlot}</h1>
        <h4>{contentScopeSlot}</h4>
        <Child
          scopedSlots={{
            title: this.$scopedSlots.title,
          }}
        ></Child>
        <button onClick={this._click}>click</button>
      </div>
    );
  },
  props: {
    msg: String,
  },
  methods: {
    _click() {
      this.msg = "afdsadsf";
    },
  },
};
