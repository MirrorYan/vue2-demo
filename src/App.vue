<template>
  <div id="app">
    <Header />
    <div class="main-container">
      <Navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

export default {
  name: 'App',
  components: {
    Header,
    Navigation
  },
  data () {
    return {
      start: 'Project is started.'
    }
  }
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100vh;
}
.main-container {
  height: calc(100vh - 84px);
}
</style>
