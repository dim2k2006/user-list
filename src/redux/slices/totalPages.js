import { createSlice } from '@reduxjs/toolkit';

const totalPages = createSlice({
  name: 'totalPages',
  initialState: 0,
  reducers: {
    setTotalPages(state, action) {
      return action.payload.totalPages;
    },
  },
});

const actions = { ...totalPages.actions };

export { actions };

export const getTotalPages = (state) => state.totalPages;

export default totalPages.reducer;
