<template>
  <div class="max-w-md mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Register</h1>
      <p class="text-gray-600 dark:text-gray-300">Create a new account</p>
    </div>

    <!-- Registration Form -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <form @submit.prevent="handleRegister">
        <!-- Error Alert -->
        <div v-if="error.register" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error.register }}
        </div>

        <!-- Username Field -->
        <div class="mb-4">
          <label for="username" class="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Choose a username"
            required
            minlength="3"
            maxlength="30"
          />
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
        <div class="mb-4">
          <label for="password" class="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 relative z-10"
            placeholder="Create a password"
            required
            minlength="6"
          />
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 relative z-10"
            placeholder="Confirm your password"
            required
          />
          <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">Passwords do not match</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          :disabled="loading || passwordMismatch"
        >
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>
    </div>

    <!-- Login Link -->
    <div class="text-center">
      <p class="text-gray-600 dark:text-gray-400">
        Already have an account?
        <NuxtLink to="/login" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          Login
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

// Define page metadata for SEO
definePageMeta({
  title: 'Register - TypingRush',
  description: 'Create a new TypingRush account'
});

const router = useRouter();
const { register, loading, error, isAuthenticated } = useAuth();

// Form data
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Check if passwords match
const passwordMismatch = computed(() => {
  return password.value && confirmPassword.value && password.value !== confirmPassword.value;
});

// Handle registration form submission
async function handleRegister() {
  if (passwordMismatch.value) {
    return;
  }

  const success = await register({
    username: username.value,
    email: email.value,
    password: password.value
  });

  if (success) {
    // Redirect to dashboard or home page
    router.push('/dashboard');
  }
}

// Redirect if already authenticated
if (process.client && isAuthenticated.value) {
  router.push('/dashboard');
}
</script>
