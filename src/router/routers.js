const Home = () => import("@/views/Home");
const Vuex = () => import("@/views/Vuex");
const routes = [
  {
    path: "/home",
    name: "首页",
    component: Home,
  },
  {
    path: "/vmodel",
    name: "v-model",
    component: () => import("@/views/VModel"),
  },
  {
    path: "/vuex",
    name: "vuex状态管理",
    component: Vuex,
  },
  {
    path: "/lifecycle",
    name: "组件生命周期",
    component: () => import("@/views/LifeCycle"),
  },
  {
    path: "/http",
    name: "网络请求",
    component: () => import("@/views/Http"),
  },
  {
    path: "/keepalive",
    name: "Keep-Alive",
    component: () => import("@/views/KeepAlive/Index"),
  },
  {
    path: "/async-com",
    name: "异步组件",
    component: () => import("@/views/AsyncCom"),
  },
  {
    path: "/test",
    name: "测试页面",
    component: () => import("@/views/Test"),
  },
  {
    path: "/chart",
    name: "图表",
    component: () => import("@/views/EChart"),
  },
  {
    path: "/jsx",
    name: "Jsx",
    component: () => import("@/views/Jsx/Index"),
  },
  {
    path: "/virtual",
    name: "虚拟滚动",
    component: () => import("@/views/VirtualScroll/Index"),
  },
  {
    path: "/elementui",
    name: "Element UI",
    component: () => import("@/views/ElementUI/ElementUI.vue"),
  },
  {
    path: "/konva",
    name: "konva",
    component: () => import("@/views/konva/konva.vue"),
  },
  {
    path: "/zrender",
    name: "zrender",
    component: () => import("@/views/konva/zrender.vue"),
  },
];

export default routes;
