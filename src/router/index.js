import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// import MenuListComponent from '@/components/MenuListComponent.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
      path: '/',
      name: 'home',
      component: HomeView,
	},
   {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue')
   },
	{
		path: '/menu/:categoryTitle?',
		name: 'category',
		props: true,
		component: () => import('../components/MenuListComponent.vue')
		// component: MenuListComponent,
	},
	{
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
	{
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    }
  ]
})

export default router
