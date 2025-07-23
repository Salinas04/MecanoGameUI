<template>
  <div class="max-w-3xl mx-auto">
    <div 
      class="text-center mb-8"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    >
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">TypingRush</h1>
      <p class="text-gray-600 dark:text-gray-300">Improve your typing speed and accuracy</p>
    </div>

    <!-- Game Container -->
    <div 
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6 relative overflow-hidden"
      v-motion
      :initial="{ opacity: 0, scale: 0.9 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 200 } }"
    >

      <!-- Phrase Display -->
      <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 mono text-lg leading-relaxed">
        <span 
          v-for="(char, index) in phrase.split('')" 
          :key="index"
          :class="{
            'text-green-500': charStatus[index] === 'correct',
            'text-red-500': charStatus[index] === 'incorrect',
            'text-gray-500 dark:text-gray-400': charStatus[index] === 'pending'
          }"
        >{{ char }}</span>
      </div>

      <!-- Input Field -->
      <div class="mb-6">
        <input
          v-model="userInput"
          type="text"
          :disabled="isGameComplete"
          class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white mono focus:outline-none focus:ring-2 focus:ring-primary-500"
          :class="{ 'opacity-50': isGameComplete }"
          placeholder="Start typing here..."
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          @copy.prevent
          @cut.prevent
          @paste.prevent
          onpaste="return false"
        />
      </div>

      <!-- Timer Display -->
      <div 
        class="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
      >
        <div class="text-3xl font-bold" :class="timeRemaining < 30 ? 'text-red-500' : 'text-primary-600 dark:text-primary-400'">
          {{ formattedTimeRemaining }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Time Remaining</div>
      </div>

      <!-- Stats Display -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div 
          class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 300 } }"
        >
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ wpm }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">WPM</div>
        </div>
        <div 
          class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 400 } }"
        >
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ accuracy }}%</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
        </div>
        <div 
          class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
          v-motion
          :initial="{ opacity: 0, x: 20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 500 } }"
        >
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ totalErrors }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Errors</div>
        </div>
        <div 
          class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
          v-motion
          :initial="{ opacity: 0, x: 20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 600 } }"
        >
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ completedPhrases }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Phrases</div>
        </div>
      </div>

      <!-- Action Button (only shown when game is complete) -->
      <client-only>
        <div v-if="isGameComplete" class="text-center relative">
          <button 
            @click="getNewPhrase"
            class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      </client-only>
    </div>

    <!-- Best Score -->
    <client-only>
      <div 
        v-if="bestScore" 
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }"
        :triggers="[bestScore]"
      >

        <h2 
          class="text-xl font-bold text-gray-800 dark:text-white mb-4 relative"
          v-motion
          :initial="{ x: -20, opacity: 0 }"
          :enter="{ x: 0, opacity: 1, transition: { duration: 400, delay: 700 } }"
        >Your Best Score</h2>
        <div class="grid grid-cols-4 gap-4 relative">
          <div 
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
            v-motion
            :initial="{ scale: 0.8, opacity: 0 }"
            :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 800 } }"
          >
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ bestScore.wpm }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">WPM</div>
          </div>
          <div 
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
            v-motion
            :initial="{ scale: 0.8, opacity: 0 }"
            :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 900 } }"
          >
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ bestScore.accuracy }}%</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>
          <div 
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
            v-motion
            :initial="{ scale: 0.8, opacity: 0 }"
            :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 1000 } }"
          >
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ bestScore.errors }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Errors</div>
          </div>
          <div 
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
            v-motion
            :initial="{ scale: 0.8, opacity: 0 }"
            :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 1100 } }"
          >
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ bestScore.completedPhrases || 0 }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Phrases</div>
          </div>
        </div>
      </div>
    </client-only>

    <!-- Results Modal -->
    <client-only>
      <div 
        v-if="isGameComplete" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 300 } }"
        :leave="{ opacity: 0, transition: { duration: 200 } }"
      >
        <div 
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md w-full p-6"
          v-motion
          :initial="{ scale: 0.9, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }"
          :leave="{ scale: 0.9, opacity: 0, transition: { duration: 200 } }"
        >

          <div 
            class="text-center mb-6 relative"
            v-motion
            :initial="{ y: -20, opacity: 0 }"
            :enter="{ y: 0, opacity: 1, transition: { duration: 400, delay: 100 } }"
          >
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Results</h2>
            <p class="text-gray-600 dark:text-gray-400">
              {{ wpm > 40 ? 'Great job!' : 'Keep practicing!' }}
            </p>
          </div>

          <div class="grid grid-cols-4 gap-4 mb-6 relative">
            <div 
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
              v-motion
              :initial="{ scale: 0.8, opacity: 0 }"
              :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 200 } }"
            >
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ wpm }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">WPM</div>
            </div>
            <div 
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
              v-motion
              :initial="{ scale: 0.8, opacity: 0 }"
              :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 300 } }"
            >
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ accuracy }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
            </div>
            <div 
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
              v-motion
              :initial="{ scale: 0.8, opacity: 0 }"
              :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 400 } }"
            >
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ totalErrors }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Errors</div>
            </div>
            <div 
              class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
              v-motion
              :initial="{ scale: 0.8, opacity: 0 }"
              :enter="{ scale: 1, opacity: 1, transition: { duration: 400, delay: 500 } }"
            >
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ completedPhrases }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Phrases</div>
            </div>
          </div>

          <!-- Authentication-dependent content -->
          <!-- Authenticated User -->
          <div 
            v-if="isAuthenticated"
            class="mb-6 relative"
            v-motion
            :initial="{ y: 20, opacity: 0 }"
            :enter="{ y: 0, opacity: 1, transition: { duration: 400, delay: 500 } }"
          >
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Your score has been automatically saved to your account.
            </p>

            <div 
              class="flex justify-center"
              v-motion
              :initial="{ y: 20, opacity: 0 }"
              :enter="{ y: 0, opacity: 1, transition: { duration: 400, delay: 600 } }"
            >
              <button 
                @click="getNewPhrase"
                class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-xl transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>

          <!-- Anonymous User -->
          <div v-else>
            <div 
              class="mb-6 relative"
              v-motion
              :initial="{ y: 20, opacity: 0 }"
              :enter="{ y: 0, opacity: 1, transition: { duration: 400, delay: 500 } }"
            >
              <p v-if="playerName.trim()" class="text-gray-700 dark:text-gray-300 mb-4">
                Your score has been automatically saved as "{{ playerName.trim() }}".
              </p>
              <template v-else>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">Save your score:</label>
                <input
                  v-model="playerName"
                  type="text"
                  class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your name"
                  @keyup.enter="saveAnonymousScore"
                />
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <NuxtLink to="/login" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                    Log in
                  </NuxtLink> 
                  or 
                  <NuxtLink to="/register" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                    register
                  </NuxtLink> 
                  to track your progress and appear on the leaderboard!
                </p>
              </template>
            </div>

            <div 
              class="flex space-x-4 relative"
              v-motion
              :initial="{ y: 20, opacity: 0 }"
              :enter="{ y: 0, opacity: 1, transition: { duration: 400, delay: 600 } }"
            >
              <button 
                v-if="!playerName.trim()"
                @click="saveAnonymousScore"
                class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                :disabled="loading || !playerName.trim()"
              >
                {{ loading ? 'Saving...' : 'Save Score' }}
              </button>
              <button 
                @click="getNewPhrase"
                :class="[
                  playerName.trim() ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white',
                  'flex-1 font-medium py-3 px-4 rounded-xl transition-colors'
                ]"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTypingGame } from '../composables/useTypingGame.js';
