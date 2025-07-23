<template>
  <div class="max-w-3xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2 relative inline-block">
        Leaderboard
        <span class="absolute -top-2 -right-8 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-md animate-pulse">
          #1
        </span>
      </h1>
      <p class="text-gray-600 dark:text-gray-300">Top typing speeds with our community's best typists</p>
    </div>

    <!-- Leaderboard Container -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Loading scores...</p>
      </div>

      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-500">{{ error }}</p>
        <button 
          @click="fetchScores" 
          class="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="scores.length === 0" class="text-center py-8">
        <p class="text-gray-600 dark:text-gray-400">No scores yet. Be the first to submit your score!</p>
        <NuxtLink 
          to="/" 
          class="mt-4 inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Play Now
        </NuxtLink>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Rank</th>
                <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Photo</th>
                <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">WPM</th>
                <th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Accuracy</th>
                <th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Errors</th>
                <th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(score, index) in scores" 
                :key="index"
                class="border-b border-gray-100 dark:border-gray-800 transition-all duration-300 cursor-pointer"
                :class="{
                  'bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30': index === 0,
                  'bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50': index === 1,
                  'bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30': index === 2,
                  'hover:bg-gray-50 dark:hover:bg-gray-750': index > 2
                }"
                @mouseenter="score.highlight = true" 
                @mouseleave="score.highlight = false"
              >
                <td class="px-4 py-3 text-gray-800 dark:text-gray-200">{{ index + 1 }}</td>
                <td class="px-4 py-3">
                  <div class="relative group">
                    <img 
                      :src="getProfilePictureUrl(score.user)" 
                      :alt="`${score.name}'s profile picture`"
                      class="w-10 h-10 rounded-full object-cover border-2 transition-transform duration-300 transform group-hover:scale-110"
                      :class="isCurrentUser(score) ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700'"
                    />
                    <!-- Rank badge for top 3 -->
                    <div v-if="index < 3" class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
                      :class="{
                        'bg-yellow-500': index === 0,
                        'bg-gray-400': index === 1,
                        'bg-amber-600': index === 2
                      }">
                      {{ index + 1 }}
                    </div>
                    <!-- Current user indicator -->
                    <div v-else-if="isCurrentUser(score)" class="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border border-white dark:border-gray-800"></div>

                    <!-- Tooltip -->
                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center">
                      <div class="font-bold text-gray-800 dark:text-white">{{ score.name }}</div>
                      <div class="text-sm text-gray-600 dark:text-gray-300">
                        <div class="flex justify-between mt-1">
                          <span>WPM:</span>
                          <span class="font-semibold text-primary-600">{{ score.wpm }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span>Accuracy:</span>
                          <span>{{ score.accuracy }}%</span>
                        </div>
                      </div>
                      <div class="absolute left-1/2 -bottom-1 w-2 h-2 bg-white dark:bg-gray-800 transform rotate-45 -translate-x-1/2"></div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 font-medium">
                  <span 
                    :class="{
                      'text-primary-600 dark:text-primary-400 font-bold': isCurrentUser(score),
                      'text-gray-800 dark:text-gray-200': !isCurrentUser(score)
                    }"
                  >
                    {{ score.name }}
                    <span v-if="isCurrentUser(score)" class="ml-2 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 py-1 px-2 rounded-full">You</span>
                  </span>
                </td>
                <td class="px-4 py-3 text-right">
                  <span 
                    class="inline-block font-bold transition-all duration-300"
                    :class="{
                      'text-primary-600 dark:text-primary-400 transform scale-110': score.highlight,
                      'text-primary-600 dark:text-primary-400': !score.highlight
                    }"
                  >
                    {{ score.wpm }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">{{ score.accuracy }}%</td>
                <td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">{{ score.errors }}</td>
                <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-400 text-sm">
                  {{ formatDate(score.date) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 text-center">
          <NuxtLink 
            to="/" 
            class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Play Again
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuth } from '~/composables/useAuth';

// Define page metadata for SEO
definePageMeta({
  title: 'TypingRush - Leaderboard',
  description: 'See the top typing speeds on TypingRush'
});

const { loading, error, getTopScores, getProfilePictureUrl } = useApi();
const { user, isAuthenticated } = useAuth();
const scores = ref([]);

// Check if a score belongs to the current user
function isCurrentUser(score) {
  if (!isAuthenticated.value || !user.value || !score.user) {
    return false;
  }
  return score.user === user.value._id;
}

// Format date for display
function formatDate(dateString) {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Fetch scores from API
async function fetchScores() {
  try {
    const data = await getTopScores();
    // Initialize additional properties for interactivity
    scores.value = (data || []).map(score => ({
      ...score,
      highlight: false
    }));
  } catch (err) {
    console.error('Error fetching scores:', err);
  }
}

// Load scores on component mount
onMounted(() => {
  fetchScores();
});
</script>
