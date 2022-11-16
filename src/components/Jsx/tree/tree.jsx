import TreeNode from './tree-node'

export default {
  props: {
    treeData: Array,
  },
  components: { TreeNode },
  render() {
    const nodes = this.treeData.map((node) => {
      return <TreeNode data={node}></TreeNode>
    })
    return <div>{nodes}</div>
  },
}