import { useAuth } from '../composables/useAuth';
import {useApi} from '../composables/useApi.js';

// Define page metadata for SEO
definePageMeta({
  title: 'TypingRush - Improve Your Typing Speed',
  description: 'Practice typing and improve your speed and accuracy with TypingRush'
});

// Initialize composables
const { 
  phrase, 
  userInput, 
  isGameActive, 
  isGameComplete, 
  errors, 
  wpm, 
  accuracy, 
  charStatus, 
  bestScore,
  completedPhrases,
  totalErrors,
  timeRemaining,
  formattedTimeRemaining,
  setPhrase, 
  resetGame,
  completePhrase,
  onPhraseCompleted
} = useTypingGame();

const { loading, error, getRandomPhrase, saveScore } = useApi();
const { user, isAuthenticated } = useAuth();

// Player name for saving score
const playerName = ref('');

// Store previously used phrases to avoid repetition
const usedPhrases = ref([]);

// Watch for phrase completion to get a new phrase
watch(userInput, async (newValue, oldValue) => {
  // Start the game when the user begins typing
  if (newValue.length === 1 && oldValue.length === 0 && !isGameActive.value) {
    startTimer();
  }
});

// Watch for game completion to automatically save score
watch(isGameComplete, async (newValue, oldValue) => {
  if (newValue === true && !oldValue) {
    // Game has just completed
    if (isAuthenticated.value) {
      // Automatically save score for authenticated users
      await saveAuthenticatedScore();
    } else if (playerName.value.trim()) {
      // Automatically save score for anonymous users with a name
      await saveAnonymousScore();
    }
    // For anonymous users without a name, the modal will prompt them to enter a name
  }
});

