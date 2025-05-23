import RegisterView from '@/views/RegisterView.vue';
import ProfileView from '@/views/ProfileView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/register',
  },
  {
    path: '/register',
    component: RegisterView,
    meta: { requresGuest: true }
  },
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/register');
  } else if (to.meta.requresGuest && isLoggedIn) {
    next('profile');
  } else {
    next();
  }
})

export default router;
