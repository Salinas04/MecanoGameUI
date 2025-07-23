<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navigation Bar -->
    <header class="bg-glass-light dark:bg-glass-dark backdrop-blur-md border-b border-white/10 dark:border-gray-800/30 shadow-glass z-10 sticky top-0">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-all duration-300">
            <img src="/TypingRushLogo.png" alt="TypingRush Logo" class="h-10 w-10" />
            <span class="text-xl font-bold">TypingRush</span>
          </NuxtLink>
        </div>

        <!-- Navigation Links and Controls -->
        <nav class="flex items-center">
          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            class="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 mr-2"
            v-motion
            :initial="{ scale: 1 }"
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            data-mobile-menu-button
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Main Navigation (Desktop) -->
          <div class="hidden md:flex items-center space-x-1 mr-4">
            <NuxtLink to="/" class="px-3 py-2 rounded-lg bg-primary-600/20 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-600/30 dark:hover:bg-primary-600/30 transition-all duration-300">
              Play
            </NuxtLink>
            <NuxtLink to="/leaderboard" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
              Leaderboard
            </NuxtLink>

            <!-- Authentication Links -->
            <client-only>
              <template v-if="isAuthenticated">
                <NuxtLink to="/dashboard" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
                  Dashboard
                </NuxtLink>
                <NuxtLink to="/friends" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
                  Friends
                </NuxtLink>
                <NuxtLink to="/profile" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
                  Profile
                </NuxtLink>
                <!-- Notifications Dropdown -->
                <NotificationsDropdown />
              </template>
              <template v-else>
                <NuxtLink to="/login" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
                  Login
                </NuxtLink>
                <NuxtLink to="/register" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
                  Register
                </NuxtLink>
              </template>
            </client-only>
          </div>

          <!-- Controls -->
          <div class="flex items-center space-x-2">
            <!-- Rules Button -->
            <button 
              @click="showRules = true" 
              class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
              v-motion
              :initial="{ scale: 1 }"
              :hover="{ scale: 1.05, transition: { duration: 200 } }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <!-- Dark Mode Toggle -->
            <button 
              @click="toggleDarkMode" 
              class="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/20 transition-all duration-300"
              v-motion
              :initial="{ scale: 1 }"
              :hover="{ scale: 1.05, transition: { duration: 200 } }"
            >
              <span 
                v-if="isDarkMode" 
                class="text-yellow-400"
                v-motion
                :initial="{ rotate: -180, opacity: 0 }"
                :enter="{ rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } }"
                :leave="{ rotate: 180, opacity: 0, transition: { duration: 300 } }"
                key="sun-icon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <span 
                v-else 
                class="text-gray-700"
                v-motion
                :initial="{ rotate: 180, opacity: 0 }"
                :enter="{ rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } }"
                :leave="{ rotate: -180, opacity: 0, transition: { duration: 300 } }"
                key="moon-icon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </span>
            </button>

            <!-- Profile Picture -->
            <client-only>
              <NuxtLink :to="isAuthenticated ? '/dashboard' : '/login'" class="block">
                <div 
                  class="w-9 h-9 rounded-full overflow-hidden border-2 border-primary-500 hover:border-primary-600 transition-all duration-300 flex items-center justify-center"
                  v-motion
                  :initial="{ scale: 1 }"
                  :hover="{ scale: 1.05, transition: { duration: 200 } }"
                >
                  <img 
                    v-if="isAuthenticated && user?.profilePicture && !imageError" 
                    :src="profilePictureUrl" 
                    :alt="user.username" 
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                  <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-5 w-5">
                      <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                    </svg>
                  </div>
                </div>
              </NuxtLink>
            </client-only>
          </div>
        </nav>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden fixed inset-x-0 top-[61px] bg-glass-light dark:bg-glass-dark backdrop-blur-md border-b border-white/10 dark:border-gray-800/30 shadow-glass z-10"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 200 } }"
      :leave="{ opacity: 0, y: -20, transition: { duration: 150 } }"
      data-mobile-menu
    >
      <div class="container mx-auto px-4 py-2">
        <div class="flex flex-col space-y-1">
          <NuxtLink 
            to="/" 
            class="px-4 py-3 rounded-lg bg-primary-600/20 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-600/30 dark:hover:bg-primary-600/30 transition-all duration-300"
            @click="mobileMenuOpen = false"
          >
            Play
          </NuxtLink>
          <NuxtLink 
            to="/leaderboard" 
            class="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
            @click="mobileMenuOpen = false"
          >
            Leaderboard
          </NuxtLink>

          <!-- Authentication Links -->
          <client-only>
            <template v-if="isAuthenticated">
              <NuxtLink 
                to="/dashboard" 
                class="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                @click="mobileMenuOpen = false"
              >
                Dashboard
              </NuxtLink>
              <NuxtLink 
                to="/profile" 
                class="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                @click="mobileMenuOpen = false"
              >
                Profile
              </NuxtLink>
              <NuxtLink 
                to="/friends" 
                class="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                @click="mobileMenuOpen = false"
              >
                Friends
              </NuxtLink>
              <!-- Mobile Notifications -->
              <div 
                class="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                @click="showMobileNotifications = !showMobileNotifications"
              >
                <div class="flex items-center justify-between">
                  <span>Notifications</span>
                  <span v-if="unreadNotificationsCount > 0" 
                        class="bg-primary-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {{ unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount }}
                  </span>
                </div>
              </div>
              <!-- Mobile Notifications Dropdown -->
              <div v-if="showMobileNotifications" class="px-4 py-2">
                <NotificationsDropdownMobile @close="showMobileNotifications = false" />
              </div>
            </template>
            <template v-else>
              <NuxtLink 
                to="/login" 
                class="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                @click="mobileMenuOpen = false"
              >
                Login
              </NuxtLink>
              <NuxtLink 
                to="/register" 
                class="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                @click="mobileMenuOpen = false"
              >
                Register
              </NuxtLink>
            </template>
          </client-only>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-glass-light dark:bg-glass-dark backdrop-blur-md border-t border-white/10 dark:border-gray-800/30 shadow-glass-inner py-6">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>© {{ new Date().getFullYear() }} TypingRush. All rights reserved.</p>
      </div>
    </footer>

    <!-- Rules Modal -->
    <div 
      v-if="showRules" 
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { duration: 300 } }"
      :leave="{ opacity: 0, transition: { duration: 200 } }"
    >
      <div 
        class="bg-glass-light dark:bg-glass-dark backdrop-blur-lg rounded-2xl shadow-glass-lg border border-white/20 dark:border-gray-700/30 max-w-md w-full p-6 relative overflow-hidden"
        v-motion
        :initial="{ scale: 0.9, opacity: 0, y: -20 }"
        :enter="{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }"
        :leave="{ scale: 0.9, opacity: 0, y: 20, transition: { duration: 200 } }"
      >
        <!-- Decorative elements for glass effect -->
        <div class="absolute -top-24 -right-24 w-40 h-40 bg-primary-300/20 dark:bg-primary-500/10 rounded-full"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300/20 dark:bg-purple-500/10 rounded-full"></div>

        <div 
          class="flex justify-between items-center mb-4 relative"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 300, delay: 100 } }"
        >
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Game Rules</h2>
          <button 
            @click="showRules = false" 
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-white/10 dark:hover:bg-gray-700/20 transition-all duration-300"
            v-motion
            :hover="{ rotate: 90, transition: { duration: 300 } }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div 
          class="text-gray-700 dark:text-gray-300 space-y-3 relative"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 200 } }"
        >
          <p>1. Type the displayed phrase as quickly and accurately as possible.</p>
          <p>2. The timer starts automatically when you begin typing.</p>
          <p>3. Your performance is measured by:</p>
          <ul class="list-disc list-inside pl-4">
            <li>Words Per Minute (WPM)</li>
            <li>Accuracy percentage</li>
            <li>Number of errors</li>
          </ul>
          <p>4. Letters will be color-coded as you type:</p>
          <ul class="list-disc list-inside pl-4">
            <li><span class="text-green-500">Green</span> for correct letters</li>
            <li><span class="text-red-500">Red</span> for incorrect letters</li>
            <li><span class="text-gray-500">Gray</span> for letters not yet typed</li>
          </ul>
          <p>5. After completing the phrase, you'll see your results and can try again with a new phrase.</p>
        </div>
        <div 
          class="mt-6 relative"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: 300 } }"
        >
          <button 
            @click="showRules = false" 
            class="w-full bg-primary-600/90 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-xl backdrop-blur-sm shadow-glass-inner border border-primary-500/30 transition-all duration-300"
            v-motion
            :initial="{ scale: 1 }"
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useApi } from '~/composables/useApi';
import { useSocket } from '~/composables/useSocket';
import NotificationsDropdown from '~/components/NotificationsDropdown.vue';
import NotificationsDropdownMobile from '~/components/NotificationsDropdownMobile.vue';

