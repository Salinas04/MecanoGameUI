<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl shadow-glass overflow-hidden">
      <!-- Chat Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div class="flex items-center">
          <NuxtLink to="/friends" class="mr-4 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </NuxtLink>
          
          <div v-if="friend" class="flex items-center">
            <div class="relative">
              <img :src="getProfilePictureUrl(friend)" alt="Profile" class="w-10 h-10 rounded-full object-cover">
              <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                    :class="{
                      'bg-green-500': onlineFriends.get(friend._id) === 'online',
                      'bg-yellow-500': onlineFriends.get(friend._id) === 'away',
                      'bg-gray-500': !onlineFriends.get(friend._id) || onlineFriends.get(friend._id) === 'offline'
                    }">
              </span>
            </div>
            <div class="ml-3">
              <h2 class="text-lg font-semibold text-gray-800 dark:text-white">{{ friend.username }}</h2>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ onlineFriends.get(friend._id) === 'online' ? 'Online' : 
                   onlineFriends.get(friend._id) === 'away' ? 'Away' : 
                   'Last seen ' + formatLastSeen(friend.lastSeen) }}
              </p>
            </div>
          </div>
          
          <div v-else class="flex items-center">
            <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div class="ml-3">
              <div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mt-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Chat Messages -->
      <div ref="messagesContainer" class="p-4 h-[calc(100vh-250px)] sm:h-[calc(100vh-220px)] md:h-[calc(100vh-200px)] overflow-y-auto" @scroll="handleScroll">
        <div v-if="loading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
        
        <div v-else-if="chatMessages.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p>No messages yet. Start the conversation!</p>
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="(message, index) in chatMessages" :key="message._id || index" 
               @click="() => console.log('Message:', message, 'Sender:', message.sender, 'userId:', userId.value, 'Equal?', message.sender === userId.value)"
               :class="[
                 'max-w-[90%] sm:max-w-[75%] rounded-lg p-2 sm:p-3 text-sm sm:text-base', 
                 isCurrentUserSender(message) ? 
                   'ml-auto bg-primary-600 text-white rounded-br-none' : 
                   'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
               ]">
            <p>{{ message.content }}</p>
            <p :class="[
                 'text-xs mt-1', 
                 isCurrentUserSender(message) ? 
                   'text-primary-200' : 
                   'text-gray-500 dark:text-gray-400'
               ]">
              {{ formatTime(message.createdAt) }}
              <span v-if="isCurrentUserSender(message)" class="ml-1">
                {{ message.read ? '• Read' : '' }}
              </span>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Chat Input -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <form @submit.prevent="sendMessage" class="flex items-center">
          <input 
            v-model="newMessage" 
            type="text" 
            placeholder="Type a message..." 
            class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500"
            :disabled="!friend"
          >
          <button 
            type="submit" 
            class="ml-2 px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm sm:text-base"
            :disabled="!newMessage.trim() || !friend"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '~/composables/useApi';
import { useSocket } from '~/composables/useSocket';
import { useAuth } from '~/composables/useAuth';
import { useToast } from 'vue-toastification';

const route = useRoute();
const toast = useToast();
const { user } = useAuth();
const userId = ref(user.value?._id);

// Ensure userId is set when user changes
watch(() => user.value, (newUser) => {
  if (newUser && newUser._id) {
    console.log('User updated, setting userId to:', newUser._id);
    userId.value = newUser._id;
  }
});

const { 
  loading: apiLoading, 
  error: apiError,
  getUserProfile,
  getChatMessages,
  sendMessage: apiSendMessage,
  getProfilePictureUrl,
  getFriendsList
} = useApi();

const {
  socket,
  isConnected,
  isAuthenticated: socketAuthenticated,
  onlineFriends,
  messages: socketMessages,
  sendPrivateMessage,
  setCurrentChat
} = useSocket();

// State
const friendId = ref(route.params.id);
const friend = ref(null);
const chatMessages = ref([]);
const newMessage = ref('');
const loading = ref(true);
const messagesContainer = ref(null);
const isScrolledToBottom = ref(true);

// Debug current user ID
console.log('Current user ID:', userId.value);

// Load friend profile and chat messages
onMounted(async () => {
  console.log('Component mounted, userId:', userId.value);
  
  if (friendId.value) {
    await loadFriendProfile();
    await loadChatMessages();
    
    // Set current chat in socket
    setCurrentChat(friendId.value);
  }
});

// Watch for new messages from socket
watch(() => socketMessages.value.get(friendId.value), (newMessages) => {
  if (newMessages) {
    chatMessages.value = [...newMessages];
    scrollToBottomIfNeeded();
  }
}, { deep: true });

// Load friend profile
async function loadFriendProfile() {
  try {
    // Get the friends list
    const friendsList = await getFriendsList();
    
    // Find the specific friend by ID
    const foundFriend = friendsList.find(f => f._id === friendId.value);
    
    if (foundFriend) {
      // Use the friend's actual data
      friend.value = foundFriend;
    } else {
      // If friend not found in the list, show an error
      toast.error('Friend not found');
      console.error('Friend not found in friends list');
    }
  } catch (err) {
    toast.error('Failed to load friend profile');
    console.error(err);
  }
}

// Load chat messages
async function loadChatMessages() {
  loading.value = true;
  
  try {
    const messages = await getChatMessages(friendId.value);
    console.log('Messages from API:', messages);
    
    if (messages && messages.length > 0) {
      // Log the first message to check its format
      console.log('First message:', messages[0]);
      console.log('First message sender:', messages[0].sender);
      console.log('First message sender type:', typeof messages[0].sender);
      console.log('userId type:', typeof userId.value);
      console.log('userId === first message sender?', userId.value === messages[0].sender);
    }
    
    chatMessages.value = messages;
    
    // Scroll to bottom after messages load
    await nextTick();
    scrollToBottom();
  } catch (err) {
    toast.error('Failed to load chat messages');
    console.error(err);
  } finally {
    loading.value = false;
  }
}

// Send a message
async function sendMessage() {
  if (!newMessage.value.trim() || !friendId.value) return;
  
  const messageContent = newMessage.value;
  newMessage.value = ''; // Clear input immediately for better UX
  
  try {
    // Try to send via socket for real-time delivery
    const socketSuccess = sendPrivateMessage(friendId.value, messageContent);
    
    // Only use API as fallback if socket fails
    if (!socketSuccess) {
      await apiSendMessage(friendId.value, messageContent);
    }
    
    // Scroll to bottom after sending
    await nextTick();
    scrollToBottom();
  } catch (err) {
    toast.error('Failed to send message');
    console.error(err);
  }
}

// Format time for display
function formatTime(timestamp) {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Format last seen time
function formatLastSeen(timestamp) {
  if (!timestamp) return 'a while ago';
  
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

// Scroll to bottom of messages
function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

// Scroll to bottom only if already at bottom
function scrollToBottomIfNeeded() {
  if (isScrolledToBottom.value) {
    nextTick(() => {
      scrollToBottom();
    });
  }
}

// Handle scroll to detect if user is at bottom
function handleScroll() {
  if (messagesContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value;
    isScrolledToBottom.value = scrollTop + clientHeight >= scrollHeight - 10;
  }
}

// Check if current user is the sender of a message
function isCurrentUserSender(message) {
  // Convert both to strings to ensure consistent comparison
  const userIdStr = String(userId.value);
  const senderStr = String(message.sender);
  return userIdStr === senderStr;
}

// Clean up on unmount
onUnmounted(() => {
  // Clear current chat in socket
  setCurrentChat(null);
});
</script>