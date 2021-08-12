<template>
  <Menu :theme="theme3" active-name="1">
    <MenuItem
      v-for="menu in menuList"
      :key="menu.name"
      :to="menu.path"
      :name="menu.name"
    >
      <Icon type="md-document" />
      {{ menu.name }}
    </MenuItem>
  </Menu>
</template>
<script>
import Routes from '@/router/routers'
export default {
  data() {
    return {
      theme3: 'dark',
      menuList: [],
    }
  },
  props: {},
  mounted() {
    this.menuList = Routes
  },
}
</script>
<style lang="less" scoped></style>
