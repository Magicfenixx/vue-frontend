import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'
import { resetLock } from './authLock'
import './style.css'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// createApp(App).use(createPinia()).use(router).mount('#app')

router.isReady().then(async () => {
  const auth = useAuthStore()

  try {
    if (auth.accessToken && auth.refreshToken) {
      console.log('🟡 Rehydrating user...')
    //   resetLock()
      await auth.fetchUser()
      console.log('🟢 Rehydrated:', auth.user)
    }
  } catch (err) {
    console.warn('🔴 Rehydration failed:', err.response?.data || err.message)
    // logout is called from refresh(), no need to repeat
  }

  app.use(Toast, {
  position: 'bottom-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  })
  
  app.mount('#app')
})

// router.isReady().then(async () => {
//   const auth = useAuthStore()
//   const hasAccess = !!auth.accessToken
//   const hasRefresh = !!auth.refreshToken

//   try {
//     if (hasAccess && hasRefresh) {
//       console.log('🟡 Trying to fetch user with stored tokens...')
//       await auth.fetchUser() // if this fails, it triggers refresh automatically
//       console.log('🟢 User rehydrated:', auth.user)
//     } else {
//       console.log('⚪ No valid tokens found at startup')
//     }
//   } catch (err) {
//     console.warn('🔴 Startup auth failed:', err.response?.data || err.message)
//     auth.logout()
//   }

//   app.mount('#app')
// })