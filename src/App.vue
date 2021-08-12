<template>
  <div id="app">
    <MyMenu></MyMenu>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MyMenu from '@/components/MyMenu'
export default {
  name: 'App',
  components: {
    MyMenu,
  },
}
</script>

<style>
#app {
  height: 100%;
  display: flex;
}
#content {
  padding: 0 10px;
}
</style>
