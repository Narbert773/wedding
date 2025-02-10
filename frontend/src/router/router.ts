import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../pages/EntryPage.vue'),
  },
  {
    path: '/main',
    component: () => import('../pages/MainPage.vue'),
  },
  {
    path: '/single',
    component: () => import('../pages/SinglePage.vue'),
  },
  {
    path: '/plural',
    component: () => import('../pages/PluralPage.vue'),
  },
  {
    path: '/kids',
    component: () => import('../pages/KidsPage.vue'),
  },
  {
    path: '/guests',
    component: () => import('../pages/GuestsPage.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessGranted');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
