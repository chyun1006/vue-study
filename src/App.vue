<template>
  <div id="app">
    <!-- <MyMenu style="float:left;height:100%;"></MyMenu> -->
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import MyMenu from '@/components/MyMenu'
export default {
  name: 'App',
  components: {
    // MyMenu,
  },
}
</script>

<style>
#app {
  height: 100%;
}
#content {
  padding: 0 10px;
  overflow: hidden;
}
</style>
