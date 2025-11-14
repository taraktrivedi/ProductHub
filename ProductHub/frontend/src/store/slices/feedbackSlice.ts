import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api';

// Async thunks
export const fetchFeedback = createAsyncThunk(
  'feedback/fetchFeedback',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/feedback`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch feedback');
    }
  }
);

export const createFeedback = createAsyncThunk(
  'feedback/createFeedback',
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create feedback');
    }
  }
);

export const updateFeedback = createAsyncThunk(
  'feedback/updateFeedback',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/feedback/${id}`, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update feedback');
    }
  }
);

export const voteFeedback = createAsyncThunk(
  'feedback/voteFeedback',
  async ({ id, voteType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/feedback/${id}/vote`, { voteType });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to vote on feedback');
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  'feedback/deleteFeedback',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/feedback/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete feedback');
    }
  }
);

export const fetchFeedbackStats = createAsyncThunk(
  'feedback/fetchFeedbackStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/feedback/stats/summary`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch feedback stats');
    }
  }
);

const initialState = {
  items: [],
  stats: {
    totalFeedback: 0,
    totalVotes: 0,
    statusCounts: {},
    categoryCounts: {},
    priorityCounts: {},
    averageVotesPerFeedback: 0
  },
  filters: {
    category: 'All',
    status: 'All',
    priority: 'All',
    source: 'All',
    search: ''
  },
  sort: {
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },
  pagination: {
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  },
  loading: false,
  error: null,
  creating: false,
  updating: false,
  voting: false
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.sort = initialState.sort;
      state.pagination.page = 1;
    },
    updateFeedbackOptimistic: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch feedback
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          hasNext: action.payload.hasNext,
          hasPrev: action.payload.hasPrev,
          limit: state.pagination.limit
        };
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create feedback
      .addCase(createFeedback.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
        state.pagination.totalCount += 1;
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      
      // Update feedback
      .addCase(updateFeedback.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })
      
      // Vote feedback
      .addCase(voteFeedback.pending, (state) => {
        state.voting = true;
        state.error = null;
      })
      .addCase(voteFeedback.fulfilled, (state, action) => {
        state.voting = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(voteFeedback.rejected, (state, action) => {
        state.voting = false;
        state.error = action.payload;
      })
      
      // Delete feedback
      .addCase(deleteFeedback.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.pagination.totalCount -= 1;
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Fetch stats
      .addCase(fetchFeedbackStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  }
});

export const { 
  setFilters, 
  setSort, 
  setPagination, 
  clearError, 
  resetFilters, 
  updateFeedbackOptimistic 
} = feedbackSlice.actions;

export default feedbackSlice.reducer;