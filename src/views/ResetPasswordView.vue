<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Reset Password</h1>

    <form @submit.prevent="submit">
      <div class="mb-4">
        <label class="block font-medium">New Password</label>
        <input
          v-model="password"
          type="password"
          required
          class="w-full border rounded px-3 py-2"
          placeholder="Enter new password"
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium">Confirm Password</label>
        <input
          v-model="password_confirmation"
          type="password"
          required
          class="w-full border rounded px-3 py-2"
          placeholder="Confirm password"
        />
      </div>

      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">
        Reset Password
      </button>

      <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const token = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const message = ref('')
const error = ref('')

onMounted(() => {
  token.value = route.query.token || ''
  email.value = route.query.email || ''
})

const submit = async () => {
  message.value = ''
  error.value = ''

  try {
    const res = await api.post('/api/reset-password', {
      token: token.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })

    router.push({ name: 'login', query: { reset: 'success' } })
  } catch (err) {
    toast.error(err.response?.data?.message || 'Password reset failed.')
  }
}
</script>