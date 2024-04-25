import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import testIfCategoryTitleIsCorrect from '../stores/helpers/testRoutes.js';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: HomeView
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
         beforeEnter: (to, from, next) => {
				const categoryTitle = to.params.categoryTitle;
				if (testIfCategoryTitleIsCorrect(categoryTitle)) {
					next();
				} else {
					next({ name: 'page-not-found' });
				}
			},
         component: () => import('../components/MenuListComponent.vue')
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
      },
      {
         path: '/:path(.*)*',
         name: 'page-not-found',
         component: () => import('../views/PageNotFound.vue')
      }
   ]
});

export default router
