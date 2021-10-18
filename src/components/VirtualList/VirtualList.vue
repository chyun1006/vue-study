<template>
  <div
    ref="listview"
    class="list-view"
    :style="{ height: showHeight }"
    @scroll="onScroll($event)"
  >
    <!-- 显示滚动条 -->
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
import { throttle2 } from '../../utils/common-fun'
const showCount = 10 // 要显示的条数
export default {
  data() {
    return {
      startIndex: 0, // 开始索引
      endIndex: 0, // 结束索引
      translateYV: 0, // 偏移
    }
  },
  props: {
    // 数据列表
    dataList: Array,
    // 每一项的高度
    itemHeight: {
      type: Number,
      default: 30,
    },
  },
  computed: {
    // 根据条数来确定高度，显示滚动条
    contentHeight: function() {
      return this.dataList.length * this.itemHeight + 'px'
    },
    // 要显示的数据，根据其实索引和结束索引截取
    showList: function() {
      return this.dataList.slice(this.startIndex, this.endIndex)
    },
    // 可视区域的高度
    showHeight: function() {
      return showCount * this.itemHeight + 'px'
    },
  },
  mounted() {
    // 初始化endIndex
    this.endIndex = this.startIndex + showCount
  },
  methods: {
    onScroll(e) {
      throttle2(updateIndex, 200).call(this)
      function updateIndex() {
        const scrollTop = e.target.scrollTop // 获取偏移量
        // 计算开始索引
        this.startIndex = Math.floor(scrollTop / this.itemHeight)
        // 计算结束索引
        this.endIndex = this.startIndex + showCount + 10
        // 计算偏移量
        this.translateYV = this.startIndex * this.itemHeight
      }
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
