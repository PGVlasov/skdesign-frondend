import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadBigBata: false,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadBigBata(state) {
      state.loadBigBata = true
    },
    loadSmallBata(state) {
      state.loadBigBata = false
    },
  }
});

export default dataSlice.reducer;
