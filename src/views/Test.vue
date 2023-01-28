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
  </div>
</template>

<script>
import "@/utils/theme/base.css";
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
    };
  },
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
  },
};
</script>

<style lang="less">
// #app {
//   background-color: #212943;
// }
</style>
