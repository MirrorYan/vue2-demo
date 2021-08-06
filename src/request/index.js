import axios from "axios";
import store from "../store";
import router from "../router";

// 设置默认请求超时时间 30s
axios.defaults.timeout = 30000;
// 配置默认请求域名
axios.defaults.baseURL = 'https://product.chuncongcong.com/test';

// Request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response 拦截器
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      // 401 清除token信息并跳转到登录页面
      if (error.response.status === 401) {
        store.commit(types.LOGOUT)
        // 只有当前页面不是login页面时才跳转
        router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.path }
          });
      }
    }
    return Promise.reject(error.response.data)
  },
);

export default axios;
