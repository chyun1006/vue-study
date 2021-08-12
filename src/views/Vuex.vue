<template>
  <div>
    <h3>Vuex</h3>
    计数：{{ count }} {{ doubleCount }}
    <Button type="success" @click="btnClick">mutation</Button>
    <Button type="error" @click="actionClick">action</Button>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({
      count: (state) => state.count,
    }),
    ...mapGetters({
      doubleCount: 'doubleCount',
    }),
  },
  methods: {
    btnClick() {
      this.$store.commit('increment')
    },
    actionClick() {
      this.$store.dispatch('asyncIncrement')
    },
  },
}
</script>
<style lang="less" scoped></style>
