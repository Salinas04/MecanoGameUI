<template>
  <div class="max-w-md mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Login</h1>
      <p class="text-gray-600 dark:text-gray-300">Sign in to access your account</p>
    </div>

    <!-- Login Form -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <form @submit.prevent="handleLogin">
        <!-- Error Alert -->
        <div v-if="error.login" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error.login }}
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password Field -->
        <div class="mb-6">
          <label for="password" class="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          :disabled="loading"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
    </div>

    <!-- Register Link -->
    <div class="text-center">
      <p class="text-gray-600 dark:text-gray-400">
        Don't have an account?
        <NuxtLink to="/register" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          Register
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'nuxt/app';

// Define page metadata for SEO
definePageMeta({
  title: 'Login - TypingRush',
  description: 'Sign in to your TypingRush account'
});

const router = useRouter();
const { login, loading, error, isAuthenticated } = useAuth();

// Form data
const email = ref('');
const password = ref('');

// Handle login form submission
async function handleLogin() {
  const success = await login({
    email: email.value,
    password: password.value
  });

  if (success) {
    // Redirect to dashboard or home page
    router.push('/dashboard');
  }
}

// Redirect if already authenticated
onMounted(() => {
  if (process.client && isAuthenticated.value) {
    router.push('/dashboard');
  }
});
</script>
