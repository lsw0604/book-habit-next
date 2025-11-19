import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authSlice from '@/entities/auth/store/auth.slice';
import modalSlice from '@/entities/modal/store/modal.slice';

const rootReducer = combineReducers({
  auth: authSlice,
  modal: modalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production' && {
    name: 'MyApp Store', // 고유한 이름 지정
    trace: true,
    traceLimit: 25,
  },
});
