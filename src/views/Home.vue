<template>
  <div>
    <json-form :config="formJson"></json-form>
    <c-table
      ref="tableRef"
      :columns="columns"
      stripe
      border
      pagination
      background
      :pageSize="1"
      :pageTotal="100"
      :dataSource="_getList"
      :formatFunc="formatFunc"
    >
      <template v-slot:name="record"> haha {{ record }} </template>
    </c-table>
  </div>
</template>
<script>
import CTable from "@/components/c-table/index";
import JsonForm from "@/components/json-form";

const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
    slotScope: true,
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
  },
];

const columns = [
  {
    dataIndex: "date",
    title: "日期",
  },
  {
    dataIndex: "name",
    title: "姓名",
  },
  {
    dataIndex: "address",
    title: "地址",
  },
  {
    dataIndex: "action",
    title: "操作",
  },
];

const promise = params => {
  console.log("==params", params);
  return new Promise(resolve => {
    setTimeout(() => {
      const res = {
        success: true,
        data: tableData,
      };
      resolve(res);
    }, 2000);
  });
};

const formJson = [
  {
    type: "el-input",
    label: "姓名xingmign",
    prop: "name",
    option: [], // array 、function
    modelValue: "1",
    attrs: {
      placeholder: "请输入内容",
      repalceFiled: {},
    },
    style: {},
    formItem: {
      rules: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
      ],
    },
  },
  {
    type: "el-select",
    label: "城市",modelValue: "1",
    prop: "city",
    options: [
      {
        label: "label",
        value: 123,
      },
    ],
    server: {},
    attrs: {
      placeholder: "请选择城市",
    },
  },
  {
    type: "el-radio",
    label: "性别",
    prop: "city",modelValue: "1",
    options: [
      {
        label: "男",
        value: 1,
      },
      {
        label: "女",
        value: 2,
      },
    ],
    server: {},
    attrs: {
      placeholder: "请选择城市",
    },
  },
  {
    type: "el-checkbox",
    label: "活动性质",
    modelValue: 1,
    prop: "natual",
    options: [
      {
        label: "美食/餐厅线上活动",
        value: 1,
      },
      {
        label: "地推活动",
        value: 2,
      },
      {
        label: "线下主题活动",
        value: 3,
      },
    ],
    server: {},
    attrs: {
      placeholder: "请选择城市",
    },
  },
];

export default {
  data() {
    return {
      tableData,
      columns,
      keyword: "cy",
      formJson,
    };
  },
  mounted() {},
  components: {
    CTable,
    JsonForm,
  },
  methods: {
    query() {
      this.$refs["tableRef"].query();
    },

    _getList(pagenation) {
      const params = {
        name: this.keyword,
        ...pagenation,
      };
      return promise(params);
    },

    formatFunc(res) {
      if (res.success) {
        return res.data;
      }
    },
  },
};
</script>
<style lang="less" scoped></style>
