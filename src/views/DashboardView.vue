<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Users Dashboard</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} — {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const users = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/api/users')
    users.value = res.data
  } catch (err) {
    toast.error('Error loading users:', err.response?.data || err.message)
  }
})
</script>