<template>
  <h2 class="text-5xl font-bold text-center mb-6">Login</h2>
  <div class="flex justify-center items-center min-h-[calc(100vh-300px)]">
    <form @submit.prevent="handleLogin" class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 mb-4 w-full rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 mb-4 w-full rounded" required />
      <p class="text-sm">
        <RouterLink to="/forgot-password" class="text-blue-100 hover:underline">
          Forgot your password?
        </RouterLink>
      </p>
      <p v-if="error" style="color:red">{{ error }}</p>
      <button type="submit" class=" mt-5 w-full bg-blue-100 text-black py-2 rounded hover:bg-blue-700" >Login</button>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const route = useRoute()
const resetSuccess = ref(false)

const auth = useAuthStore()

async function handleLogin() {
  error.value = null
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/dashboard')
  } catch (err) {
    toast.error('Login failed. Check your credentials.')
  }
}

onMounted(() => {
  if (route.query.reset === 'success') {
    toast.success('Password has been reset! You can now log in.')
  }
})

</script>