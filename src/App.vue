<template>
  <div id="app">
    {{ start }}
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
  mounted() {
    let store = this.$store;
    getToken().then(res => {
      store.commit('setToken', res.data.data.token);
    });
  }
}
</script>

