<template>
  <div class="box1">
    <p>我是子组件{{ num }}</p>
    {{ count }}
    <button @click="update">click</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  props: {
    num: Number,
  },
  beforeCreate() {
    console.log('子组件beforeCreate')
  },
  created() {
    console.log('子组件created')
  },
  beforeMount() {
    console.log('子组件beforeMount')
  },
  mounted() {
    console.log('子组件mounted')
  },
  beforeUpdate() {
    console.log('子组件beforeUpdate')
  },
  updated() {
    this.count++
    console.log('子组件updated')
  },
  beforeDestroy() {
    console.log('子组件beforeDestroy')
  },
  destroyed() {
    console.log('子组件destroyed')
  },
}
</script>
<style lang="less" scoped>
.box1 {
  border: 1px solid red;
  height: 200px;
}
</style>
