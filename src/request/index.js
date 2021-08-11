import axios from "axios";
import store from "../store";
import router from "../router";
import { baseURL } from "../utils/configs";

// 标记是否正在刷新 - 防止重复发出refresh token接口（节流阀）
let isRefreshing = false;
// 失效后同时发送请求的容器 - 接口缓存容器
let subscribers = [];

/**
 * 验证token是否快过期
 * @returns {Boolean}
 */
const isTokenExpired = () => {
  let expireTime = store.state.expire;
  if (!expireTime) return false;
  let nowTime = parseInt(new Date().getTime());
  return (expireTime - nowTime) / 1000 < 60;
};
/**
 * 执行缓存中的接口
 * @param {string} newToken 
 */
const onAccessTokenFetched = newToken => {
  subscribers.forEach(callback => {
    callback(newToken);
  });
  // 清空缓存接口
  subscribers = [];
};
/**
 * 添加缓存接口至缓存容器
 * @param {function} callback
 */
const addSubscriber = callback => {
  subscribers.push(callback);
};

// 设置默认请求超时时间 30s
axios.defaults.timeout = 30000;
// 配置默认请求域名
axios.defaults.baseURL = baseURL;

// Request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.token = store.state.token;
    }
    // 如果token快过期了，并且当前不是token/refresh token请求
    if (isTokenExpired() && !config.url.includes('/token')) {
      if (!isRefreshing) {
        isRefreshing = true;
        // Refresh token
        axios({
          url: '/refresh/token?refreshToken=' + store.state.refresh_token,
          baseURL: baseURL,
          method: 'get'
        }).then(res => {
          isRefreshing = false;
          store.dispatch('loginIn', res.data);
          onAccessTokenFetched(res.data.token);
        }).catch(() => {
          isRefreshing = false;
          // 失败就跳转登录
          router.push({ path: '/login' });
        });
      }

      // 将其他接口缓存起来
      return new Promise(resolve => {
        addSubscriber(newToken => {
          config.headers.token = newToken; // 用新的token替换原来的token
          config.url = config.url.replace(config.baseURL, ''); // 替换掉baseURL - 因为baseURL会扩展请求url
          resolve(config); // 返回重新封装的config，就会用新配置去发送请求
        });
      });
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
