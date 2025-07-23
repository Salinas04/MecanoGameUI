import { ref } from 'vue';
import { c as useRuntimeConfig, u as useAuth } from './server.mjs';

function useApi() {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  const { isAuthenticated, getAuthHeader } = useAuth();
  const loading = ref(false);
  const error = ref(null);
  async function getRandomPhrase() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/phrases`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch phrase";
      console.error("Error fetching phrase:", err);
      return { text: "The quick brown fox jumps over the lazy dog." };
    } finally {
      loading.value = false;
    }
  }
  async function saveScore(scoreData) {
    loading.value = true;
    error.value = null;
    try {
      const endpoint = isAuthenticated.value ? "/api/scores" : "/api/scores/anonymous";
      const headers = {
        "Content-Type": "application/json",
        ...getAuthHeader()
      };
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(scoreData)
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to save score";
      console.error("Error saving score:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function getTopScores() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/scores`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch top scores";
      console.error("Error fetching top scores:", err);
      return [];
    } finally {
      loading.value = false;
    }
  }
  async function getAllScoresWithUsers() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/scores/all-with-users`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch scores with user data";
      console.error("Error fetching scores with user data:", err);
      return [];
    } finally {
      loading.value = false;
    }
  }
  async function getUserScores() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/scores/user`, {
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch user scores";
      console.error("Error fetching user scores:", err);
      return [];
    } finally {
      loading.value = false;
    }
  }
  async function getUserStats() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/scores/stats`, {
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch user statistics";
      console.error("Error fetching user statistics:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function getUserProfile() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/users/profile`, {
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch user profile";
      console.error("Error fetching user profile:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function updateUserProfile(profileData) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify(profileData)
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to update user profile";
      console.error("Error updating user profile:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function updateProfilePicture(profilePictureUrl) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/users/profile-picture`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({ profilePicture: profilePictureUrl })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to update profile picture";
      console.error("Error updating profile picture:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function uploadProfilePicture(file) {
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const response = await fetch(`${baseUrl}/api/users/profile-picture/upload`, {
        method: "POST",
        headers: {
          ...getAuthHeader()
          // Don't set Content-Type header, it will be set automatically with boundary
        },
        body: formData
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to upload profile picture";
      console.error("Error uploading profile picture:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function changePassword(passwordData) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify(passwordData)
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to change password";
      console.error("Error changing password:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  function getProfilePictureUrl(user) {
    const DEFAULT_AVATAR = "/faviconTyping.png";
    if (typeof user === "string") {
      if (!user) return DEFAULT_AVATAR;
      return `${baseUrl}/api/users/profile-picture/${user}`;
    }
    if (!user || typeof user !== "object") return DEFAULT_AVATAR;
    if (user.profilePicture && user.profilePicture.fileId) {
      if (!user._id) return DEFAULT_AVATAR;
      return `${baseUrl}/api/users/profile-picture/${user._id}`;
    }
    if (typeof user.profilePicture === "string") {
      if (user.profilePicture.startsWith("http") || user.profilePicture.startsWith("data:")) {
        return user.profilePicture;
      }
    }
    return DEFAULT_AVATAR;
  }
  async function getFriendsList() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/friends`, {
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch friends list";
      console.error("Error fetching friends list:", err);
      return [];
    } finally {
      loading.value = false;
    }
  }
  async function getFriendRequests() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/friends/requests`, {
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch friend requests";
      console.error("Error fetching friend requests:", err);
      return { received: [], sent: [] };
    } finally {
      loading.value = false;
    }
  }
  async function sendFriendRequest(receiverId) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/friends/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({ receiverId })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to send friend request";
      console.error("Error sending friend request:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function respondToFriendRequest(requestId, accept) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/friends/requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({ accept })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to respond to friend request";
      console.error("Error responding to friend request:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function searchUsers(query) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/friends/search?query=${encodeURIComponent(query)}`, {
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to search users";
      console.error("Error searching users:", err);
      return [];
    } finally {
      loading.value = false;
    }
  }
  async function removeFriend(friendId) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/friends/${friendId}`, {
        method: "DELETE",
        headers: getAuthHeader()
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to remove friend";
      console.error("Error removing friend:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function getChatMessages(userId) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/chat/messages/${userId}`, {
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch chat messages";
      console.error("Error fetching chat messages:", err);
      return [];
    } finally {
      loading.value = false;
    }
  }
  async function getConversations() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/chat/conversations`, {
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch conversations";
      console.error("Error fetching conversations:", err);
      return [];
    } finally {
      loading.value = false;
    }
  }
  async function sendMessage(receiverId, content) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/chat/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({ receiverId, content })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to send message";
      console.error("Error sending message:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  async function getNotifications() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/chat/notifications`, {
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to fetch notifications";
      console.error("Error fetching notifications:", err);
      return [];
    } finally {
      loading.value = false;
    }
  }
  async function markNotificationsAsRead() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/api/chat/notifications/read`, {
        method: "PUT",
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      error.value = err.message || "Failed to mark notifications as read";
      console.error("Error marking notifications as read:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    error,
    // Game and score functions
    getRandomPhrase,
    saveScore,
    getTopScores,
    getAllScoresWithUsers,
    getUserScores,
    getUserStats,
    // User profile functions
    getUserProfile,
    updateUserProfile,
    updateProfilePicture,
    uploadProfilePicture,
    changePassword,
    getProfilePictureUrl,
    // Friend functions
    getFriendsList,
    getFriendRequests,
    sendFriendRequest,
    respondToFriendRequest,
    searchUsers,
    removeFriend,
    // Chat functions
    getChatMessages,
    getConversations,
    sendMessage,
    // Notification functions
    getNotifications,
    markNotificationsAsRead
  };
}

export { useApi as u };
//# sourceMappingURL=useApi-90H3qg-m.mjs.map
