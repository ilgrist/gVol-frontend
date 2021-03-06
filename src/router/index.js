import Vue from 'vue';
import VueRouter from 'vue-router';
import homepage from '../pages/homepage.vue';
import volExplore from '../pages/vol-explore.vue';
import volProfile from '../pages/vol-profile.vue';
import userProfile from '../pages/user-profile.vue';
import login from '../pages/login-page.vue';
// import addVol from '../pages/add-vol.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'homepage',
		component: homepage,
	},
	{
		path: '/volApp',
		name: 'volExplore',
		component: volExplore,
	},
	{
		path: '/volApp/:_id',
		name: 'volProfile',
		component: volProfile,
	},
	{
		path: '/user/:_id',
		name: 'userProfile',
		component: userProfile,
	},
	{
		path: '/login',
		name: 'login',
		component: login,
	},
];

const router = new VueRouter({
	routes,
	linkActiveClass: 'active',
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	},
});

router.beforeEach((to, from, next) => {
	if (from.name === 'login' && to.name === 'userProfile') next({ path: '/' });
	else next();
});

export default router;
