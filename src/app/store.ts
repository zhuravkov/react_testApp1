import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from './../features/posts/postsSlice';


export const store = configureStore({
  reducer: {
    postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
// @ts-ignore
window.__store__ = store


export default store