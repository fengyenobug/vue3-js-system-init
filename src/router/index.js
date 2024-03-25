import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/databoard'
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/databoard',
          name: 'DataBoard',
          component: () => import('@/views/home/DataBoard.vue')
        }
      ]
    }
  ]
})

export default router
