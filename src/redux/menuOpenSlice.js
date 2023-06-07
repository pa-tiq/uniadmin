import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'menuOpen',
  initialState: {
    menuOpen: true,
  },
  reducers: {
    toggleMenu(state, { payload }) {
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };
    },
  },
});

export const { toggleMenu } = slice.actions;

export const selectMenuState = state => { state.menuOpen };

export default slice.reducer;
