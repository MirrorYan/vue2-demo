<template>
  <div class="login-container">
    <el-form :model="form">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      form: {
        name: ''
      }
    }
  }
}
</script>

<style lang="less">
.login-container {
  background-color: #fff;

}
</style>
