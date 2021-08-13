<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getToken } from './request/api';

export default {
  name: 'App',
  data () {
    return {
      start: 'Project is started.'
    }
  },
  created () {
    let store = this.$store;
    // getToken().then(res => {
    //   store.dispatch('loginIn', res.data);
    // });
  }
}
</script>

