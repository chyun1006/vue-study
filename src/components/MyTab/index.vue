<template>
  <div class="tab-warpper">
    <div class="tab">
      <span
        class="tab-item"
        :class="{ active: curr == index }"
        v-for="(tab, index) in list"
        :key="tab"
        @click="tabChange(tab, index)"
        >{{ tab }}</span
      >
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    curr: Number,
    list: Array,
  },
  methods: {
    tabChange(tab, index) {
      this.$emit('change', tab, index)
    },
  },
}
</script>

<style lang="less">
.tab-warpper {
}
.tab-item {
  display: inline-block;
  padding: 5px;
  margin: 5px;
  background-color: #eee;
  cursor: pointer;
}
.active {
  background-color: red;
}
</style>
