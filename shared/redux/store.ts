import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch,
} from 'react-redux';

import authSlice from '@/entities/auth/store/auth.slice';
import modalSlice from '@/entities/modal/store/modal.slice';
import toastSlice from '@/entities/toast/model/toast.slice';

const rootReducer = combineReducers({
  auth: authSlice,
  modal: modalSlice,
  toast: toastSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production' && {
    name: 'MyApp Store', // 고유한 이름 지정
    trace: true,
    traceLimit: 25,
  },
});
