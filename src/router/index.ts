
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { constantRoutes } from './constants'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as RouteRecordRaw[]
})

export default router
