<template>
  <div id="app">
    {{ start }}
    <router-view />
  </div>
</template>

<script>
import { getToken, getInfo } from './request/api';

export default {
  name: 'App',
  data () {
    return {
      start: 'Project is started.'
    }
  },
  created () {
    let store = this.$store;
    getToken().then(res => {
      store.dispatch('loginIn', res.data);
    });

    setTimeout(() => {
      getInfo();
      getInfo();
    }, 5000);
  }
}
</script>

