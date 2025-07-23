<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-300">View your typing statistics and progress</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Loading your data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Welcome Section -->
      <div 
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6"
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        <div class="flex items-center">
          <div 
            class="flex-shrink-0"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 200 } }"
          >
            <div class="h-16 w-16 rounded-full overflow-hidden border-2 border-primary-500 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <img 
                v-if="profilePictureUrl !== '/default-avatar.png' && !imageError"
                :src="profilePictureUrl" 
                alt="Profile" 
                class="h-full w-full object-cover"
                @error="handleImageError"
              />
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-8 w-8 text-gray-500 dark:text-gray-400">
                <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
              </svg>
            </div>
          </div>
          <div 
            class="ml-4"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 300 } }"
          >
            <h2 class="text-xl font-bold text-gray-800 dark:text-white">Welcome, {{ user?.username || 'User' }}!</h2>
            <p class="text-gray-600 dark:text-gray-400">{{ formattedDate }}</p>
          </div>
          <div 
            class="ml-auto"
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 400 } }"
          >
            <NuxtLink 
              to="/profile" 
              class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-xl transition-colors"
              v-motion
              :initial="{ scale: 1 }"
              :hover="{ scale: 1.05, transition: { duration: 200 } }"
            >
              Profile
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Streaks and Level Section -->
      <div 
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
      >
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Daily Streak -->
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              Daily Streak
            </h2>

            <div class="flex items-center justify-between mb-4">
              <div class="text-center flex-1">
                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ user?.currentStreak || 0 }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
              </div>
              <div class="text-center flex-1">
                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ user?.maxStreak || 0 }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Best Streak</div>
              </div>
            </div>

            <!-- Daily Reminder -->
            <div v-if="!hasPlayedTodayValue" class="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded-lg mt-2">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="font-medium text-yellow-700 dark:text-yellow-300">Don't break your streak!</p>
                  <p class="text-sm text-yellow-600 dark:text-yellow-400">Play a game today to keep your streak going.</p>
                </div>
              </div>
              <div class="mt-3 text-center">
                <NuxtLink 
                  to="/" 
                  class="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Play Now
                </NuxtLink>
              </div>
            </div>

            <div v-else class="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded-lg mt-2">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p class="font-medium text-green-700 dark:text-green-300">Great job!</p>
                  <p class="text-sm text-green-600 dark:text-green-400">You've already played today. Your streak is safe.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Level and Experience -->
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Level & Experience
            </h2>

            <div class="flex items-center mb-2">
              <div class="bg-purple-100 dark:bg-purple-900 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ levelInfo.currentLevel }}</span>
              </div>
              <div>
                <div class="font-semibold text-gray-800 dark:text-white">Level {{ levelInfo.currentLevel }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ levelInfo.currentXP }} / {{ levelInfo.nextLevelXP }} XP
                </div>
              </div>
            </div>

            <!-- XP Progress Bar -->
            <div class="mb-4">
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  class="bg-purple-600 dark:bg-purple-500 h-4 rounded-full transition-all duration-1000 ease-out"
                  :style="{ width: `${levelInfo.progress}%` }"
                ></div>
              </div>
              <div class="flex justify-between text-xs mt-1">
                <span class="text-gray-600 dark:text-gray-400">{{ levelInfo.progress }}% complete</span>
                <span class="text-gray-600 dark:text-gray-400">{{ levelInfo.xpNeeded }} XP to level {{ levelInfo.nextLevel }}</span>
              </div>
            </div>

            <div class="text-center mt-4">
              <NuxtLink 
                to="/" 
                class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Earn More XP
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Badges Section -->
      <div 
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
      >
        <h2 
          class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 400 } }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Your Badges
        </h2>

        <!-- No Badges Message -->
        <div 
          v-if="unlockedBadges.length === 0" 
          class="text-center py-8 text-gray-600 dark:text-gray-400"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 500 } }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg font-medium">No badges unlocked yet</p>
          <p class="mt-2">Keep practicing to earn your first badge at level 5!</p>
          <div class="mt-4">
            <NuxtLink 
              to="/" 
              class="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Start Typing
            </NuxtLink>
          </div>
        </div>

        <!-- Badges Grid -->
        <div 
          v-else 
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 500, delay: 500 } }"
        >
          <div 
            v-for="(badge, index) in unlockedBadges" 
            :key="badge.id"
            class="relative bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            v-motion
            :initial="{ opacity: 0, y: 20, scale: 0.9 }"
            :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 500, delay: 500 + (index * 100) } }"
          >
            <!-- Badge Icon with Animation -->
            <div 
              class="text-4xl mb-2 animate-pulse-subtle relative"
              :class="[
                index % 3 === 0 ? 'animate-float-slow' : 
                index % 3 === 1 ? 'animate-float-medium' : 'animate-float-fast'
              ]"
            >
              <!-- Glow Effect -->
              <div class="absolute inset-0 rounded-full bg-amber-400 dark:bg-amber-600 opacity-20 blur-md animate-pulse"></div>
              <div class="relative z-10">{{ badge.icon }}</div>
            </div>
            <div class="font-medium text-gray-800 dark:text-white">{{ badge.name }}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">{{ badge.description }}</div>
          </div>
        </div>

        <!-- Next Badge Information -->
        <div 
          v-if="nextBadge" 
          class="mt-6 bg-amber-50 dark:bg-gray-700 rounded-lg p-4 border border-amber-200 dark:border-gray-600"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 700 } }"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0 mr-4">
              <div class="text-4xl opacity-50">{{ nextBadge.icon }}</div>
            </div>
            <div>
              <h3 class="font-medium text-gray-800 dark:text-white">Next Badge: {{ nextBadge.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ nextBadge.description }}</p>
              <div class="mt-2">
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    class="bg-amber-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    :style="{ width: `${(levelInfo.currentLevel / nextBadge.level) * 100}%` }"
                  ></div>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Level {{ levelInfo.currentLevel }} / {{ nextBadge.level }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Overview -->
      <div 
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
      >
        <h2 
          class="text-xl font-bold text-gray-800 dark:text-white mb-4"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 400 } }"
        >Statistics</h2>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <!-- Total Games -->
          <div 
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 500 } }"
          >
            <div 
              class="text-3xl font-bold text-primary-600 dark:text-primary-400"
              v-motion
              :initial="{ scale: 1 }"
              :enter="{ scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 900 } }"
            >{{ stats?.totalGames || 0 }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Games Played</div>
          </div>

          <!-- Average WPM -->
          <div 
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 600 } }"
          >
            <div 
              class="text-3xl font-bold text-primary-600 dark:text-primary-400"
              v-motion
              :initial="{ scale: 1 }"
              :enter="{ scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 1000 } }"
            >{{ stats?.averageWpm || 0 }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Average WPM</div>
          </div>

          <!-- Best WPM -->
          <div 
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 700 } }"
          >
            <div 
              class="text-3xl font-bold text-primary-600 dark:text-primary-400"
              v-motion
              :initial="{ scale: 1 }"
              :enter="{ scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 1100 } }"
            >{{ stats?.bestWpm || 0 }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Best WPM</div>
          </div>

          <!-- Best Phrases -->
          <div 
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 750 } }"
          >
            <div 
              class="text-3xl font-bold text-primary-600 dark:text-primary-400"
              v-motion
              :initial="{ scale: 1 }"
              :enter="{ scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 1150 } }"
            >{{ stats?.bestCompletedPhrases || 0 }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Best Phrases</div>
          </div>

          <!-- Average Accuracy -->
          <div 
            class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 800 } }"
          >
            <div 
              class="text-3xl font-bold text-primary-600 dark:text-primary-400"
              v-motion
              :initial="{ scale: 1 }"
              :enter="{ scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 1200 } }"
            >{{ stats?.averageAccuracy || 0 }}%</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Average Accuracy</div>
          </div>
        </div>
      </div>

      <!-- Charts Section (Collapsible) -->
      <div 
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 600 } }"
      >
        <!-- Collapsible Header -->
        <div 
          @click="toggleChartsVisibility" 
          class="flex justify-between items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 group"
          :class="{ 'bg-gray-50 dark:bg-gray-750': showCharts }"
          v-motion
          :initial="{ scale: 1 }"
          :enter="{ scale: [1, 1.02, 1], transition: { repeat: 2, duration: 1000, delay: 1500 } }"
        >
          <h2 
            class="text-xl font-bold text-gray-800 dark:text-white flex items-center"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 700 } }"
          >
            <!-- Chart icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Additional Information</span>
            <span class="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
              {{ showCharts ? 'Click to hide' : 'Click to show' }}
            </span>
          </h2>
          <div class="flex items-center">
            <span class="mr-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
              {{ showCharts ? 'Hide charts' : 'Show charts' }}
            </span>
            <div 
              class="bg-gray-200 dark:bg-gray-600 rounded-full p-1 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors duration-300 relative"
              title="Click to toggle charts visibility"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                :class="['h-6 w-6 transition-transform duration-300 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400', showCharts ? 'transform rotate-180' : '']" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <!-- Pulsing dot indicator when collapsed -->
              <span 
                v-if="!showCharts" 
                class="absolute -top-1 -right-1 h-3 w-3 bg-primary-500 rounded-full animate-ping opacity-75"
              ></span>
              <span 
                v-if="!showCharts" 
                class="absolute -top-1 -right-1 h-3 w-3 bg-primary-500 rounded-full"
              ></span>
            </div>
          </div>
        </div>

        <!-- Collapsible Content -->
        <div 
          class="transition-all duration-500 ease-in-out overflow-hidden"
          :style="{ 
            maxHeight: showCharts ? '3000px' : '0px', 
            opacity: showCharts ? 1 : 0,
            transform: showCharts ? 'translateY(0)' : 'translateY(-10px)',
            marginTop: showCharts ? '16px' : '0px'
          }"
        >
          <div class="mt-4 mb-4 border-t border-gray-200 dark:border-gray-700 pt-4"></div>

          <div class="flex justify-between items-center mb-4">
            <h3 
              class="text-lg font-semibold text-gray-700 dark:text-gray-300"
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 700 } }"
            >Performance Charts</h3>

            <div 
              class="flex space-x-2"
              v-motion
              :initial="{ opacity: 0, x: 20 }"
              :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 700 } }"
            >
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button 
                  @click="selectedPeriod = 'week'" 
                  :class="[
                    'px-3 py-1 text-sm font-medium rounded-l-lg border',
                    selectedPeriod === 'week' 
                      ? 'bg-primary-600 text-white border-primary-600' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  ]"
                >
                  Week
                </button>
                <button 
                  @click="selectedPeriod = 'month'" 
                  :class="[
                    'px-3 py-1 text-sm font-medium border-y',
                    selectedPeriod === 'month' 
                      ? 'bg-primary-600 text-white border-primary-600' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  ]"
                >
                  Month
                </button>
                <button 
                  @click="selectedPeriod = 'all'" 
                  :class="[
                    'px-3 py-1 text-sm font-medium rounded-r-lg border',
                    selectedPeriod === 'all' 
                      ? 'bg-primary-600 text-white border-primary-600' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  ]"
                >
                  All Time
                </button>
              </div>
            </div>
          </div>

        <!-- WPM Chart -->
        <div 
          class="mb-8"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 800 } }"
        >
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">WPM Progress</h3>
            <button 
              @click="toggleChartType('wpm')" 
              class="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300"
            >
              Switch to {{ chartTypes.wpm === 'line' ? 'Bar' : 'Line' }}
            </button>
          </div>

          <div v-if="userScores.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            No data available. Play more games to see your progress!
          </div>
          <div v-else class="h-80">
            <ClientOnly>
              <apexchart
                type="line"
                height="100%"
                :options="wpmChartOptions"
                :series="wpmSeries"
              ></apexchart>
              <template #fallback>
                <div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p class="text-gray-500 dark:text-gray-400">Loading chart...</p>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>

        <!-- Accuracy Chart -->
        <div 
          class="mb-8"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 900 } }"
        >
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Accuracy Trend</h3>
            <button 
              @click="toggleChartType('accuracy')" 
              class="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300"
            >
              Switch to {{ chartTypes.accuracy === 'line' ? 'Bar' : 'Line' }}
            </button>
          </div>

          <div v-if="userScores.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            No data available. Play more games to see your accuracy trend!
          </div>
          <div v-else class="h-80">
            <ClientOnly>
              <apexchart
                type="line"
                height="100%"
                :options="accuracyChartOptions"
                :series="accuracySeries"
              ></apexchart>
              <template #fallback>
                <div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p class="text-gray-500 dark:text-gray-400">Loading chart...</p>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>

        <!-- Performance Comparison Chart -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 1000 } }"
        >
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance Comparison</h3>

          <div v-if="!stats" class="text-center py-8 text-gray-500 dark:text-gray-400">
            No data available. Play more games to see your performance comparison!
          </div>
          <div v-else class="h-80">
            <ClientOnly>
              <apexchart
                type="bar"
                height="100%"
                :options="comparisonChartOptions"
                :series="comparisonSeries"
              ></apexchart>
              <template #fallback>
                <div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p class="text-gray-500 dark:text-gray-400">Loading chart...</p>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>

      <!-- Recent Scores -->
      <div 
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 1100 } }"
      >
        <h2 
          class="text-xl font-bold text-gray-800 dark:text-white mb-4"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 500, delay: 1000 } }"
        >Recent Scores</h2>

        <div 
          v-if="stats?.recentScores?.length === 0" 
          class="text-center py-4 text-gray-600 dark:text-gray-400"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 500, delay: 1100 } }"
        >
          No scores yet. Start playing to see your results!
        </div>

        <div 
          v-else 
          class="overflow-x-auto"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 500, delay: 1100 } }"
        >
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Date</th>
                <th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">WPM</th>
                <th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Accuracy</th>
                <th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Errors</th>
                <th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Phrases</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(score, index) in stats?.recentScores" 
                :key="index"
                class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
                v-motion
                :initial="{ opacity: 0, y: 10 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 300, delay: 1200 + (index * 100) } }"
              >
                <td class="px-4 py-3 text-gray-800 dark:text-gray-200">{{ formatDate(score.date) }}</td>
                <td class="px-4 py-3 text-right text-primary-600 dark:text-primary-400 font-bold">{{ score.wpm }}</td>
                <td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">{{ score.accuracy }}%</td>
                <td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">{{ score.errors }}</td>
                <td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">{{ score.completedPhrases || 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div 
          class="mt-4 text-center"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 1500 } }"
        >
          <NuxtLink 
            to="/" 
            class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-xl transition-colors"
            v-motion
            :initial="{ scale: 1 }"
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
          >
            Start Typing
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useApi } from '~/composables/useApi';
import { useRouter } from 'nuxt/app';
import { calculateLevel, getNextLevelInfo, hasPlayedToday } from '~/utils/levelUtils';
import { getUnlockedBadges, getNextBadge } from '~/utils/badgeUtils';

