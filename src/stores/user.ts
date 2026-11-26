
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('ACCESS_TOKEN') || '')
  const userInfo = ref<any>(null)

  // 登录动作
  const login = async (username: string, password: string) => {
    // 模拟 API 调用，实际应调用 src/api/user.ts
    // const res = await loginApi({ username, password })
    // token.value = res.token
    // localStorage.setItem('ACCESS_TOKEN', res.token)
    
    // 模拟成功
    token.value = 'mock-token-' + Date.now()
    localStorage.setItem('ACCESS_TOKEN', token.value)
    await getUserInfo()
  }

  // 获取用户信息
  const getUserInfo = async () => {
    // const res = await getInfoApi()
    // userInfo.value = res
    userInfo.value = {
      username: 'Admin',
      roles: ['admin'],
      avatar: 'https://picsum.photos/200/200?random=1',
    }
  }

  // 登出
  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('ACCESS_TOKEN')
    router.push('/login')
  }

  return { token, userInfo, login, logout, getUserInfo }
})
