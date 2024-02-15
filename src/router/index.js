import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach(async (routeTo, routeFrom, next) => {

  const loggeduser = localStorage.getItem('jwt');
  const publicPages = ['/login', '/register', '/forgot-password'];
  const authpage = !publicPages.includes(routeTo.path);

  //if (authpage && !loggeduser) {
  //  return next('/login');
  //}

  next();
});

export default router