// Import ApexCharts (client-side only)
let VueApexCharts = null;
let apexchart = null;

if (process.client) {
  // Dynamic import for client-side only
  import('vue3-apexcharts').then((module) => {
    VueApexCharts = module.default;
    apexchart = VueApexCharts;
  });
}

// Detect dark mode
const isDarkMode = computed(() => {
  if (process.client) {
    return document.documentElement.classList.contains('dark');
  }
  return false;
});

// Define page metadata for SEO
definePageMeta({
  title: 'Dashboard - TypingRush',
  description: 'View your typing statistics and progress'
});

const router = useRouter();
const { user, isAuthenticated } = useAuth();
const { loading, error, getUserStats, getUserScores, getProfilePictureUrl } = useApi();

const stats = ref(null);
const userScores = ref([]);
const imageError = ref(false);
const showCharts = ref(false); // Charts are hidden by default

// Function to toggle charts visibility
function toggleChartsVisibility() {
  showCharts.value = !showCharts.value;
}

// Chart time period filter
const selectedPeriod = ref('all'); // 'week', 'month', 'all'
const chartTypes = ref({
  wpm: 'line',
  accuracy: 'line'
});

// Chart options and series
const wpmChartOptions = computed(() => ({
  chart: {
    type: chartTypes.value.wpm,
    height: 350,
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    },
    fontFamily: 'inherit',
    foreColor: isDarkMode.value ? '#CBD5E1' : '#475569'
  },
  colors: ['#6366F1'],
  title: {
    text: 'WPM Progress Over Time',
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: isDarkMode.value ? '#F1F5F9' : '#1E293B'
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeUTC: false,
      format: 'dd MMM'
    },
    title: {
      text: 'Date'
    }
  },
  yaxis: {
    title: {
      text: 'Words Per Minute'
    },
    min: function(min) {
      return min > 20 ? min - 20 : 0;
    }
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy'
    },
    theme: isDarkMode.value ? 'dark' : 'light'
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  markers: {
    size: 4,
    hover: {
      size: 6
    }
  },
  grid: {
    borderColor: isDarkMode.value ? '#334155' : '#E2E8F0'
  },
  theme: {
    mode: isDarkMode.value ? 'dark' : 'light'
  }
}));

