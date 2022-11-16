<template>
  <div>
    <h2>zrender</h2>
    <c-table style="width: 300px" :columns="columns" :dataSource="data">
      <template v-slot:tags="{ record }">
        <el-tag size="mini" v-for="item in record.tags" :key="item">{{
          item
        }}</el-tag>
      </template>
    </c-table>
  </div>
</template>

<script>
import { columns, data } from "./mock/table";
import CTable from "./components/zrender-table";
export default {
  data() {
    return {
      columns,
      data,
    };
  },
  components: { CTable },
  mounted() {},
};
</script>

<style></style>
