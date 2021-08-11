import Vue from 'vue';
import router from './router';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from './store';

Vue.use(Message);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
});
