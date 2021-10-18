<template>
  <div id="wrapper">
    <table>
      <tr v-for="(hRow, rowIndex) in headers" :key="rowIndex">
        <th
          class="tds"
          :colspan="hCol.colspan"
          v-for="(hCol, colIndex) in hRow"
          :key="'th' + colIndex"
        >
          {{ hCol.title }}
        </th>
      </tr>

      <tr
        v-for="(row, index) in rows"
        :key="'tr' + index"
        style="text-align: center;"
      >
        <td
          class="tds"
          v-for="(value, tdIndex) in row"
          :key="'td' + tdIndex"
          @click="tdClick(rows, row, tdIndex)"
        >
          {{ value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import IScroller from '@/components/VTable/index.js'

export default {
  data() {
    return {
      rows: [],
    }
  },
  props: {
    columns: [],
    dataSource: [],
  },
  computed: {
    headers() {
      let headers = []
      this.columns.forEach((col) => {
        col.colspan = col.children.length
        headers.push(...col.children)
      })
      console.log('计算的header', [this.columns, headers])
      console.log('dataSource', this.dataSource)
      let rows = []
      // 根据header最后一行确定列多少对应
      const columns = headers
      this.dataSource.forEach((data) => {
        const genRows = Array.from({ length: headers.length })
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key]
            for (let i = 0; i < columns.length; i++) {
              if (key == columns[i].dataIndex) {
                genRows[i] = value
                break
              }
            }
          }
        }
        rows.push(genRows)
      })
      console.log('计算的row', rows)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.rows = rows
      return [this.columns, headers]
    },
  },

  mounted() {
    new IScroller('#wrapper', {})
  },
  methods: {
    tdClick(rows, row, tdIndex) {
      console.log(rows, row, tdIndex)
    },
  },
}
</script>

<style lang="less" scoped>
#wrapper {
  position: relative;
  overflow: hidden;
  height: 250px;
  width: 400px;
}
#wrapper table {
  border-collapse: collapse;
}
#wrapper table th {
  white-space: nowrap;
  padding: 0 10px;
  background-color: #eee;
}
#wrapper table td {
  white-space: nowrap;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
}

#wrapper table tr > td:first-child {
  background-color: white;
}
</style>
