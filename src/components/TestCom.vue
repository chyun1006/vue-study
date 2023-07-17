<template>
  <div>
    <h3>我是测试组件</h3>
    <ul>
      <li v-for="d in data" :key="d">{{d}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Array,
      default:()=>[]
    }
  },

  watch:{
    data:function(newV) {
      console.log('--watch', newV)
    }
  }
}
</script>

<style></style>
