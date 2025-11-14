import React, { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification, markNotificationAsRead, removeNotification } from '../store/slices/uiSlice';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

interface NotificationContextType {
  showNotification: (notification: Omit<Notification, 'id'>) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const dispatch = useDispatch();

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const fullNotification = {
      ...notification,
      id,
      duration: notification.duration || 5000
    };

    dispatch(addNotification(fullNotification));

    // Auto-remove after duration
    if (fullNotification.duration > 0) {
      setTimeout(() => {
        dispatch(removeNotification(id));
      }, fullNotification.duration);
    }
  };

  const showSuccess = (message: string, title?: string) => {
    showNotification({
      title: title || 'Success',
      message,
      type: 'success'
    });
  };

  const showError = (message: string, title?: string) => {
    showNotification({
      title: title || 'Error',
      message,
      type: 'error',
      duration: 8000
    });
  };

  const showWarning = (message: string, title?: string) => {
    showNotification({
      title: title || 'Warning',
      message,
      type: 'warning',
      duration: 6000
    });
  };

  const showInfo = (message: string, title?: string) => {
    showNotification({
      title: title || 'Info',
      message,
      type: 'info'
    });
  };

  const removeNotificationHandler = (id: string) => {
    dispatch(removeNotification(id));
  };

  const markAsReadHandler = (id: string) => {
    dispatch(markNotificationAsRead(id));
  };

  const value: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification: removeNotificationHandler,
    markAsRead: markAsReadHandler
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};