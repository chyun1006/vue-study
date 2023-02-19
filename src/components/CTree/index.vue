<template>
  <ul>
    <li v-for="(item, index) in treeData" :key="index">
      <div class="node-item" @click="toggle(item, index)">
        <span v-if="(item.children && item.children.length) || item.isParent"
          >?</span
        >
        <span>{{ item.title }}</span>
      </div>
      <template v-if="item.children && item.children.length && item.isOpen">
        <c-tree :treeData="item.children"></c-tree>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: "c-tree",
  data() {
    return {};
  },
  props: {
    treeData: Array, // treeNodes 数据
    showIcon: Boolean, // 是否展示 TreeNode title 前的图标
    selectedKeys: Array, // 设置选中的树节点
    autoExpandParent: Boolean, // 是否自动展开父节点
    // checkable: Boolean, // 节点前添加 Checkbox 复选框
  },
  methods: {
    // 点击复选框触发
    check() {},

    // 展开/收起节点时触发
    expand() {},

    // 点击树节点触发
    select() {},

    toggle(item, index) {
      console.log(item, index);
      // item.isOpen = !item.isOpen;
      this.$set(item, "isOpen", !item.isOpen);
    },
  },
};
</script>

<style scoped lang="less">
ul {
  padding: 0 8px;
  margin: 0 8px;
}

.node-item {
  cursor: pointer;
  display: block;
  &:hover {
    background-color: #eee;
  }
}
</style>
