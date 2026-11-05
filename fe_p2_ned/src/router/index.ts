import { createRouter, createWebHistory } from 'vue-router'
import EventosView from '../views/EventosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EventosView,
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: EventosView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/recintos',
      name: 'recintos',
      component: () => import('../views/RecintosView.vue'),
    },
  ],
})

export default router
