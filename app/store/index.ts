'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch,
} from 'react-redux';

import calendar from './calendar';
import modal from './modal';
import myBooks from './myBook';
import theme from './theme';
import bookRegister from './bookRegister';
import user from './user';
import searchBookRegister from './searchBookRegister';
import toast from './toast';

const rootReducer = combineReducers({
  calendar: calendar.reducer,
  modal: modal.reducer,
  myBook: myBooks.reducer,
  theme: theme.reducer,
  bookRegister: bookRegister.reducer,
  user: user.reducer,
  searchBookRegister: searchBookRegister.reducer,
  toast: toast.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