const accuracyChartOptions = computed(() => ({
  chart: {
    type: chartTypes.value.accuracy,
    height: 350,
    toolbar: {
      show: true
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    },
    fontFamily: 'inherit',
    foreColor: isDarkMode.value ? '#CBD5E1' : '#475569'
  },
  colors: ['#10B981'],
  title: {
    text: 'Accuracy Trend',
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: isDarkMode.value ? '#F1F5F9' : '#1E293B'
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeUTC: false,
      format: 'dd MMM'
    },
    title: {
      text: 'Date'
    }
  },
  yaxis: {
    title: {
      text: 'Accuracy (%)'
    },
    min: function(min) {
      return min > 20 ? min - 20 : 0;
    },
    max: 100
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy'
    },
    theme: isDarkMode.value ? 'dark' : 'light'
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  markers: {
    size: 4,
    hover: {
      size: 6
    }
  },
  grid: {
    borderColor: isDarkMode.value ? '#334155' : '#E2E8F0'
  },
  theme: {
    mode: isDarkMode.value ? 'dark' : 'light'
  }
}));

const comparisonChartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 350,
    stacked: false,
    toolbar: {
      show: true
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    },
    fontFamily: 'inherit',
    foreColor: isDarkMode.value ? '#CBD5E1' : '#475569'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 5
    },
  },
  colors: ['#6366F1', '#10B981', '#F43F5E'],
  title: {
    text: 'Performance Metrics',
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: isDarkMode.value ? '#F1F5F9' : '#1E293B'
    }
  },
  xaxis: {
    categories: ['Average', 'Best', 'Recent'],
  },
  yaxis: [
    {
      title: {
        text: 'WPM',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Accuracy (%)',
      },
      min: 0,
      max: 100
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: isDarkMode.value ? 'dark' : 'light'
  },
  legend: {
    position: 'top'
  },
  grid: {
    borderColor: isDarkMode.value ? '#334155' : '#E2E8F0'
  },
  theme: {
    mode: isDarkMode.value ? 'dark' : 'light'
  }
}));

