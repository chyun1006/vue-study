<template>
  <div
    class="list-view"
    :style="{ height: showHeight }"
    @scroll="onScroll($event)"
  >
    <div class="list-bar" :style="{ height: contentHeight }"></div>
    <ul
      class="list"
      ref="list"
      :style="{ transform: `translateY(${translateYV}px)` }"
    >
      <li v-for="item in showList" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startIndex: 0,
      endIndex: 0,
      showCount: 10,
      showHeight: 0,
      translateYV: 0,
    }
  },
  props: {
    dataList: Array,
    itemHeight: {
      type: Number,
      default: 30,
    },
  },
  computed: {
    contentHeight: function() {
      return this.dataList.length * this.itemHeight + 'px'
    },
    showList: function() {
      return this.dataList.slice(this.startIndex, this.endIndex)
    },
  },
  mounted() {
    this.endIndex = this.startIndex + this.showCount
    this.showHeight = this.showList.length * this.itemHeight + 'px'
  },
  methods: {
    onScroll(e) {
      const scrollTop = e.target.scrollTop
      this.startIndex = Math.floor(scrollTop / this.itemHeight)
      this.endIndex = this.startIndex + this.showCount + 10
      this.translateYV = this.startIndex * this.itemHeight
      // this.$refs.list.style.top = this.startIndex * this.itemHeight + 'px'
    },
  },
}
</script>

<style lang="less" scoped>
.list-view {
  position: relative;
  width: 200px;
  border: 1px solid red;
  overflow-y: scroll;
}
.list {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  text-align: center;
}
.list li {
  border-bottom: 1px solid blue;
  line-height: 30px;
  box-sizing: border-box;
}
</style>
