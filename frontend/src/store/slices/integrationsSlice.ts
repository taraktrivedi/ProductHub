import { createSlice } from '@reduxjs/toolkit';

const integrationsSlice = createSlice({
  name: 'integrations',
  initialState: {
    integrations: [],
    loading: false,
    error: null
  },
  reducers: {
    setIntegrations: (state, action) => {
      state.integrations = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setIntegrations, setLoading, setError } = integrationsSlice.actions;
export default integrationsSlice.reducer;