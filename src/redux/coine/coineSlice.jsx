import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const counterSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { start, success, failure } = counterSlice.actions;

export default counterSlice.reducer;
