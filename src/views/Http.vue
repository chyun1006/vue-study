<template>
  <div>
    <Button type="success" @click="httpClick">发送请求</Button>
  </div>
</template>

<script>
export default {
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
