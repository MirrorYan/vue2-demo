import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const debug = progress.env.NOOD_ENV !== 'proudction';

export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken (state, val) {
      state.token = val;
    }
  },
  strict: false
});