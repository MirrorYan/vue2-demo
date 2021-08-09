import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const debug = progress.env.NOOD_ENV !== 'proudction';

export default new Vuex.Store({
  state: {
    token: null,
    refresh_token: null,
    expire: null
  },
  mutations: {
    SET_TOKEN (state, val) {
      state.token = val;
    },
    SET_REFRESH_TOKEN (state, val) {
      state.refresh_token = val;
    },
    SET_EXPIRES_TIME (state, val) {
      state.expire = val;
    }
  },
  actions: {
    loginIn ({commit, state}, userInfo) {
      if (!userInfo.expires_in) {
        userInfo.expires_in = new Date().getTime() + 15000;
      }
      commit('SET_TOKEN', userInfo.token);
      commit('SET_REFRESH_TOKEN', userInfo.refresh_token);
      commit('SET_EXPIRES_TIME', userInfo.expires_in);
    }
  },
  strict: false
});