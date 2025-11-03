import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/studio',
    name: 'PhotoStudio',
    component: () => import('@/views/PhotoStudio.vue')
  },
  {
    path: '/lab',
    name: 'CareLab',
    component: () => import('@/views/CareLab.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/Checkout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router