<template>
  <h2 class="text-5xl font-bold text-center mb-6">Register</h2>
  <div class="flex justify-center items-center min-h-[calc(100vh-300px)]">
    <form @submit.prevent="handleRegister" class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <input v-model="name" type="text" placeholder="Name" class="border p-2 mb-4 w-full rounded" required />
      <input v-model="email" type="email" placeholder="Email" class="border p-2 mb-4 w-full rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 mb-4 w-full rounded" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="border p-2 mb-4 w-full rounded" required />
      <button type="submit" class="bg-blue-100">Register</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(null)
const router = useRouter()

const auth = useAuthStore()

async function handleRegister() {
  error.value = null

  if (password.value !== confirmPassword.value) {
    toast.error('Passwords do not match')
    return
  }

  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    })

    router.push('/')
  } catch (err) {
    toast.error('Registration failed. Check your password')
  }
}
</script>