import { createSlice } from '@reduxjs/toolkit';

const mindMapSlice = createSlice({
  name: 'mindMap',
  initialState: {
    mindMaps: [],
    currentMindMap: null,
    loading: false,
    error: null
  },
  reducers: {
    setMindMaps: (state, action) => {
      state.mindMaps = action.payload;
    },
    setCurrentMindMap: (state, action) => {
      state.currentMindMap = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setMindMaps, setCurrentMindMap, setLoading, setError } = mindMapSlice.actions;
export default mindMapSlice.reducer;