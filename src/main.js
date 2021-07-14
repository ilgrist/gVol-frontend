import Vue from 'vue';
import volApp from './volApp.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Element from 'element-ui';

import './styles/styles.scss';

Vue.config.productionTip = false;
Vue.use(Element);

new Vue({
  router,
  store,
  render: (h) => h(volApp),
}).$mount('#app');
