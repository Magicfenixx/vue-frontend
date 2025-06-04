<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Forgot Password</h1>

    <form @submit.prevent="submit">
      <div class="mb-4">
        <label class="block font-medium">Email</label>
        <input
          v-model="email"
          type="email"
          required
          class="w-full border rounded px-3 py-2"
          placeholder="Enter your email"
        />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Send Reset Link
      </button>

      <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import api from '../axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const email = ref('')
const message = ref('')
const error = ref('')

const submit = async () => {
  message.value = ''
  error.value = ''
  try {
    const res = await api.post('/api/forgot-password', { email: email.value })
    message.value = res.data.message ||
    toast.success('Reset link sent successfully!')
  } catch (err) {
    if (err.response?.status >= 500) {
      console.warn('Ignored backend 5xx error:', message)
      return
    } 
    toast.error('Reset link was not sent.')
  }
}
</script>
