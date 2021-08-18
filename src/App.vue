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
    this.$modal({
      title: 'Test modal title',
      message: 'Test modal message'
    }).then(() => {
      console.log(1);
    });
  }
}
</script>

