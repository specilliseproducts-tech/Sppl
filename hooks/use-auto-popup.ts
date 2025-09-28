'use client';
import { useState, useEffect } from 'react';

interface UseAutoPopupOptions {
  delay?: number; // Delay in milliseconds before showing popup
  showOnce?: boolean; // Whether to show only once per session
  storageKey?: string; // Local storage key for tracking
}

export function useAutoPopup({
  delay = 30000, // 30 seconds default
  showOnce = true,
  storageKey = 'inquiry-popup-shown'
}: UseAutoPopupOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('useAutoPopup: Setting up timer with delay:', delay); // Debug log
    
    // Check localStorage if showOnce is enabled
    if (showOnce && typeof window !== 'undefined') {
      const wasShown = localStorage.getItem(storageKey);
      console.log('useAutoPopup: localStorage check - wasShown:', wasShown); // Debug log
      if (wasShown) return;
    }

    // Set timer to show popup
    const timer = setTimeout(() => {
      console.log('useAutoPopup: Timer fired - showing popup'); // Debug log
      setIsOpen(true);
      
      // Mark as shown in localStorage if showOnce is enabled
      if (showOnce && typeof window !== 'undefined') {
        localStorage.setItem(storageKey, 'true');
        console.log('useAutoPopup: Marked as shown in localStorage'); // Debug log
      }
    }, delay);

    // Cleanup timer on unmount
    return () => {
      console.log('useAutoPopup: Cleaning up timer'); // Debug log
      clearTimeout(timer);
    };
  }, [delay, showOnce, storageKey]);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return {
    isOpen,
    openPopup,
    closePopup,
  };
}
