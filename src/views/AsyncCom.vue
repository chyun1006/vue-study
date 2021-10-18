<template>
  <div>
    <async-com v-show="false"></async-com>
  </div>
</template>

<script>
export default {
  components: {
    'async-com': () =>
      import(
        /* webpackChunkName:"async-com" */ '../components/AsyncCom/async-com.vue'
      ),
  },
}
</script>

<style></style>
