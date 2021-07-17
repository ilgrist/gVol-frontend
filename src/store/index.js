import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import volStore from './vol-store.js';
import userStore from './user-store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    transHeader: false,
  },
  mutations: {
    setTransHeader(state, { isTransHeader }) {
      state.transHeader = isTransHeader;
    },
  },
  getters: {
    isTransHeader(state) {
      return state.transHeader;
    },
  },
  actions: {},
  modules: {
    volStore,
    userStore,
  },
});
