import axios from 'axios'
import { useAuthStore } from './stores/auth'
import { hasAlreadyRefreshed, markRefreshed } from './authLock'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    const auth = useAuthStore()

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      auth.refreshToken &&
      !hasAlreadyRefreshed()
    ) {
      originalRequest._retry = true
      try {
        await auth.refresh()
        markRefreshed()
        // if (!auth.user) {
        //   try {
        //     await auth.fetchUser()
        //   } catch (e) {
        //     console.warn('❌ User fetch failed after refresh:', e.response?.data || e.message)
        //     auth.logout()
        //     return Promise.reject(e)
        //   }
        // }

        originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`
        return api(originalRequest)

      } catch (err) {
        // auth.logout()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api