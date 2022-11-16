export default {
  name: 'tree-node',
  props: {
    data: Object,
  },
  render() {
    return (
      <ul>
        <li>{this.data.text}</li>
        {this.renderChild()}
      </ul>
    )
  },
  methods: {
    renderChild() {
      if (this.data.children && this.data.children.length) {
        return <tree-node data={this.data}></tree-node>
      } else {
        return <span></span>
      }
    },
  },
}
