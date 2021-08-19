import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';
import '@/plugins/element.js';
import '@/less/reset.less';

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
});
