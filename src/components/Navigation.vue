<template>
  <div class="side-nav">
    <el-menu :default-active="$route.path" mode="horizontal" router>
      <template v-for="(item, index) in $router.options.routes">
        <el-menu-item
          :index="item.path"
          :key="index"
        ><em :class="item.icon" />{{ item.name }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$route.options)
  }
}
</script>