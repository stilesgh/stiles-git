import type { RouteRecordRaw } from 'vue-router'

/**
 * 公共路由，不需要权限判断
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true } // hidden: true 表示不在侧边栏显示
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'), // 如果没有404页面，可以先注释这行或创建一个简单的
    meta: { hidden: true }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'HomeFilled' }
      }
    ]
  }
]

/**
 * 异步路由占位（可选，用于后续动态添加）
 */
export const asyncRoutes: RouteRecordRaw[] = []
