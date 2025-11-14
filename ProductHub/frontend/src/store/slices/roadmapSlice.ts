import { createSlice } from '@reduxjs/toolkit';

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState: {
    roadmaps: [],
    currentRoadmap: null,
    loading: false,
    error: null
  },
  reducers: {
    setRoadmaps: (state, action) => {
      state.roadmaps = action.payload;
    },
    setCurrentRoadmap: (state, action) => {
      state.currentRoadmap = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setRoadmaps, setCurrentRoadmap, setLoading, setError } = roadmapSlice.actions;
export default roadmapSlice.reducer;