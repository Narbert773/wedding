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
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
