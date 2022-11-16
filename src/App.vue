<template>
  <div id="app">
    <MyMenu style="float: left; height: 100vh"></MyMenu>
    <div id="content">
      <keep-alive> <router-view></router-view></keep-alive>
    </div>
  </div>
</template>

<script>
import MyMenu from "@/components/MyMenu";
export default {
  name: "App",
  components: {
    MyMenu,
  },
};
</script>

<style>
#app {
  height: 100%;
  display: flex;
}
#content {
  padding: 10px;
  height: 100vh;
  width: calc(100% - 200px);
  overflow: auto;
}
</style>