// Fetch a new phrase from the API
async function getNewPhrase() {
  try {
    // Close the results modal if it's open
    if (isGameComplete.value) {
      resetGame();
    }
    
    // Add current phrase to used phrases if it exists
    if (phrase.value && phrase.value.trim() !== '') {
      if (!usedPhrases.value.includes(phrase.value)) {
        usedPhrases.value.push(phrase.value);
      }
    }
    
    // If we've used too many phrases, clear some older ones
    const MAX_HISTORY = 20; // Keep track of last 20 phrases at most
    if (usedPhrases.value.length > MAX_HISTORY) {
      // Remove oldest phrases but keep the most recent ones
      usedPhrases.value = usedPhrases.value.slice(-MAX_HISTORY);
    }
    
    let data = await getRandomPhrase();
    if (data && data.text) {
      let attempts = 0;
      const maxAttempts = 15; // Increase max attempts to find a new phrase
      
      // Try to get a phrase that hasn't been used recently
      while (usedPhrases.value.includes(data.text) && attempts < maxAttempts) {
        attempts++;
        data = await getRandomPhrase();
        
        // If we've tried many times and still getting used phrases,
        // it might mean we've gone through all available phrases
        if (attempts >= maxAttempts - 1) {
          usedPhrases.value = []; // Reset used phrases if we can't find new ones
          break;
        }
      }
      
      setPhrase(data.text);
    }
  } catch (err) {
    // Error handling is kept silent as requested
  }
}

// Save the authenticated user's score
async function saveAuthenticatedScore() {
  try {
    await saveScore({
      name: user.value.username,
      wpm: wpm.value,
      accuracy: accuracy.value,
      errors: totalErrors.value,
      completedPhrases: completedPhrases.value
    });

    // Close modal and reset game
    resetGame();
    usedPhrases.value = []; // Reset phrase history
    getNewPhrase();
  } catch (err) {
    // Error handling is kept silent as requested
  }
}

// Save an anonymous user's score
async function saveAnonymousScore() {
  if (!playerName.value.trim()) {
    alert('Please enter your name');
    return;
  }

  try {
    await saveScore({
      name: playerName.value.trim(),
      wpm: wpm.value,
      accuracy: accuracy.value,
      errors: totalErrors.value,
      completedPhrases: completedPhrases.value
    });

    // Close modal and reset game
    resetGame();
    usedPhrases.value = []; // Reset phrase history
    getNewPhrase();
  } catch (err) {
    // Error handling is kept silent as requested
  }
}

// Set up the callback to get a new phrase when a phrase is completed
onPhraseCompleted.value = async () => {
  await getNewPhrase();
};

// Initialize the game with a phrase
onMounted(() => {
  resetGame();
  usedPhrases.value = []; // Reset phrase history on initial load
  getNewPhrase();
});
</script>
