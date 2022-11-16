<template>
  <div>
      <el-button type="success" v-bind="$attrs">成功按钮</el-button>
  </div>
</template>

<script>
export default {
    props:{
        comProp:{
            type:Object,
            default:()=>{}
        }
    }
}
</script>

<style>

</style>