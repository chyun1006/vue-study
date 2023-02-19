<template>
  <div id="mount-ele">
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <el-radio-group v-model="theme">
      <el-radio-button label="light"></el-radio-button>
      <el-radio-button label="dark"></el-radio-button>
    </el-radio-group>

    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <button @click="chage">click</button>
    <a-tree
      v-model="checkedKeys"
      checkable
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :selected-keys="selectedKeys"
      :tree-data="treeData"
      @expand="onExpand"
      @select="onSelect"
    />

    <div style="width: 500px">
      <CTree :treeData="treeData"></CTree>
    </div>
  </div>
</template>

<script>
import "@/utils/theme/base.css";

import CTree from "@/components/CTree";

const treeData = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-1",
        key: "0-0-1",
      },
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          {
            title: "0-0-0-0",
            key: "0-0-0-0",
            children: [
              { title: "0-0-0-0-0", key: "0-0-0-0-0" },
              { title: "0-0-0-0-1", key: "0-0-0-0-1" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "1-0",
    key: "1-0",
    isParent: true,
  },
];
export default {
  data() {
    return {
      theme: "dark",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      list: [1, 2, 3, 4],
      expandedKeys: ["0-0-0", "0-0-1"],
      autoExpandParent: true,
      checkedKeys: ["0-0-0-0-0"],
      selectedKeys: [],
      treeData,
    };
  },
  components: { CTree },
  watch: {
    theme: {
      handler: function (newV) {
        const url = `./theme/${newV}.css`;
        let link = document.getElementById("theme");
        if (link) {
          link.href = url;
        } else {
          link = document.createElement("link");
          link.rel = "stylesheet";
          link.id = "theme";
          link.type = "text/css";
          link.href = url;
          document.head.appendChild(link);
        }
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    chage() {
      this.list = [1, 3, 3, 4];
    },

    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
  },
};
</script>

<style lang="less">
// #app {
//   background-color: #212943;
// }
</style>
