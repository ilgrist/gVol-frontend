import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import volStore from './vol-store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    volStore,
  },
});
