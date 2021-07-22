import Vue from 'vue';
import volApp from './volApp.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Element from 'element-ui';
import * as VueGoogleMaps from 'vue2-google-maps';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocialSharing from 'vue-social-sharing'


import './styles/styles.scss';

Vue.config.productionTip = false;
Vue.use(Element);
Vue.use(VueSocialSharing);

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyCTEc6Dy2YGxK0SBtHv2jRRamJ3pVWU_Zw',
	},
});

new Vue({
	router,
	store,
	render: (h) => h(volApp),
}).$mount('#app');
