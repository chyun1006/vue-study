const data = [
  {
    name: `测试姓名1`,
    age: Math.random() * 100,
    address: `测试地址1`,
    tags: "ad",
    flightno: `A124-1`,
    releasetype: "放行昂视",
    status: `正常`,
    flyno: "A112345",
    layout: "asd",
    leave: "北京",
    arisk: Math.random() * 100,
    brisk: Math.random() * 100,
    crisk: Math.random() * 100,
    drisk: Math.random() * 100,
    erisk: Math.random() * 100,
    frisk: Math.random() * 100,
    Action: "删除",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    fixed: "left",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 200,
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    width: 300,
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
  },
  {
    title: "航班号",
    dataIndex: "flightno",
    scopedSlots: { customRender: "flightno" },
  },
  {
    title: "放行方式",
    dataIndex: "releasetype",
    scopedSlots: { customRender: "releasetype" },
  },
  {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "机号",
    dataIndex: "flyno",
    scopedSlots: { customRender: "flyno" },
  },
  {
    title: "记性布局",
    dataIndex: "layout",
    scopedSlots: { customRender: "layout" },
  },
  {
    title: "始发",
    dataIndex: "leave",
    scopedSlots: { customRender: "leave" },
  },
  {
    title: "A风险",
    dataIndex: "arisk",
    scopedSlots: { customRender: "arisk" },
  },
  {
    title: "B风险",
    dataIndex: "brisk",
    scopedSlots: { customRender: "brisk" },
  },
  {
    title: "c风险",
    dataIndex: "crisk",
    scopedSlots: { customRender: "crisk" },
  },
  {
    title: "d风险",
    dataIndex: "drisk",
    scopedSlots: { customRender: "drisk" },
  },
  {
    title: "e风险",
    dataIndex: "erisk",
    scopedSlots: { customRender: "erisk" },
  },
  {
    title: "f风险",
    dataIndex: "frisk",
    scopedSlots: { customRender: "frisk" }, 
  },
  {
    title: "A风险1",
    dataIndex: "arisk1",
    scopedSlots: { customRender: "arisk1" },
  },
  {
    title: "B风险1",
    dataIndex: "brisk1",
    scopedSlots: { customRender: "brisk1" },
  },
  {
    title: "c风险1",
    dataIndex: "crisk1",
    scopedSlots: { customRender: "crisk1" },
  },
  {
    title: "d风险1",
    dataIndex: "drisk1",
    scopedSlots: { customRender: "drisk1" },
  },
  {
    title: "e风险1",
    dataIndex: "erisk1",
    scopedSlots: { customRender: "erisk1" },
  },
  {
    title: "f风险1",
    dataIndex: "frisk1",
    scopedSlots: { customRender: "frisk1" }, 
  },
  {
    title: "Action",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
    fixed: "right",
  },
];

const genData = () => {
  console.time("生成数据");
  const data = Array.from({ length: 1000 }).map((_, index) => {
    return {
      name: `测试姓名${index}`,
      age: Math.random() * 100,
      address: `测试地址${index}`,
      tags: `测试自定义列${index}`,
      flightno: `A124-${index}`,
      releasetype: "放行昂视",
      status: `正常`,
      flyno: "A112345",
      layout: "asd",
      leave: "北京",
      arisk: Math.random() * 100,
      brisk: Math.random() * 100,
      crisk: Math.random() * 100,
      drisk: Math.random() * 100,
      erisk: Math.random() * 100,
      frisk: Math.random() * 100,
      arisk1: Math.random() * 100,
      brisk1: Math.random() * 100,
      crisk1: Math.random() * 100,
      drisk1: Math.random() * 100,
      erisk1: Math.random() * 100,
      frisk1: Math.random() * 100,
      Action: "删除",
    };
  });
  console.timeEnd("生成数据");

  return data;
};

// console.log("data1", data1);
export { data, columns, genData };
