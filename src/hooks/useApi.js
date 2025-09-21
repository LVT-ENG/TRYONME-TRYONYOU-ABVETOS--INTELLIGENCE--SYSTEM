import { useState, useEffect } from 'react';
import { gasApi, contactApi, handleApiError } from '../utils/api.js';
import { withAuthErrorHandling } from '../utils/auth.js';

// Hook for fetching recommendations with timeout and error handling
export function useRecommendations(userId) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchRecommendations = withAuthErrorHandling(async () => {
    if (!userId) {
      setRecommendations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await gasApi.getRecommendations(userId);
      
      if (response.success) {
        setRecommendations(response.data || []);
      } else {
        throw new Error(response.error || 'Failed to fetch recommendations');
      }
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
      setError(handleApiError(err));
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchRecommendations();
  }, [userId, retryCount]);

  const retry = () => {
    setRetryCount(prev => prev + 1);
  };

  return {
    recommendations,
    loading,
    error,
    retry,
    refetch: fetchRecommendations
  };
}

// Hook for contact form submission with timeout and error handling
export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await contactApi.sendMessage(formData);
      
      if (response.ok) {
        setSuccess(true);
        return { success: true };
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error('Form submission failed:', err);
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setIsSubmitting(false);
  };

  return {
    submitForm,
    isSubmitting,
    error,
    success,
    reset
  };
}

// Hook for user management with timeout and error handling
export function useUserManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUser = withAuthErrorHandling(async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await gasApi.addUser(userData);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        throw new Error(response.error || 'Failed to add user');
      }
    } catch (err) {
      console.error('Failed to add user:', err);
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  });

  const updateUser = withAuthErrorHandling(async (userId, userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await gasApi.updateUser(userId, userData);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        throw new Error(response.error || 'Failed to update user');
      }
    } catch (err) {
      console.error('Failed to update user:', err);
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  });

  const clearError = () => setError(null);

  return {
    addUser,
    updateUser,
    loading,
    error,
    clearError
  };
}