// Computed series data for charts
const wpmSeries = computed(() => {
  if (!userScores.value || userScores.value.length === 0) {
    return [{ name: 'WPM', data: [] }];
  }

  // Filter scores based on selected period
  const filteredScores = filterScoresByPeriod(userScores.value);

  // Map scores to chart data format
  const data = filteredScores.map(score => ({
    x: new Date(score.date).getTime(),
    y: score.wpm
  }));

  return [{ name: 'WPM', data }];
});

const accuracySeries = computed(() => {
  if (!userScores.value || userScores.value.length === 0) {
    return [{ name: 'Accuracy', data: [] }];
  }

  // Filter scores based on selected period
  const filteredScores = filterScoresByPeriod(userScores.value);

  // Map scores to chart data format
  const data = filteredScores.map(score => ({
    x: new Date(score.date).getTime(),
    y: score.accuracy
  }));

  return [{ name: 'Accuracy', data }];
});

const comparisonSeries = computed(() => {
  if (!stats.value) {
    return [];
  }

  const recentWpm = userScores.value.length > 0 ? userScores.value[0].wpm : 0;
  const recentAccuracy = userScores.value.length > 0 ? userScores.value[0].accuracy : 0;

  return [
    {
      name: 'WPM',
      data: [stats.value.averageWpm || 0, stats.value.bestWpm || 0, recentWpm]
    },
    {
      name: 'Accuracy',
      data: [stats.value.averageAccuracy || 0, 
             userScores.value.reduce((max, score) => Math.max(max, score.accuracy), 0) || 0, 
             recentAccuracy],
      yAxisIndex: 1
    }
  ];
});

