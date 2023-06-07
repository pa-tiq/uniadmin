import { configureStore } from '@reduxjs/toolkit';
import menuOpenReducer from './menuOpenSlice';
import selectedNodeReducer from './selectedNodeSlice';

export default configureStore({
  reducer: {
    menu: menuOpenReducer,
    selectedNodeReducer: selectedNodeReducer
  },
});
