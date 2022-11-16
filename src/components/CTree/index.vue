<template>
  <ul>
    <li v-for="(item, index) in treeData" :key="index">
      <span>{{ item.title }}</span>
      <template v-if="item.children && item.children.length">
        <c-tree :treeData="item.children"></c-tree>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'c-tree',
  data() {
    return {}
  },
  props: {
    treeData: Array, // treeNodes 数据
    showIcon: Boolean, // 是否展示 TreeNode title 前的图标
    selectedKeys: Array, // 设置选中的树节点
    autoExpandParent: Boolean, // 是否自动展开父节点
    checkable: Boolean, // 节点前添加 Checkbox 复选框
  },
  methods: {
    // 点击复选框触发
    check() {},

    // 展开/收起节点时触发
    expand() {},

    // 点击树节点触发
    select() {},
  },
}
</script>

<style scoped lang="less">
ul {
  padding: 0 8px;
  margin: 0 8px;
}
</style>
