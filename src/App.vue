<script setup>
import { onMounted } from 'vue'
import { useAuth } from './composables/useAuth'

const { initAuth } = useAuth()

onMounted(() => {
    initAuth()
})
</script>

<template>
    <router-view />
</template>

<style scoped>
/* Scoped styles if needed, but most is in global style.css */
</style>
