<template>
  <div class="min-h-screen w-full flex flex-col">
    <header class="bg-gray-800 text-white px-6 py-4 sticky top-0 z-50 w-full">
      <div class="relative flex items-center justify-between w-full">

        <h1 class="text-lg font-semibold">🙂</h1>

        <div class="absolute left-1/2 transform -translate-x-1/2 flex gap-2">
          <router-link class="bg-white text-black rounded px-4 py-2" :to="auth.isAuthenticated ? '/dashboard' : '/'">Home</router-link>
          <router-link class="bg-white text-black rounded px-4 py-2" to="/login">Login</router-link>
          <router-link class="bg-white text-black rounded px-4 py-2" to="/register">Register</router-link>
          <router-link class="bg-white text-black rounded px-4 py-2" :to="auth.isAuthenticated ? '/me' : '/login'">My Profile</router-link>
        </div>

        <div v-if="auth.isAuthenticated">
          <button
            class="border border-white bg-red-900 text-white hover:text-black"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>


<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
</style>