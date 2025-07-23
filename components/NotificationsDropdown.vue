<template>
  <div class="relative">
    <!-- Notifications Button -->
    <button 
      @click="toggleDropdown" 
      class="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20"
      v-motion
      :initial="{ scale: 1 }"
      :hover="{ scale: 1.05, transition: { duration: 200 } }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      
      <!-- Notification Badge -->
      <span 
        v-if="unreadNotificationsCount > 0" 
        class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full z-10"
      >
        {{ unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount }}
      </span>
    </button>
    
    <!-- Notifications Dropdown -->
    <div 
      v-if="isOpen" 
      class="absolute right-0 mt-2 w-full sm:w-80 max-w-[95vw] sm:max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
      v-on-click-outside="closeDropdown"
    >
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Notifications</h3>
        <button 
          v-if="notifications.length > 0 && hasUnread" 
          @click="markAllAsRead" 
          class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Mark all as read
        </button>
      </div>
      
      <div class="max-h-96 overflow-y-auto">
        <div v-if="loading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
        
        <div v-else-if="notifications.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
          No notifications
        </div>
        
        <div v-else>
          <div 
            v-for="notification in notifications" 
            :key="notification._id" 
            class="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            :class="{ 'bg-blue-50 dark:bg-blue-900/10': !notification.read }"
            @click="handleNotificationClick(notification)"
          >
            <div class="flex items-start">
              <div v-if="notification.sender" class="flex-shrink-0">
                <img :src="getProfilePictureUrl(notification.sender)" alt="Profile" class="w-10 h-10 rounded-full object-cover">
              </div>
              <div v-else class="flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="notification.type === 'friend_request'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    <path v-else-if="notification.type === 'friend_accepted'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                    <path v-else-if="notification.type === 'message'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm text-gray-800 dark:text-white">{{ notification.content }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ formatTime(notification.createdAt) }}</p>
              </div>
              <div v-if="!notification.read" class="ml-2 w-2 h-2 bg-primary-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
        <NuxtLink to="/friends" class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300" @click="closeDropdown">
          View all notifications
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '~/composables/useApi';
import { useSocket } from '~/composables/useSocket';
import { useToast } from 'vue-toastification';
import { vOnClickOutside } from '@vueuse/components';

const router = useRouter();
const toast = useToast();

const { 
  loading: apiLoading, 
  error: apiError,
  getNotifications,
  markNotificationsAsRead: apiMarkNotificationsAsRead,
  getProfilePictureUrl
} = useApi();

const {
  notifications: socketNotifications,
  unreadNotificationsCount: socketUnreadCount,
  markNotificationsAsRead: socketMarkNotificationsAsRead
} = useSocket();

// State
const isOpen = ref(false);
const notifications = ref([]);
const loading = ref(false);

// Computed
const unreadNotificationsCount = computed(() => socketUnreadCount.value);
const hasUnread = computed(() => notifications.value.some(n => !n.read));

// Watch for new notifications from socket
watch(socketNotifications, (newNotifications) => {
  if (newNotifications.length > 0) {
    notifications.value = [...newNotifications];
  }
}, { deep: true });

// Load notifications
onMounted(async () => {
  await loadNotifications();
});

async function loadNotifications() {
  if (isOpen.value) {
    loading.value = true;
    
    try {
      const data = await getNotifications();
      notifications.value = data;
    } catch (err) {
      toast.error('Failed to load notifications');
      console.error(err);
    } finally {
      loading.value = false;
    }
  }
}

// Toggle dropdown
function toggleDropdown() {
  isOpen.value = !isOpen.value;
  
  if (isOpen.value) {
    loadNotifications();
  }
}

// Close dropdown
function closeDropdown() {
  isOpen.value = false;
}

// Mark all notifications as read
async function markAllAsRead() {
  try {
    // Mark as read via socket for real-time update
    socketMarkNotificationsAsRead();
    
    // Also mark as read via API as fallback
    await apiMarkNotificationsAsRead();
    
    // Update local state
    notifications.value.forEach(notification => {
      notification.read = true;
    });
  } catch (err) {
    toast.error('Failed to mark notifications as read');
    console.error(err);
  }
}

// Handle notification click
function handleNotificationClick(notification) {
  // Navigate based on notification type
  if (notification.type === 'friend_request' || notification.type === 'friend_accepted') {
    router.push('/friends');
  } else if (notification.type === 'message' && notification.sender) {
    router.push(`/chat/${notification.sender._id}`);
  }
  
  // Mark this notification as read
  if (!notification.read) {
    notification.read = true;
    
    // Update unread count
    if (socketUnreadCount.value > 0) {
      socketUnreadCount.value--;
    }
  }
  
  // Close dropdown
  closeDropdown();
}

// Format time for display
function formatTime(timestamp) {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  
  return date.toLocaleDateString();
}
</script>