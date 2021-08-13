<template>
  <div class="page-login">
    <img src="@/assets/images/logo.png" alt="Logo">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/Login';
export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
}
</script>

<style lang="less">
.page-login {
  background-color: skyblue;
}
</style>