// Handle image loading errors
function handleImageError() {
  imageError.value = true;
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

// Filter scores based on selected time period
function filterScoresByPeriod(scores) {
  if (!scores || scores.length === 0 || selectedPeriod.value === 'all') {
    return scores;
  }

  const now = new Date();
  let cutoffDate;

  if (selectedPeriod.value === 'week') {
    cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  } else if (selectedPeriod.value === 'month') {
    cutoffDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); // 1 month ago
  }

  return scores.filter(score => new Date(score.date) >= cutoffDate);
}

// Toggle chart type
function toggleChartType(chartName) {
  if (chartName === 'wpm') {
    chartTypes.value.wpm = chartTypes.value.wpm === 'line' ? 'bar' : 'line';
  } else if (chartName === 'accuracy') {
    chartTypes.value.accuracy = chartTypes.value.accuracy === 'line' ? 'bar' : 'line';
  }
}

// Get current date
const formattedDate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString(undefined, { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
});

// Compute level information
const levelInfo = computed(() => {
  if (!user.value) return { currentLevel: 1, nextLevel: 2, currentXP: 0, nextLevelXP: 100, xpNeeded: 100, progress: 0 };

  return getNextLevelInfo(user.value.experience || 0);
});

// Compute unlocked badges
const unlockedBadges = computed(() => {
  if (!user.value) return [];
  
  return getUnlockedBadges(user.value.experience || 0);
});

