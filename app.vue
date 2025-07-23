<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-300 relative">
    <!-- Background shapes for glassmorphism effect -->
    <div class="absolute top-20 left-20 w-72 h-72 bg-primary-400 dark:bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
    <div class="absolute top-40 right-40 w-80 h-80 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-40 left-1/3 w-96 h-96 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSocket } from '~/composables/useSocket';
import { useAuth } from '~/composables/useAuth';

// Initialize WebSocket connection if user is authenticated
const { isAuthenticated } = useAuth();
const { initSocket } = useSocket();

onMounted(() => {
  if (process.client && isAuthenticated.value) {
    // Initialize WebSocket connection
    initSocket();
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.mono {
  font-family: 'JetBrains Mono', monospace;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
