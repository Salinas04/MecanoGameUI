<template>
  <div class="max-w-3xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your Profile</h1>
      <p class="text-gray-600 dark:text-gray-300">Manage your account settings</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Loading your profile...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- Profile Content -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Profile Picture Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:col-span-1">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Profile Picture</h2>

        <div class="flex flex-col items-center">
          <div class="h-32 w-32 rounded-full overflow-hidden border-2 border-primary-500 mb-4 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <img 
              v-if="profilePictureUrl !== '/default-avatar.png' && !imageError"
              :src="profilePictureUrl" 
              alt="Profile" 
              class="h-full w-full object-cover"
              @error="handleImageError"
            />
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-12 w-12 text-gray-500 dark:text-gray-400">
              <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
            </svg>
          </div>

          <div class="w-full">
            <!-- Picture Update Error -->
            <div v-if="pictureUpdateError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {{ pictureUpdateError }}
            </div>

            <!-- Success Message -->
            <div v-if="pictureUpdateSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Profile picture updated successfully!
            </div>

            <!-- File Upload Section -->
            <div class="mb-4">
              <label for="profilePictureFile" class="block text-gray-700 dark:text-gray-300 mb-2">Upload Image</label>
              <div class="relative">
                <input
                  type="file"
                  id="profilePictureFile"
                  ref="fileInput"
                  @change="handleFileChange"
                  accept="image/*"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center">
                  <span v-if="selectedFile" class="truncate">{{ selectedFile.name }}</span>
                  <span v-else class="text-gray-500 dark:text-gray-400">Choose a file...</span>
                  <button type="button" class="ml-auto bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-lg text-sm">
                    Browse
                  </button>
                </div>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Supported formats: JPG, PNG, GIF</p>
            </div>

            <button 
              @click="updatePicture"
              class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
              :disabled="!selectedFile"
            >
              Update Picture
            </button>
          </div>
        </div>
      </div>

      <!-- Profile Information Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:col-span-2">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Profile Information</h2>

        <form @submit.prevent="updateProfile">
          <!-- Success Message -->
          <div v-if="profileUpdateSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Profile updated successfully!
          </div>

          <!-- Error Message -->
          <div v-if="profileUpdateError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ profileUpdateError }}
          </div>

          <!-- Username Field -->
          <div class="mb-4">
            <label for="username" class="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Your username"
              required
              minlength="3"
              maxlength="30"
            />
          </div>

          <!-- Email Field -->
          <div class="mb-6">
            <label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Your email"
              required
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors mb-4"
            :disabled="!isProfileChanged"
          >
            Save Changes
          </button>
        </form>
      </div>

      <!-- Change Password Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:col-span-3">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Change Password</h2>

        <form @submit.prevent="changeUserPassword">
          <!-- Success Message -->
          <div v-if="passwordChangeSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Password changed successfully!
          </div>

          <!-- Error Message -->
          <div v-if="passwordChangeError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ passwordChangeError }}
          </div>

          <!-- Current Password Field -->
          <div class="mb-4">
            <label for="currentPassword" class="block text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
            <input
              v-model="currentPassword"
              type="password"
              id="currentPassword"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your current password"
              required
            />
          </div>

          <!-- New Password Field -->
          <div class="mb-4">
            <label for="newPassword" class="block text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <input
              v-model="newPassword"
              type="password"
              id="newPassword"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your new password"
              required
              minlength="6"
            />
          </div>

          <!-- Confirm New Password Field -->
          <div class="mb-6">
            <label for="confirmPassword" class="block text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Confirm your new password"
              required
            />
            <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">Passwords do not match</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
            :disabled="!isPasswordValid"
          >
            Change Password
          </button>
        </form>
      </div>


      <!-- Back to Dashboard Button and Logout Button -->
      <div class="md:col-span-3 text-center mt-4 flex justify-center space-x-4">
        <NuxtLink 
          to="/dashboard" 
          class="inline-block bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-6 rounded-xl transition-colors"
        >
          Back to Dashboard
        </NuxtLink>
        <button 
          @click="handleLogout" 
          class="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-xl transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useApi } from '~/composables/useApi';
import { useRouter } from 'nuxt/app';

// Define page metadata for SEO
definePageMeta({
  title: 'Profile - TypingRush',
  description: 'Manage your TypingRush profile and account settings'
});

const router = useRouter();
const { user, isAuthenticated, fetchUser, logout } = useAuth();
const { loading, error: apiError, getUserProfile, updateUserProfile, updateProfilePicture, uploadProfilePicture, changePassword, getProfilePictureUrl } = useApi();

// Specific error states
const error = ref(null);
const profileUpdateError = ref(null);
const pictureUpdateError = ref(null);
const passwordChangeError = ref(null);

// Form data
const username = ref('');
const email = ref('');
const profilePicture = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const selectedFile = ref(null);
const fileInput = ref(null);

// Success states
const profileUpdateSuccess = ref(false);
const pictureUpdateSuccess = ref(false);
const passwordChangeSuccess = ref(false);

