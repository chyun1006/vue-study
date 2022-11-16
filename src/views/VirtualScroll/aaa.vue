<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>
