import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import HomeView from './views/HomeView.vue';
import ShopView from './views/ShopView.vue';
import ContactView from './views/ContactView.vue';

const routes = [
    { path: '/login', component: LoginView, name: 'Login' },
    { path: '/boutique', component: ShopView, name: 'Boutique' },
    { path: '/contact', component: ContactView, name: 'Contact' },
    { path: '/', component: HomeView, name: 'Home'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;