// Compute next badge to unlock
const nextBadge = computed(() => {
  if (!user.value) return null;
  
  return getNextBadge(user.value.experience || 0);
});

// Check if user has played today
const hasPlayedTodayValue = computed(() => {
  if (!user.value || !user.value.lastActiveDate) return false;

  return hasPlayedToday(user.value.lastActiveDate);
});

// Compute the profile picture URL
const profilePictureUrl = computed(() => {
  // If no user or profile picture, return default
  if (!user.value) return '/default-avatar.png';

  // Use the getProfilePictureUrl function which handles all cases
  return getProfilePictureUrl(user.value);
});

// Fetch user statistics and scores
async function fetchUserStats() {
  try {
    // Fetch user statistics
    stats.value = await getUserStats();

    // Fetch user scores for charts
    userScores.value = await getUserScores();

    // Sort scores by date (newest first)
    if (userScores.value && userScores.value.length > 0) {
      userScores.value.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
  }
}

// Watch for dark mode changes to update charts
watch(isDarkMode, () => {
  // The computed chart options will automatically update when isDarkMode changes
  // This empty watch is just to ensure reactivity
}, { immediate: true });

// Redirect if not authenticated
onMounted(() => {
  if (process.client && !isAuthenticated.value) {
    router.push('/login');
  } else {
    fetchUserStats();
  }
});
</script>
