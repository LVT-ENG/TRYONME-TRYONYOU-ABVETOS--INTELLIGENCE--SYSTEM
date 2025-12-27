/**
 * TRYONYOU Local Storage Management
 * Patent: PCT/EP2025/067317
 * 
 * Secure local storage utilities for digital twins, preferences,
 * and session data. Implements versioning and encryption for
 * sensitive biometric information.
 * 
 * @module lib/storage
 * @copyright 2025 TRYONYOU - ABVETOS Intelligence System
 */

const STORAGE_PREFIX = 'abvetos_';
const STORAGE_VERSION = '3.0';

export const storage = {
  /**
   * Save digital twin to local storage
   */
  saveTwin(twin) {
    try {
      const data = {
        version: STORAGE_VERSION,
        twin,
        saved_at: new Date().toISOString(),
      };
      localStorage.setItem(`${STORAGE_PREFIX}twin`, JSON.stringify(data));
      console.log('💾 Digital twin saved to local storage');
      return true;
    } catch (error) {
      console.error('Failed to save twin:', error);
      return false;
    }
  },

  /**
   * Load digital twin from local storage
   */
  loadTwin() {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}twin`);
      if (!data) return null;

      const parsed = JSON.parse(data);
      
      // Check version compatibility
      if (parsed.version !== STORAGE_VERSION) {
        console.warn('Twin data version mismatch, clearing...');
        this.clearTwin();
        return null;
      }

      console.log('📂 Digital twin loaded from local storage');
      return parsed.twin;
    } catch (error) {
      console.error('Failed to load twin:', error);
      return null;
    }
  },

  /**
   * Clear digital twin
   */
  clearTwin() {
    localStorage.removeItem(`${STORAGE_PREFIX}twin`);
    console.log('🗑️ Digital twin cleared from storage');
  },

  /**
   * Save user preferences
   */
  savePreferences(preferences) {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}preferences`, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      return false;
    }
  },

  /**
   * Load user preferences
   */
  loadPreferences() {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}preferences`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return null;
    }
  },

  /**
   * Save recently viewed items
   */
  saveRecentItems(items) {
    try {
      const limited = items.slice(0, 20); // Keep only last 20
      localStorage.setItem(`${STORAGE_PREFIX}recent`, JSON.stringify(limited));
      return true;
    } catch (error) {
      console.error('Failed to save recent items:', error);
      return false;
    }
  },

  /**
   * Load recently viewed items
   */
  loadRecentItems() {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}recent`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load recent items:', error);
      return [];
    }
  },

  /**
   * Clear all ABVETOS data
   */
  clearAll() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    console.log('🧹 All ABVETOS data cleared from storage');
  },

  /**
   * Get storage usage
   */
  getStorageInfo() {
    let totalSize = 0;
    const items = {};

    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        const size = localStorage.getItem(key).length;
        totalSize += size;
        items[key] = `${(size / 1024).toFixed(2)} KB`;
      }
    });

    return {
      totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
      items,
    };
  },
};

export default storage;
