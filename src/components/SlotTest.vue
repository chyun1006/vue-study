<template>
  <div>
    <ul>
      <li v-for="item in dataSource" :key="item.key">
        <slot :name="item.key"></slot>
        <slot></slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return{}
  },
  props:{
    dataSource:Array
  }
}
</script>
<style lang="less" scoped></style>
