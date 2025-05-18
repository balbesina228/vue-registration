import RegisterView from '@/views/RegisterView.vue';
import ProfileView from '@/views/ProfileView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/register' },
  { path: '/register', component: RegisterView },
  { path: '/profile', component: ProfileView },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
