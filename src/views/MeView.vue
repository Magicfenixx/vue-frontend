<template>
  <div class="p-6 bg-white rounded shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-4">My Profile</h1>

    <div v-if="user" class="space-y-2">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>

    <div v-else class="text-gray-500">
      Loading profile...
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const user = auth.user
</script>