import Vue from 'vue';
import VueRouter from 'vue-router';
import homepage from '../pages/homepage.vue';
import volExplore from '../pages/vol-explore.vue';
import volProfile from '../pages/vol-profile.vue';

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
	// {
	//   path: '/user/:_id',
	//   name: 'userDashboard',
	//   component: userDashboard
	// },
	// {
	//   path: '/signup',
	//   name: 'signup',
	//   component: signup
	// },
];

const router = new VueRouter({
	routes,
});

export default router;
