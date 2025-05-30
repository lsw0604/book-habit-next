import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch,
} from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import bookSlice from '@/entities/book/model/store';
import authSlice from '@/entities/auth/model/store';
import modalSlice from '@/entities/modal/model/store';
import toastSlice from '@/shared/ui/toast/model/store';

const rootReducer = combineReducers({
  auth: authSlice,
  book: bookSlice,
  modal: modalSlice,
  toast: toastSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
