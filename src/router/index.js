import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    }
  ]
});

router.beforeEach((router, redirect, next) => {
  const token = store.state.token;
  if (!token && router.path !== '/login') {
    next({ path: '/login'});
  } else {
    next();
  }
})

export default router;