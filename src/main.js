import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';
import '@/less/reset.less';

import Modal from './plugins/Modal';

Vue.use(Modal);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
});
