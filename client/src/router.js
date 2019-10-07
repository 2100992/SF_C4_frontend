import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Fetch from './components/fetch.vue';
import Todos from './components/todos.vue';
// import Confirmation from './components/Confirmation.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/fetch',
      name: 'fetch',
      component: Fetch,
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
    },

    // {
    //   path: '/confirmation',
    //   name: 'confirmation',
    //   component: Confirmation,
    // },

  ],
});