// Image error state
const imageError = ref(false);


// Handle image loading errors
function handleImageError() {
  imageError.value = true;
}

// Handle file selection
function handleFileChange(event) {
  const files = event.target.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
  } else {
    selectedFile.value = null;
  }
}

// Computed properties
const isProfileChanged = computed(() => {
  return username.value !== user.value?.username || email.value !== user.value?.email;
});

const passwordMismatch = computed(() => {
  return newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword.value;
});

const isPasswordValid = computed(() => {
  return currentPassword.value && 
         newPassword.value && 
         confirmPassword.value && 
         newPassword.value === confirmPassword.value &&
         newPassword.value.length >= 6;
});

// Compute the profile picture URL
const profilePictureUrl = computed(() => {
  // If no profile picture, return default
  if (!profilePicture.value) return '/default-avatar.png';

  // If profilePicture is an object with data property that's a base64 string, use it directly
  if (typeof profilePicture.value === 'object' && 
      profilePicture.value.data && 
      typeof profilePicture.value.data === 'string' && 
      profilePicture.value.data.startsWith('data:')) {
    return profilePicture.value.data;
  }

  // If profilePicture has fileId, use the getProfilePictureUrl function
  if (typeof profilePicture.value === 'object' && profilePicture.value.fileId) {
    // Create a temporary user object with the necessary properties
    const tempUser = {
      _id: user.value?._id,
      profilePicture: {
        fileId: profilePicture.value.fileId
      }
    };
    return getProfilePictureUrl(tempUser);
  }

  // If user has an ID, use the getProfilePictureUrl function with the user ID
  if (user.value?._id) {
    return getProfilePictureUrl(user.value._id);
  }

  // If profilePicture is a string, use it directly
  if (typeof profilePicture.value === 'string') {
    return profilePicture.value;
  }

  return '/default-avatar.png';
});

// Load user profile
async function loadUserProfile() {
  error.value = null;
  try {
    const profile = await getUserProfile();
    if (profile) {
      username.value = profile.username;
      email.value = profile.email;
      // Store the profilePicture, which could be a string or an object with a path property
      profilePicture.value = profile.profilePicture;
    }
  } catch (err) {
    console.error('Error loading user profile:', err);
    error.value = apiError.value || 'Failed to load profile. Please try again.';
  }
}

// Update profile
async function updateProfile() {
  profileUpdateSuccess.value = false;
  profileUpdateError.value = null;

  try {
    const updatedProfile = await updateUserProfile({
      username: username.value,
      email: email.value
    });

    if (updatedProfile) {
      // Update local user state
      await fetchUser();
      profileUpdateSuccess.value = true;

      // Hide success message after 3 seconds
      setTimeout(() => {
        profileUpdateSuccess.value = false;
      }, 3000);
    }
  } catch (err) {
    console.error('Error updating profile:', err);
    profileUpdateError.value = apiError.value || 'Failed to update profile. Please try again.';
  }
}

// Update profile picture
async function updatePicture() {
  pictureUpdateError.value = null;
  pictureUpdateSuccess.value = false;

  try {
    if (!selectedFile.value) {
      pictureUpdateError.value = 'Please select an image file.';
      return;
    }

    // Upload file
    const updatedProfile = await uploadProfilePicture(selectedFile.value);

    if (updatedProfile) {
      // Update local state
      profilePicture.value = updatedProfile.profilePicture;
      // Ensure user object is updated with the correct profilePicture
      await fetchUser();

      // Show success message
      pictureUpdateSuccess.value = true;

      // Reset form
      selectedFile.value = null;
      if (fileInput.value) {
        fileInput.value.value = ''; // Clear file input
      }

      // Hide success message after 3 seconds
      setTimeout(() => {
        pictureUpdateSuccess.value = false;
      }, 3000);
    }
  } catch (err) {
    console.error('Error updating profile picture:', err);
    pictureUpdateError.value = apiError.value || 'Failed to update profile picture. Please try again.';
  }
}

// Change password
async function changeUserPassword() {
  if (passwordMismatch.value) {
    return;
  }

  passwordChangeSuccess.value = false;
  passwordChangeError.value = null;

  try {
    const result = await changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    });

    if (result) {
      // Clear password fields
      currentPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';

      // Show success message
      passwordChangeSuccess.value = true;

      // Hide success message after 3 seconds
      setTimeout(() => {
        passwordChangeSuccess.value = false;
      }, 3000);
    }
  } catch (err) {
    console.error('Error changing password:', err);
    passwordChangeError.value = apiError.value || 'Failed to change password. Please check your current password and try again.';
  }
}

// Handle logout
async function handleLogout() {
  await logout();
  // The logout function already redirects to the login page
}

// Redirect if not authenticated
onMounted(() => {
  if (process.client && !isAuthenticated.value) {
    router.push('/login');
  } else {
    loadUserProfile();
  }
});
</script>
