<template>
  <div class="box">
    <div style="float:left;border:1px solid red;margin:20px">
      组件初始化
      <ul>
        <li>父组件beforeCreate</li>
        <li>父组件created</li>
        <li>父组件beforeMount</li>
        <li>子组件beforeCreate</li>
        <li>子组件created</li>
        <li>子组件beforeMount</li>
        <li>子组件mounted</li>
        <li>父组件mounted</li>
      </ul>
    </div>

    <div style="float:left;border:1px solid red;margin:20px">
      组件更新
      <ul>
        <li>父组件beforeUpdate</li>
        <li>子组件beforeUpdate</li>
        <li>子组件updated</li>
        <li>父组件updated</li>
      </ul>
    </div>

    <div style="float:left;border:1px solid red;margin:20px">
      组件销毁
      <ul>
        <li>父组件beforeDestroy</li>
        <li>子组件beforeDestroy</li>
        <li>子组件destory</li>
        <li>父组件destory</li>
      </ul>
    </div>

    <p style="clear:both">我是父组件{{ num }}</p>
    <button @click="update">click</button>
    <Child style="margin:10px" :num="num"></Child>
  </div>
</template>
<script>
import Child from '@/components/Child'
export default {
  data() {
    return {
      num: 0,
    }
  },
  components: {
    Child,
  },
  beforeCreate() {
    console.log('父组件beforeCreate')
  },
  created() {
    console.log('父组件created')
  },
  beforeMount() {
    console.log('父组件beforeMount')
  },
  mounted() {
    console.log('父组件mounted')
  },
  beforeUpdate() {
    console.log('父组件beforeUpdate')
  },
  updated() {
    console.log('父组件updated')
  },
  beforeDestroy() {
    console.log('父组件beforeDestroy')
  },
  destroyed() {
    console.log('父组件destroyed')
  },
  methods: {
    update() {
      this.num = Math.random()
    },
  },
}
</script>
<style lang="less" scoped>
.box {
  border: 1px solid green;
}
</style>
