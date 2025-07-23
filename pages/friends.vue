<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left sidebar - Friends list and requests -->
      <div class="w-full md:w-1/3 space-y-6">
        <!-- Friend Requests Section -->
        <div class="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl p-6 shadow-glass">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <span>Friend Requests</span>
            <span v-if="friendRequests.received.length > 0" 
                  class="ml-2 bg-primary-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              {{ friendRequests.received.length }}
            </span>
          </h2>
          
          <div v-if="friendRequests.received.length === 0 && friendRequests.sent.length === 0" 
               class="text-gray-500 dark:text-gray-400 text-center py-4">
            No pending friend requests
          </div>
          
          <!-- Received Requests -->
          <div v-if="friendRequests.received.length > 0" class="mb-4">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Received</h3>
            <ul class="space-y-3">
              <li v-for="request in friendRequests.received" :key="request._id" 
                  class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div class="flex items-center">
                  <img :src="getProfilePictureUrl(request.sender)" alt="Profile" 
                       class="w-10 h-10 rounded-full object-cover mr-3">
                  <span class="font-medium">{{ request.sender.username }}</span>
                </div>
                <div class="flex space-x-2 mt-2 sm:mt-0 ml-auto">
                  <button @click="acceptFriendRequest(request._id)" 
                          class="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors">
                    Accept
                  </button>
                  <button @click="rejectFriendRequest(request._id)" 
                          class="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md text-sm transition-colors">
                    Reject
                  </button>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- Sent Requests -->
          <div v-if="friendRequests.sent.length > 0">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Sent</h3>
            <ul class="space-y-3">
              <li v-for="request in friendRequests.sent" :key="request._id" 
                  class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div class="flex items-center">
                  <img :src="getProfilePictureUrl(request.receiver)" alt="Profile" 
                       class="w-10 h-10 rounded-full object-cover mr-3">
                  <span class="font-medium">{{ request.receiver.username }}</span>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">Pending</span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Friends List Section -->
        <div class="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl p-6 shadow-glass">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <span>Friends</span>
            <span v-if="friends.length > 0" 
                  class="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              {{ friends.length }}
            </span>
          </h2>
          
          <div v-if="loading" class="flex justify-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
          
          <div v-else-if="friends.length === 0" class="text-gray-500 dark:text-gray-400 text-center py-4">
            No friends yet. Start by adding some!
          </div>
          
          <ul v-else class="space-y-3">
            <li v-for="friend in friends" :key="friend._id" 
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors cursor-pointer"
                @click="openChat(friend._id)">
              <div class="flex items-center">
                <div class="relative">
                  <img :src="getProfilePictureUrl(friend)" alt="Profile" 
                       class="w-10 h-10 rounded-full object-cover mr-3">
                  <span class="absolute bottom-0 right-2 w-3 h-3 rounded-full"
                        :class="{
                          'bg-green-500': onlineFriends.get(friend._id) === 'online',
                          'bg-yellow-500': onlineFriends.get(friend._id) === 'away',
                          'bg-gray-500': !onlineFriends.get(friend._id) || onlineFriends.get(friend._id) === 'offline'
                        }">
                  </span>
                </div>
                <div>
                  <div class="font-medium">{{ friend.username }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ onlineFriends.get(friend._id) === 'online' ? 'Online' : 
                       onlineFriends.get(friend._id) === 'away' ? 'Away' : 
                       'Offline' }}
                  </div>
                </div>
              </div>
              <div class="flex space-x-2 mt-2 sm:mt-0 ml-auto">
                <button @click.stop="openChat(friend._id)" 
                        class="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors">
                  Chat
                </button>
                <button @click.stop="removeFriend(friend._id)" 
                        class="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md text-sm transition-colors">
                  Remove
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Right content - Search and Add Friends -->
      <div class="w-full md:w-2/3">
        <div class="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl p-6 shadow-glass">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Find Friends</h2>
          
          <div class="mb-6">
            <div class="relative">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search by username or email" 
                class="w-full px-4 py-2 bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500"
                @keyup.enter="searchUsers"
              >
              <button 
                @click="searchUsers" 
                class="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          
          <div v-if="searchLoading" class="flex justify-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
          
          <div v-else-if="searchResults.length === 0 && hasSearched" class="text-gray-500 dark:text-gray-400 text-center py-4">
            No users found matching your search
          </div>
          
          <ul v-else-if="searchResults.length > 0" class="space-y-3">
            <li v-for="user in searchResults" :key="user._id" 
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div class="flex items-center">
                <img :src="getProfilePictureUrl(user)" alt="Profile" 
                     class="w-10 h-10 rounded-full object-cover mr-3">
                <span class="font-medium">{{ user.username }}</span>
              </div>
              <button 
                @click="sendFriendRequest(user._id)" 
                class="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors mt-2 sm:mt-0"
                :disabled="isFriend(user._id) || hasPendingRequest(user._id)"
                :class="{ 'opacity-50 cursor-not-allowed': isFriend(user._id) || hasPendingRequest(user._id) }"
              >
                {{ isFriend(user._id) ? 'Already Friends' : 
                   hasPendingRequest(user._id) ? 'Request Pending' : 'Add Friend' }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useApi } from '~/composables/useApi';
