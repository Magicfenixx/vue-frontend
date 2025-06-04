import { defineStore } from 'pinia'
import api from '../axios'
import { resetLock } from '../authLock'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token'),
    refreshFailed: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user,
  },

  actions: {

    initializeAuthHeader() {
      if (this.accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      } else {
        delete api.defaults.headers.common['Authorization'];
      }
    },

    async login({ email, password }) {
            const res = await api.post('http://localhost:8000/api/login', { email, password })

            this.setTokens(res.data)

            await this.fetchUser()
            toast.success('Login successful')
    },

    async register(payload) {
      await api.post('http://localhost:8000/api/register', payload)
      await this.login({ email: payload.email, password: payload.password })
      toast.success('Registration successful')
    },

    // async fetchUser() {     	
    //     if (!this.accessToken) {
    //         this.user = null;
    //         return;
    //     }
    //     try {
    //         const res = await api.get('http://localhost:8000/api/me', {
    //         headers: {
    //             Authorization: `Bearer ${this.accessToken}`,
    //         },
    //         })
    //         console.log('User fetched:', res.data)
    //         this.user = res.data
    //     } catch (err) {
    //         console.error('Error fetching user:', err.response?.data || err.message)
    //         // this.logout()
    //         throw err
    //     }
    // },

    async fetchUser() {
      if (!this.accessToken){
      this.user = null;
      return
      }
      try {
        const res = await api.get('/api/me', {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        this.user = res.data
      } catch (err) {

        throw err
      }
    },

    async refresh() {    	
      if (!this.refreshToken || this.refreshFailed) {
        this.logout();
        toast.error('Session expired. Please log in again.');
        throw new Error('No refresh token or refresh failed previously.');
      }
      try {
        const res = await api.post('http://localhost:8000/api/refresh', {
          refresh_token: this.refreshToken,
        })

        this.setTokens(res.data)
        toast.success('Session refreshed successfully');
        
      } catch (err) {
        this.refreshFailed = true;
        this.logout();
        toast.error('Session expired. Please log in again.');
        throw err;
      }
    },

    setTokens({ access_token, refresh_token }) {
      this.accessToken = access_token
      this.refreshToken = refresh_token
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      this.refreshFailed = false;
    },

    logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.refreshFailed = false

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      delete api.defaults.headers.common['Authorization']

      resetLock()

      toast.info('Logged out')
    },
  },
})