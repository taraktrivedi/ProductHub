import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  darkMode: true,
  searchOpen: false,
  notifications: [],
  selectedItem: null,
  viewMode: 'default',
  currentPage: 'dashboard'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload
      });
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleDarkMode,
  setDarkMode,
  setSearchOpen,
  addNotification,
  markNotificationAsRead,
  removeNotification,
  clearAllNotifications,
  setSelectedItem,
  setViewMode,
  setCurrentPage
} = uiSlice.actions;

export default uiSlice.reducer;