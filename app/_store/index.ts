import { combineReducers, configureStore } from '@reduxjs/toolkit';

import modalSlice from '@/entities/modal/model/modal.slice';

const rootReducer = combineReducers({
  modal: modalSlice,
});

// 1. Store 생성 팩토리 함수 정의 (SSR 요청 간 독립된 스토어 보장)

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production' && {
      name: 'BookHabit Store',
      trace: true,
      traceLimit: 25,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
