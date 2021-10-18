<template>
  <div id="test-app"></div>
</template>

<script>
import Vue from 'vue'
export default {
  mounted() {
    new Vue({
      render: function(h) {
        return h('div', {}, [h('h1', '你好啊')])
      },
    }).$mount('#test-app')

    console.log(this)
  },
}
</script>

<style></style>