// Get socket data for notifications
const { unreadNotificationsCount } = useSocket();

// State variables
const isDarkMode = ref(false);
const showRules = ref(false);
const imageError = ref(false);
const mobileMenuOpen = ref(false);
const showMobileNotifications = ref(false);

// Handle image loading errors
function handleImageError() {
  imageError.value = true;
}

// Initialize dark mode from localStorage if available
if (process.client) {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    isDarkMode.value = true;
  }
}

// Authentication state
const { isAuthenticated, user } = useAuth();
const { getProfilePictureUrl } = useApi();

// Compute the profile picture URL
const profilePictureUrl = computed(() => {
  // If no user or profile picture, return default
  if (!user.value) return '/default-avatar.png';

  // Use the getProfilePictureUrl function which handles all cases
  return getProfilePictureUrl(user.value);
});

// Toggle dark mode
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
}

// Apply dark mode class on mount and setup click outside listener for mobile menu
onMounted(() => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    const target = event.target;
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    // If clicking outside the mobile menu and not on the toggle button, close the menu
    if (mobileMenuOpen.value && 
        mobileMenu && 
        mobileMenuButton && 
        !mobileMenu.contains(target) && 
        !mobileMenuButton.contains(target)) {
      mobileMenuOpen.value = false;
    }
  });
});
</script>
