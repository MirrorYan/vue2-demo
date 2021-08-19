<template>
  <header class="header">
    <div class="site-logo"><img src="@/assets/images/logo.png" alt="Site Logo"></div>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.header {
  padding: 10px 20px;
  box-shadow: 0 2px 20px rgba(#000, .2);
  position: relative;
  z-index: 2;
}
.site-logo {
  img {
    height: 60px;
  }
}
</style>
