<template>
  <div>
    <el-table :data="tableData" v-loading="loading" v-bind="$attrs">
      <el-table-column v-for="col in columns" :key="col.dataIndex" :prop="col.dataIndex" :label="col.title" v-bind="{ ...col }">
        <template slot-scope="scope">
          <template v-if="$scopedSlots[col.dataIndex]">
            <slot :name="col.dataIndex" :data="scope.row">{{ $scopedSlots[col.dataIndex]() }}</slot>
          </template>
          <template v-else>{{ scope.row[col.dataIndex] }}</template>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pagination" class="table-pagination" style="">
      <el-pagination
        v-bind="$attrs"
        :current-page="current"
        :page-sizes="[20, 50, 100]"
        :page-size="size"
        :total="total"
        :layout="layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
const defaultPagination = {
  size: 20,
  pageSizes: [20, 50, 100],
};

export default {
  data() {
    return {
      tableData: [],
      loading: false,

      current: 1,
      total: 0,
      size: this.pageSize || defaultPagination.size,
    };
  },

  props: {
    columns: Array,
    dataSource: [Array, Function],
    formatFunc: Function,
    pagination: Boolean,
    pageSize: {
      type: Number,
      default: defaultPagination.size,
    },
    pageTotal: [Number, Function],
    pageSizes: {
      type: Array,
      default: () => defaultPagination.pageSizes,
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
  },

  mounted() {
    this._getDataSource();
  },

  methods: {
    handleSizeChange(val) {
      this.current = 1;
      this.size = val;
      this._getDataSource();
    },

    handleCurrentChange(val) {
      this.current = val;
      this._getDataSource();
    },

    async _getDataSource() {
      if (typeof this.dataSource == "function") {
        this.loading = true;
        try {
          const pagenation = {
            itemsPerPage: this.pageSize,
            page: this.current,
          };
          const res = await this.dataSource(pagenation);
          if (this.pagination) {
            this.total = this._getTotal(res);
          }

          // 判断是否请求成功
          let data = res;
          if (this.formatFunc && typeof this.formatFunc == "function") {
            data = this.formatFunc(res);
          }

          this.tableData = data;
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      } else {
        this.tableData = this.dataSource;
      }
    },

    _getTotal(res) {
      let total = 0;
      if (typeof this.pageTotal == "function") {
        total = this.pageTotal(res);
      } else {
        total = this.pageTotal;
      }
      return total;
    },

    query(queryParams) {
      this.queryParams = queryParams || {};
      this.current = 1;
      this._getDataSource();
    },
  },
};
</script>

<style lang="less" scoped>
.table-pagination {
  margin-top: 15px;
}
.table-pagination /deep/ .btn-prev {
  margin-left: 0px;
}

.table-pagination /deep/ .el-pagination {
  padding-left: 0px;
}
</style>
