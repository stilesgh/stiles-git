
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 或 Pinia 获取 Token
    const token = localStorage.getItem('ACCESS_TOKEN')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // 假设后端统一返回格式为 { code: number, data: any, message: string }
    if (res.code !== 200) {
      ElMessage.error(res.message || 'Error')
      // 401: 未授权，跳转登录
      if (res.code === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
        window.location.href = '/login'
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  (error) => {
    ElMessage.error(error.message || 'Network Error')
    return Promise.reject(error)
  }
)

export default service
