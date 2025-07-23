import { ref, reactive, computed } from 'vue';
import { useRouter, useRuntimeConfig } from 'nuxt/app';

export function useAuth() {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;
  const router = useRouter();

  // Auth state
  const token = ref(null);
  const user = ref(null);
  const loading = ref(false);
  const error = reactive({
    login: null,
    register: null,
    user: null
  });

  // Computed properties
  const isAuthenticated = computed(() => !!token.value);

  // Initialize auth state from localStorage
  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        token.value = storedToken;
        fetchUser();
      }
    }
  };

  // Register a new user
  const register = async (userData) => {
    loading.value = true;
    error.register = null;

    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Set token and store in localStorage
      token.value = data.token;
      if (process.client) {
        localStorage.setItem('token', data.token);
      }

      // Fetch user data
      await fetchUser();

      return true;
    } catch (err) {
      error.register = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Login user
  const login = async (credentials) => {
    loading.value = true;
    error.login = null;

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Set token and store in localStorage
      token.value = data.token;
      if (process.client) {
        localStorage.setItem('token', data.token);
      }

      // Fetch user data
      await fetchUser();
      
      // Refresh the page after successful login
      if (process.client) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }

      return true;
    } catch (err) {
      error.login = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Fetch user data
  const fetchUser = async () => {
    if (!token.value) return;

    loading.value = true;
    error.user = null;

    try {
      const response = await fetch(`${baseUrl}/api/auth/me`, {
        headers: {
          'x-auth-token': token.value
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user');
      }

      user.value = data;
    } catch (err) {
      error.user = err.message;
      logout();
    } finally {
      loading.value = false;
    }
  };

  // Logout user
  const logout = async () => {
    if (token.value) {
      try {
        // Call the backend logout endpoint to invalidate the token
        await fetch(`${baseUrl}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'x-auth-token': token.value
          }
        });
      } catch (err) {
        console.error('Error during logout:', err);
      }
    }

    // Clear token and user data
    token.value = null;
    user.value = null;
    if (process.client) {
      localStorage.removeItem('token');
      
      // Reset game state when logging out
      // Clear best score from localStorage
      localStorage.removeItem('bestScore');
    }
    
    // Redirect to login page and refresh the page
    router.push('/login');
    
    // Refresh the page after a short delay to ensure the router navigation completes
    if (process.client) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  // Get auth header
  const getAuthHeader = () => {
    return token.value ? { 'x-auth-token': token.value } : {};
  };

  // Initialize auth on client-side
  if (process.client) {
    initAuth();
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    fetchUser,
    getAuthHeader
  };
}
