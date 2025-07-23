import { ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';
import { useRuntimeConfig } from 'nuxt/app';
import { useAuth } from './useAuth';

export function useSocket() {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  const { token, user } = useAuth();
  
  const socket = ref(null);
  const isConnected = ref(false);
  const isAuthenticated = ref(false);
  const error = ref(null);
  
  // Friends-related state
  const onlineFriends = ref(new Map());
  const friendRequests = ref([]);
  
  // Chat-related state
  const messages = ref(new Map()); // Map of userId -> messages array
  const currentChat = ref(null);
  
  // Notifications-related state
  const notifications = ref([]);
  const unreadNotificationsCount = ref(0);
  
  // Initialize socket connection
  const initSocket = () => {
    if (socket.value) return;
    
    socket.value = io(baseUrl, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    
    // Socket connection events
    socket.value.on('connect', () => {
      isConnected.value = true;
      error.value = null;
      
      // Authenticate with token
      if (token.value) {
        socket.value.emit('authenticate', token.value);
      }
    });
    
    socket.value.on('disconnect', () => {
      isConnected.value = false;
      isAuthenticated.value = false;
    });
    
    socket.value.on('connect_error', (err) => {
      error.value = 'Failed to connect to server';
    });
    
    // Authentication events
    socket.value.on('authenticated', (data) => {
      isAuthenticated.value = true;
    });
    
    socket.value.on('authentication_error', (err) => {
      error.value = 'Authentication failed';
      isAuthenticated.value = false;
    });
    
    // Friend status events
    socket.value.on('friend_status_changed', (data) => {
      const { userId, status } = data;
      onlineFriends.value.set(userId, status);
    });
    
    // Friend request events
    socket.value.on('friend_request', (data) => {
      friendRequests.value.push(data.request);
      
      // Log notification
      console.log(`Friend request received from ${data.sender.username}`);
    });
    
    socket.value.on('friend_request_accepted', (data) => {
      // Log notification
      console.log(`${data.friend.username} accepted your friend request`);
    });
    
    // Chat message events
    socket.value.on('private_message', (data) => {
      
      const { message, sender } = data;
      const senderId = sender._id;
      
      // Initialize messages array for this sender if it doesn't exist
      if (!messages.value.has(senderId)) {
        messages.value.set(senderId, []);
      }
      
      // Add message to array
      messages.value.get(senderId).push(message);
      
      // If this is the current chat, mark as read
      if (currentChat.value === senderId) {
        markMessagesAsRead(senderId);
      } else {
        // Log notification
        console.log(`New message from ${sender.username}`);
      }
    });
    
    socket.value.on('message_sent', (message) => {
      
      const receiverId = message.receiver;
      
      // Initialize messages array for this receiver if it doesn't exist
      if (!messages.value.has(receiverId)) {
        messages.value.set(receiverId, []);
      }
      
      // Add message to array
      messages.value.get(receiverId).push(message);
    });
    
    // Notification events
    socket.value.on('notification', (notification) => {
      
      // Add to notifications array
      notifications.value.unshift(notification);
      
      // Increment unread count
      unreadNotificationsCount.value++;
    });
    
    // Error events
    socket.value.on('error', (err) => {
      error.value = err;
      console.error('Socket error:', err);
    });
    
    // Connect to socket
    socket.value.connect();
  };
  
  // Disconnect socket
  const disconnectSocket = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
      isConnected.value = false;
      isAuthenticated.value = false;
    }
  };
  
  // Send a private message
  const sendPrivateMessage = (receiverId, content) => {
    if (!isAuthenticated.value) {
      error.value = 'Not authenticated';
      return false;
    }
    
    socket.value.emit('private_message', { receiverId, content });
    return true;
  };
  
  // Send a friend request
  const sendFriendRequest = (receiverId) => {
    if (!isAuthenticated.value) {
      error.value = 'Not authenticated';
      return false;
    }
    
    socket.value.emit('friend_request', { receiverId });
    return true;
  };
  
  // Respond to a friend request
  const respondToFriendRequest = (requestId, accept) => {
    if (!isAuthenticated.value) {
      error.value = 'Not authenticated';
      return false;
    }
    
    socket.value.emit('friend_request_response', { requestId, accept });
    return true;
  };
  
  // Mark messages as read
  const markMessagesAsRead = (senderId) => {
    // This is handled by the API when fetching messages
    // But we can update the local state
    if (messages.value.has(senderId)) {
      const userMessages = messages.value.get(senderId);
      userMessages.forEach(msg => {
        if (msg.sender === senderId && !msg.read) {
          msg.read = true;
        }
      });
    }
  };
  
  // Mark notifications as read
  const markNotificationsAsRead = () => {
    if (!isAuthenticated.value) {
      error.value = 'Not authenticated';
      return false;
    }
    
    socket.value.emit('mark_notifications_read');
    unreadNotificationsCount.value = 0;
    notifications.value.forEach(notification => {
      notification.read = true;
    });
    
    return true;
  };
  
  // Set current chat
  const setCurrentChat = (userId) => {
    currentChat.value = userId;
    
    // Initialize messages array for this user if it doesn't exist
    if (!messages.value.has(userId)) {
      messages.value.set(userId, []);
    }
    
    // Mark messages as read
    markMessagesAsRead(userId);
  };
  
  // Lifecycle hooks
  onMounted(() => {
    if (process.client) {
      initSocket();
    }
  });
  
  onUnmounted(() => {
    if (process.client) {
      disconnectSocket();
    }
  });
  
  return {
    socket,
    isConnected,
    isAuthenticated,
    error,
    onlineFriends,
    friendRequests,
    messages,
    currentChat,
    notifications,
    unreadNotificationsCount,
    initSocket,
    disconnectSocket,
    sendPrivateMessage,
    sendFriendRequest,
    respondToFriendRequest,
    markMessagesAsRead,
    markNotificationsAsRead,
    setCurrentChat
  };
}