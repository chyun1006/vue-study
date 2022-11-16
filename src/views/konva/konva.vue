<template>
  <div>
    <h2>konva</h2>
    <!-- <div id="container"></div> -->
    <c-table style="width:300px" :columns="columns" :dataSource="data">
      <template v-slot="age">{{age}}</template>
    </c-table>
  </div>
</template>

<script>
import { columns, data } from "./mock/table";
import CTable from "./components/table";
console.log(columns)
export default {
  data() {
    return {
      columns,
      data,
    };
  },
  components: { CTable },
  mounted() {
    // this.stage = new Konva.Stage({
    //   container: "container",
    //   width: 500,
    //   height: 500,
    // });

    // var layer = new Konva.Layer();

    // const lines = [];
    // const gap = 100;
    // Array.from({ length: 10 }).map((_, index) => {
    //   var line = new Konva.Line({
    //     points: [0, index * gap, 500, index * gap],
    //     stroke: "#999",
    //     strokeWidth: 1,
    //   });
    //   lines.push(line);
    // });

    // console.log("lines", lines);

    // this.stage.add(layer);
  },
};
</script>

<style></style>
