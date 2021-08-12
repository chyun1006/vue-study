<template>
  <div>
    <h1>THIS IS HOME PAGE!!!</h1>
    <VirtualList :data-list="list"></VirtualList>

    <div style="height:200px">
      <div style="height:1000px"></div>
    </div>

    <div id="foo">
      <p>Countries</p>
      <ul>
        <li>China</li>
        <li>Japan</li>
        <li>Korea</li>
      </ul>
      <p>Age</p>
      <ul>
        <li>13</li>
        <li>17</li>
        <li>20</li>
      </ul>
    </div>
  </div>
</template>
<script>
import VirtualList from '@/components/VirtualList'
export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    Array.from({ length: 5000 }).map((_, index) => {
      this.list.push({
        id: index,
        title: '标题' + index,
      })
    })
    console.log(this.list)
  },

  // mounted() {
  //   Array.from({ length: 5000 }).map((_, index) => {
  //     this.list.push({
  //       id: index,
  //       title: '标题' + index,
  //     })
  //   })
  // },
  components: {
    VirtualList,
  },
}
</script>
<style lang="less" scoped>
#foo ul:nth-of-type(1) li:nth-child(2n) {
  color: red;
}
</style>
