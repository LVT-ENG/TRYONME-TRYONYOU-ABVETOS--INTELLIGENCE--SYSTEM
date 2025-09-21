import React from 'react';
import { apiClient, authApi, handleApiError } from './api.js';

// Authentication state management
class AuthManager {
  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.refreshToken = localStorage.getItem('refresh_token');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    this.listeners = [];
    
    // Set token in API client if available
    if (this.token) {
      apiClient.setAuthToken(this.token);
    }
  }

  // Add state change listener
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove state change listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  // Notify all listeners of state change
  notifyListeners() {
    this.listeners.forEach(callback => callback({
      isAuthenticated: this.isAuthenticated(),
      user: this.user,
      token: this.token
    }));
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !this.isTokenExpired();
  }

  // Check if token is expired (basic check)
  isTokenExpired() {
    if (!this.token) return true;
    
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp < now;
    } catch (error) {
      console.error('Error parsing token:', error);
      return true;
    }
  }

  // Login with credentials
  async login(credentials) {
    try {
      const response = await authApi.login(credentials);
      
      if (response.token) {
        this.setAuthData(response.token, response.refresh_token, response.user);
        return { success: true, user: response.user };
      }
      
      throw new Error('No token received');
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: handleApiError(error) 
      };
    }
  }

  // Refresh authentication token
  async refreshAuthToken() {
    if (!this.refreshToken) {
      this.logout();
      return false;
    }

    try {
      const response = await authApi.refresh(this.refreshToken);
      
      if (response.token) {
        this.setAuthData(response.token, response.refresh_token || this.refreshToken, response.user || this.user);
        return true;
      }
      
      throw new Error('No token received');
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
      return false;
    }
  }

  // Set authentication data
  setAuthData(token, refreshToken, user) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.user = user;
    
    // Store in localStorage
    localStorage.setItem('auth_token', token);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    // Set token in API client
    apiClient.setAuthToken(token);
    
    // Notify listeners
    this.notifyListeners();
  }

  // Logout user
  async logout() {
    try {
      if (this.token) {
        await authApi.logout();
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.clearAuthData();
    }
  }

  // Clear authentication data
  clearAuthData() {
    this.token = null;
    this.refreshToken = null;
    this.user = null;
    
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    // Clear token from API client
    apiClient.clearAuthToken();
    
    // Notify listeners
    this.notifyListeners();
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Get current token
  getToken() {
    return this.token;
  }

  // Auto-refresh token before it expires
  async ensureValidToken() {
    if (!this.token) return false;
    
    if (this.isTokenExpired()) {
      return await this.refreshAuthToken();
    }
    
    // Check if token expires in the next 5 minutes
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      const now = Date.now() / 1000;
      const fiveMinutes = 5 * 60;
      
      if (payload.exp - now < fiveMinutes) {
        return await this.refreshAuthToken();
      }
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return await this.refreshAuthToken();
    }
    
    return true;
  }
}

// Global auth manager instance
export const authManager = new AuthManager();

// Error boundary for authentication errors
export const withAuthErrorHandling = (fn) => {
  return async (...args) => {
    try {
      // Ensure valid token before making request
      const tokenValid = await authManager.ensureValidToken();
      if (!tokenValid && authManager.isAuthenticated()) {
        throw new Error('Authentication failed. Please login again.');
      }
      
      return await fn(...args);
    } catch (error) {
      if (error.status === 401) {
        authManager.logout();
        throw new Error('Session expired. Please login again.');
      }
      throw error;
    }
  };
};

// React hook for authentication state
export const useAuth = () => {
  const [authState, setAuthState] = React.useState({
    isAuthenticated: authManager.isAuthenticated(),
    user: authManager.getCurrentUser(),
    token: authManager.getToken()
  });

  React.useEffect(() => {
    const handleAuthChange = (newState) => {
      setAuthState(newState);
    };

    authManager.addListener(handleAuthChange);
    
    return () => {
      authManager.removeListener(handleAuthChange);
    };
  }, []);

  return {
    ...authState,
    login: authManager.login.bind(authManager),
    logout: authManager.logout.bind(authManager),
    refreshToken: authManager.refreshAuthToken.bind(authManager)
  };
};