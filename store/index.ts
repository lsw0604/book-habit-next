import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch,
} from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import toastSlice from './features/toast/toast-slice';
import userSlice from './features/user/user-slice';
import bookSlice from './features/book/book-slice';
import modalSlice from './features/modal/modal-slice';
import myBookCommentSlice from './features/my-book-comment/my-book-comment-slice';

const rootReducer = combineReducers({
  toast: toastSlice,
  user: userSlice,
  book: bookSlice,
  modal: modalSlice,
  myBookComment: myBookCommentSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
