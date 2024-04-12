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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginPage.vue')
    },
	{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
