import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

// 1. 注释掉这一行导入
// import { constantRoutes } from '@/router/constants' 

interface PermissionState {
  routes: Ref<RouteRecordRaw[]>
  isRoutesGenerated: Ref<boolean>
}

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])
  const isRoutesGenerated = ref<boolean>(false)

  const generateRoutes = async (): Promise<RouteRecordRaw[]> => {
    try {
      // 2. 这里直接定义一个简单的路由数组，代替从 constants 导入
      // 实际项目中，这里应该调用 API 获取后端菜单数据
      const accessedRoutes: RouteRecordRaw[] = [
        {
          path: '/',
          component: () => import('@/layout/index.vue'),
          redirect: '/dashboard',
          children: [
            {
              path: 'dashboard',
              component: () => import('@/views/dashboard/index.vue'),
              name: 'Dashboard',
              meta: { title: '首页' }
            }
          ]
        }
      ]
      
      routes.value = accessedRoutes
      isRoutesGenerated.value = true
      
      return accessedRoutes
    } catch (error) {
      console.error('Generate routes error:', error)
      return []
    }
  }

  const resetRoutes = () => {
    routes.value = []
    isRoutesGenerated.value = false
  }

  return {
    routes,
    isRoutesGenerated,
    generateRoutes,
    resetRoutes
  } as PermissionState
})