import { useSocket } from '~/composables/useSocket';
import { useRouter } from 'vue-router';

const router = useRouter();

const { 
  loading: apiLoading, 
  error: apiError,
  getFriendsList,
  getFriendRequests,
  searchUsers: apiSearchUsers,
  respondToFriendRequest: apiRespondToFriendRequest,
  removeFriend: apiRemoveFriend,
  getProfilePictureUrl
} = useApi();

const {
  onlineFriends,
  sendFriendRequest: socketSendFriendRequest,
  respondToFriendRequest: socketRespondToFriendRequest
} = useSocket();

// State
const friends = ref([]);
const friendRequests = ref({ received: [], sent: [] });
const searchQuery = ref('');
const searchResults = ref([]);
const searchLoading = ref(false);
const hasSearched = ref(false);
const loading = computed(() => apiLoading.value);

// Load friends and friend requests
onMounted(async () => {
  await loadFriends();
  await loadFriendRequests();
});

async function loadFriends() {
  try {
    friends.value = await getFriendsList();
  } catch (err) {
    console.error('Failed to load friends:', err);
  }
}

async function loadFriendRequests() {
  try {
    friendRequests.value = await getFriendRequests();
  } catch (err) {
    console.error('Failed to load friend requests:', err);
  }
}

// Search for users
async function searchUsers() {
  if (!searchQuery.value.trim()) return;
  
  searchLoading.value = true;
  hasSearched.value = true;
  
  try {
    searchResults.value = await apiSearchUsers(searchQuery.value);
  } catch (err) {
    console.error('Failed to search users:', err);
  } finally {
    searchLoading.value = false;
  }
}

// Send friend request
async function sendFriendRequest(userId) {
  try {
    // Send via socket for real-time notification
    socketSendFriendRequest(userId);
    
    // Also send via API as fallback
    await apiSearchUsers(userId);
    
    console.log('Friend request sent successfully');
    
    // Refresh friend requests
    await loadFriendRequests();
  } catch (err) {
    console.error('Failed to send friend request:', err);
  }
}

// Accept friend request
async function acceptFriendRequest(requestId) {
  try {
    // Accept via socket for real-time notification
    socketRespondToFriendRequest(requestId, true);
    
    // Also accept via API as fallback
    await apiRespondToFriendRequest(requestId, true);
    
    console.log('Friend request accepted successfully');
    
    // Refresh friends and friend requests
    await loadFriends();
    await loadFriendRequests();
  } catch (err) {
    console.error('Failed to accept friend request:', err);
  }
}

// Reject friend request
async function rejectFriendRequest(requestId) {
  try {
    // Reject via socket for real-time notification
    socketRespondToFriendRequest(requestId, false);
    
    // Also reject via API as fallback
    await apiRespondToFriendRequest(requestId, false);
    
    console.log('Friend request rejected successfully');
    
    // Refresh friend requests
    await loadFriendRequests();
  } catch (err) {
    console.error('Failed to reject friend request:', err);
  }
}

// Remove friend
async function removeFriend(friendId) {
  try {
    await apiRemoveFriend(friendId);
    
    console.log('Friend removed successfully');
    
    // Refresh friends
    await loadFriends();
  } catch (err) {
    console.error('Failed to remove friend:', err);
  }
}

// Open chat with friend
function openChat(friendId) {
  router.push(`/chat/${friendId}`);
}

// Check if user is already a friend
function isFriend(userId) {
  return friends.value.some(friend => friend._id === userId);
}

// Check if there's a pending friend request
function hasPendingRequest(userId) {
  return friendRequests.value.sent.some(request => request.receiver._id === userId) ||
         friendRequests.value.received.some(request => request.sender._id === userId);
}
</script>