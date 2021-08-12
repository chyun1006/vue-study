<template>
  <input
    type="checkbox"
    :checked="checked"
    @change="$emit('change', $event.target.checked)"
  />
</template>
<script>
export default {
  // 将默认的 value 修改为 checked,将默认的 input 指定为 change
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
}
</script>
<style lang="less" scoped></style>
