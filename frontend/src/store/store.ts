import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import feedbackSlice from './slices/feedbackSlice';
import featuresSlice from './slices/featuresSlice';
import roadmapSlice from './slices/roadmapSlice';
import analyticsSlice from './slices/analyticsSlice';
import integrationsSlice from './slices/integrationsSlice';
import mindMapSlice from './slices/mindMapSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    feedback: feedbackSlice,
    features: featuresSlice,
    roadmap: roadmapSlice,
    analytics: analyticsSlice,
    integrations: integrationsSlice,
    mindMap: mindMapSlice,
    ui: uiSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;