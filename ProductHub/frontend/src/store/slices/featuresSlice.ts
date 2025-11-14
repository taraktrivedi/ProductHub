import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api';

// Async thunks
export const fetchFeatures = createAsyncThunk(
  'features/fetchFeatures',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/features`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch features');
    }
  }
);

export const createFeature = createAsyncThunk(
  'features/createFeature',
  async (featureData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/features`, featureData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create feature');
    }
  }
);

export const updateFeature = createAsyncThunk(
  'features/updateFeature',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/features/${id}`, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update feature');
    }
  }
);

const initialState = {
  items: [],
  selectedFeature: null,
  filters: {
    category: 'All',
    status: 'All',
    priority: 'All',
    assignee: 'All',
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
    totalPages: 0
  },
  loading: false,
  error: null,
  creating: false,
  updating: false,
  viewMode: 'table' as 'table' | 'grid'
};

const featuresSlice = createSlice({
  name: 'features',
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
    setSelectedFeature: (state, action) => {
      state.selectedFeature = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.sort = initialState.sort;
      state.pagination.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch features
      .addCase(fetchFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          limit: state.pagination.limit
        };
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create feature
      .addCase(createFeature.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createFeature.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(createFeature.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      
      // Update feature
      .addCase(updateFeature.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateFeature.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateFeature.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  }
});

export const { 
  setFilters, 
  setSort, 
  setPagination, 
  setSelectedFeature,
  setViewMode,
  clearError, 
  resetFilters 
} = featuresSlice.actions;

export default featuresSlice.reducer;