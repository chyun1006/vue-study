<template>
  <input :value="value" @input="$emit('input', $event.target.value)" />
</template>
<script>
export default {
  props: {
    value: Number,
  },
  methods: {},
}
</script>
<style lang="less" scoped></style>
