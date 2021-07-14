import Vue from 'vue';
import VueRouter from 'vue-router';
import homepage from '../pages/homepage.vue';
import volOpExplore from '../pages/volOp-explore.vue';
import volOpProfile from '../pages/volOp-profile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: homepage,
  },
  {
    path: '/volApp',
    name: 'volOpExplore',
    component: volOpExplore,
  },
  {
    path: '/volApp/:_id',
    name: 'volOpProfile',
    component: volOpProfile,
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
