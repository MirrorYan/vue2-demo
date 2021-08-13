import Vue from 'vue';
import router from './router';
import ElemenUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from './store';
import '@/less/reset.less';

Vue.use(ElemenUI);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
});
