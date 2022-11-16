<template>
  <div>
    <button @click="handleClick">显示</button>
    <async-com v-show="toggle"></async-com>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,
    };
  },
  components: {
    "async-com": () =>
      import(
        /* webpackChunkName:"async-com" */ "../components/AsyncCom/async-com.vue"
      ),
  },
  methods: {
    handleClick() {
      this.toggle = !this.toggle;
    },
  },
};
</script>

<style></style>
