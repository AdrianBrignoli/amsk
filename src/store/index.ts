import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './slices/calendarSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 