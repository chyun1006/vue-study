<template>
  <div>
    <Button type="success" @click="httpClick">发送请求</Button>
  </div>
</template>

<script>
import BC from '../utils/broadcast'
export default {
  mounted() {
    BC.onmessage = ({ data }) => {
      const { target, dataSource } = data
      console.log(target, dataSource)
      this.message = 'asdfasdf' + Math.random()
    }
  },
  methods: {
    httpClick() {
      this.$http({
        url: '/api/getUserInfo',
        method: 'POST',
        // params: {
        //   id: 123,
        //   name: 'cy',
        // },
        data: {
          id: 123,
          name: 'cy',
        },
      })
    },
  },
}
</script>
<style lang="less" scoped></style>
