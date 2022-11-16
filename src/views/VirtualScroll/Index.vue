<template>
  <div>
    <!-- <h2>虚拟滚动</h2>
    <virtualList
      :height="viewAreaHeight"
      :containerHeight="sumHeight"
      :dataSource="dataList"
    ></virtualList>

    <div class="box">
      <div class="content"></div>
    </div> -->

    <c-select
      :options="options"
      v-model="selectValue"
      valueProp="id"
      style="width: 280px"
      placeholder="请选择人员"
      show-search
      :filter-option="filterOption"
      @select="onSelect"
    >
      <template v-slot:selectOption="record">
        {{ `${record.workId}-${record.name}` }}
      </template>
    </c-select>
  </div>
</template>

<script>
// import Node from "./node.vue";
// import virtualList from "./jsx/index.jsx";
import { calcSumHeight, getRandomArbitrary } from "./utils";
// import CSelect from "@/components/c-select/index.vue"
import CSelect from "@/components/c-select/index";
import SelectData from "@/mock/select-data.js";
// const options = Array.from({ length: 1000 }).map((_, index) => index);

const data = [];
const rows = 50;

const nodeCount = 50;
for (let m = 0; m < rows; m++) {
  const row = {
    id: m,
    height: getRandomArbitrary(50, 80),
    width: 1000,
    nodes: [],
  };
  const nodes = [];
  for (let n = 0; n < nodeCount; n++) {
    nodes.push({
      id: `node-${n}`,
      top: row.height / 2 - 10,
      left: 50 * n + getRandomArbitrary(10, 50),
      width: 30,
      height: 20,
    });
  }
  row.nodes = nodes;
  data.push(row);
}

// const bufferSize = 2;
const sumHeight = calcSumHeight(data);
export default {
  data() {
    return {
      dataList: data,
      options: [],
      sumHeight,
      viewAreaHeight: 500,
      selectValue: "",
      replaceField: {
        id: "id",
        text: "name",
      },
    };
  },
  components: {
    // Node,
    // virtualList,
    CSelect,
  },
  mounted() {
    this.getServerData();
  },
  methods: {
    onSelect(value, data) {
      console.log("onselect", value, data);
      console.log("selectValue", this.selectValue);
    },

    getServerData() {
      setTimeout(() => {
        this.options = SelectData;
      }, 1000);
    },

    filterOption(value, options) {
      return options[0].text.indexOf(value) != -1;
    },
  },
};
</script>

<style>
.container {
  /* height: 500px; */
  width: 500px;
  overflow: auto;
  background-color: #f4433645;
  position: relative;
}

.virtualContainer {
}

.scrollList {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
}
.node-row {
  position: relative;
}

.box {
  height: 20px;
  width: 500px;
  background-color: red;
  overflow: auto;
}
.content {
  width: 2000px;
  height: 1px;
}
</style>
