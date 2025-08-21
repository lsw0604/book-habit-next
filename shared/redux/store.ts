import {
  configureStore,
  combineReducers,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch,
} from 'react-redux';

import authSlice from '@/entities/auth/store/auth.slice';
import modalSlice from '@/entities/modal/store/modal.slice';

const rootReducer = combineReducers({
  auth: authSlice,
  modal: modalSlice,
});

const listenerMiddleware = createListenerMiddleware();

// listenerMiddleware.startListening({
//   actionCreator: closeModal,
//   effect: async (action, listenerApi) => {
//     const stateBefore = listenerApi.getOriginalState() as RootState;

//     if (stateBefore.modal.type === 'REGISTER_MY_BOOK') {
//       listenerApi.dispatch(clearSelectedBook());
//     }

//     if (stateBefore.modal.type === 'SELECTED_MY_BOOK_HISTORY') {
//       listenerApi.dispatch(clearSelectedHistory());
//     }
//   },
// });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: true,
});
