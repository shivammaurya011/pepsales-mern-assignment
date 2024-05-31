import { createSlice } from '@reduxjs/toolkit';

const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    start: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload];
    },
    failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { start, success, failure } = coinSlice.actions;

export default coinSlice.reducer;
