import { RouteRecordRaw } from 'vue-router';

export const ROUTES_NAMES = {
  MAIN: 'main',
  REGISTER: 'register',
  LOGIN: 'login',
  FEEDBACKS: 'feedbacks',
  PROFILE: 'profile',
  NOT_FOUND: 'not-found',
  ABOUT: 'about',
} as const;

const routes: RouteRecordRaw[] = [
  {
    name: ROUTES_NAMES.MAIN,
    path: '/',
    meta: { title: 'EasyFeedback' },
    component: () => import('src/pages/index'),
  },
  {
    name: ROUTES_NAMES.PROFILE,
    path: '/profile',
    meta: { title: 'EasyFeedback - profile' },
    component: () => import('src/pages/profile'),
  },
  {
    name: ROUTES_NAMES.FEEDBACKS,
    path: '/feedbacks',
    meta: { title: 'EasyFeedback - feedbacks' },
    component: () => import('src/pages/feedbacks'),
  },
  {
    name: ROUTES_NAMES.ABOUT,
    path: '/about',
    meta: { title: 'EasyFeedback - about' },
    component: () => import('src/pages/about'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    meta: { title: 'EasyFeedback - 404' },
    component: () => import('src/pages/notFound'),
  },
];

export default routes;
