<template>
  <div>
    <h1>Dashboard</h1>
    <!-- <button @click="loadUsers">Load Users</button> -->
  </div>
</template>

<script setup>
import api from '../axios'

const loadUsers = async () => {
  try {
    const res = await api.get('/api/users')
    console.log('✅ Users:', res.data)
  } catch (err) {
    console.error('❌ Error:', err.response?.data || err.message)
  }
}
</script>