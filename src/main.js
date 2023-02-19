import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import http from "./utils/http";

import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import "vant/lib/index.css";
import Vant from "vant";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// import { Button, Select } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(Vant);
Vue.prototype.$http = http;

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
