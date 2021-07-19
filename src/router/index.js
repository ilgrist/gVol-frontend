import Vue from 'vue';
import VueRouter from 'vue-router';
import homepage from '../pages/homepage.vue';
import volExplore from '../pages/vol-explore.vue';
import volProfile from '../pages/vol-profile.vue';
import userProfile from '../pages/user-profile.vue';
import login from '../pages/login-page.vue';
import addVol from '../pages/add-vol.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'homepage',
		component: homepage,
		//RESEARCH SCROLLBHEAVIOR
	},
	{
		path: '/volApp',
		name: 'volExplore',
		component: volExplore,
	},
	// {
	// 	path: '/addVol/:volId?',
	// 	name: 'addVol',
	// 	component: addVol,
	// },
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
});

export default router;
