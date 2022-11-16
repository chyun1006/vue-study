<template>
  <div
    class="node"
    :style="{
      height: `${height}px`,
      width: `${width}px`,
      top: `${top}px`,
      left: `${left}px`,
    }"
  ></div>
</template>

<script>
export default {
  props: {
    height: Number,
    width: Number,
    top: Number,
    left: Number,
  },
};
</script>

<style lang="less" scoped>
.node {
  position: absolute;
  background-color: palevioletred;
}
</style>
