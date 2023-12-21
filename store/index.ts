import { HYDRATE, createWrapper, MakeStore, Context } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import calendar from './calendar';

/** reducer들을 모듈별로 관리하여 combineReducers를 사용하여 하나로 모으게 함 */
const rootReducer = combineReducers({
  calendar: calendar.reducer,
});

/** action type 준비 */
/**
 * * RootState 타입
 */
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof initStore>;
export type AppState = ReturnType<AppStore['getState']>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = (ctx: Context) => {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
