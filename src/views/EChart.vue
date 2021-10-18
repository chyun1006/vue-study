<template>
  <div>
    <div id="mychart" style="height:500px;width:500px"></div>

    <MyTable></MyTable>
  </div>
</template>

<script>
import * as echarts from 'echarts'
var option = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: '直接访问',
        },
        {
          value: 234,
          name: '联盟广告',
        },
        {
          value: 1548,
          name: '搜索引擎1',
        },
        {
          value: 1548,
          name: '搜索引擎2',
        },
        {
          value: 1548,
          name: '搜索引擎3',
        },
        {
          value: 1548,
          name: '搜索引擎4',
        },
      ],
    },
  ],
}

import MyTable from '@/components/MyTable'
export default {
  data() {
    return {}
  },
  components: { MyTable },
  mounted() {
    this.chart = echarts.init(document.getElementById('mychart'))
    this.chart.setOption(option)
    window.onresize = () => {
      console.log('1')
      this.chart.resize()
    }
  },
  methods: {},
}
</script>

<style></style>
