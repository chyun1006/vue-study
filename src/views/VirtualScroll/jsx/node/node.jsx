import './node.less'
export default {
  name: "Node",
  props: {
    height: Number,
    width: Number,
    top: Number,
    left: Number,
  },
  render() {
    console.log('node render')
    return (
      <div
        class="node"
        style={{
          height: `${this.height}px`,
          width: `${this.width}px`,
          top: `${this.top}px`,
          left: `${this.left}px`,
        }}
      ></div>
    );
  },
  methods: {},
};
