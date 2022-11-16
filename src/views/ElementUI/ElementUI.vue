<template>
  <div>
    <div id="comtainer"></div>
    <div id="canvas-map" @drop="onDrop" @dragover.prevent></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Select, Input } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Button);
Vue.use(Select);
Vue.use(Input);

const coms = [
  {
    comName: "Button",
    type: "primary",
    title: "主要按钮",
  },
  {
    comName: "Select",
    type: "primary",
    title: "主要按钮",
    value: "",
  },
  {
    comName: "Input",
    type: "primary",
    title: "主要按钮",
    value: "",
  },
];

const com = {
  comName: "Button",
  type: "primary",
  title: "主要按钮",
};

const dragger = {
   props: { widgetOption: Object },
  render(h) {
    return h(
      "div",
      {
        attrs: {
          draggable: true,
        },
        on: {
          click: this.onClick,
          drag: this.onDrag,
        },
      },
      this.$slots.default
    );
  },
  methods: {
    onClick() {
      console.log("onClick");
    },

    onDrag(e) {
      // console.log("onDrag", e);
      e.dataTransfer.setData('widget',this.widgetOption)
    },
  },
};

function mountWidget(widgetOption = {}, selectorOrElement) {
  const Widget = Vue.extend({
    render(h) {
      return h(
        dragger,
        {
          props: {
            widgetOption: widgetOption,
          },
        },
        [h(widgetOption.comName, widgetOption.title)]
      );
    },
  });
  const instance = new Widget().$mount(selectorOrElement);
  return instance;
}

export default {
  data() {
    return {};
  },
  mounted() {
    coms.forEach((item) => {
      const widget = mountWidget(item);
      document.getElementById("comtainer").appendChild(widget.$el);
    });

    // document.getElementById("canvas-map").addEventListener("drop", (e) => {
    //   console.log("drop", e);
    // });
  },
  methods: {
    onDrop(e) {
      console.log("drop", e.dataTransfer.getData('widget'));
      const ele = mountWidget(com);
      document.getElementById("canvas-map").appendChild(ele.$el);
    },
  },
};
</script>

<style>
#canvas-map {
  border: 1px solid orange;
  height: 500px;
  position: relative;
}
</style>
