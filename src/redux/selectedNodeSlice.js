import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'selectedNode',
  initialState: {
    selectedNode: null,
  },
  reducers: {
    setSelectedNode(state, { payload }) {
      return {
        selectedNode: payload,
      };
    },
  },
});

export const { setSelectedNode } = slice.actions;

export const selectSelectedNode = (state) => state.selectedNodeReducer.selectedNode;

export default slice.reducer;
