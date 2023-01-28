<template>
  <div>
    <h2>zrender</h2>
    <c-table
      style="width: 100%"
      :max-height="500"
      :columns="columns"
      :dataSource="data"
      :row-style="customRow"
      :cell-style="customRow"
    >
      <!-- <template v-slot:tags="{ record }">
        <el-tag size="mini" v-for="item in record.tags" :key="item">{{
          item
        }}</el-tag>
      </template> -->
    </c-table>
    <h2>zrender</h2>

    <div class="canvas-container" ref="canvas-container"></div>
    <button @click="handleClick">click</button>
  </div>
</template>

<script>
import { columns, genData } from "./mock/table";
import { init, Rect, Text, Group } from "zrender/dist/zrender";

import CTable from "./components/index";

function createCell(
  text,
  { background, width = 100, height = 30, position = [10, 10] }
) {
  const group = new Group({
    id: `header-group-23`,
    x: position[0],
    y: position[1],
  });

  const rect = new Rect({
    style: {
      fill: background,
    },
    textContent: new Text({
      style: {
        text: text,
        fontSize: 12,
      },
    }),
    shape: {
      width: width,
      height: height,
    },
    textConfig: {
      position: "insideLeft",
    },
  });
  group.add(rect);
  return group;
}
export default {
  data() {
    return {
      columns,
      data: [],
    };
  },
  components: { CTable },
  mounted() {
    this.data = genData();

    this.tableCanvasRef = this.$refs["canvas-container"];
    this.zr = init(this.tableCanvasRef, {
      width: 500,
      height: 500,
    });

    const cell1 = createCell("hello", { position: [10, 10], width: 100 });
    const cell2 = createCell("world", {
      position: [110, 10],
      background: "red",
    });

    const spliter = new Rect({
      style: {
        fill: "pink",
      },
      shape: {
        width: 10,
        height: 30,
      },
      onmousedown
    });

    this.zr.add(cell1);
    this.zr.add(cell2);
    this.zr.add(spliter);

    console.log("adsfasdf", this.zr);
  },

  methods: {
    customCell({ row, rowIndex }) {
      console.log("customCell", row, rowIndex);
    },

    customRow({ row }) {
      console.log("--customRow--", row);
      // if (row.name == "测试姓名3") {
      //   return {
      //     backgroundColor: "red",
      //   };
      // }
    },

    handleClick() {
      const group = this.zr.storage._roots[1];
      const x = group.x;
      group.attr({
        x: x - 10,
      });
    },
  },
};
</script>

<style></style>
