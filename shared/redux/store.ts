import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch,
} from 'react-redux';
import {
  configureStore,
  combineReducers,
  createListenerMiddleware,
} from '@reduxjs/toolkit';

import bookSlice, { clearSelectedBook } from '@/entities/book/model/store';
import authSlice from '@/entities/auth/model/store';
import modalSlice, { closeModal } from '@/entities/modal/model/store';
import toastSlice from '@/shared/ui/toast/model/store';
import myBookHistorySlice from '@/entities/my-book-history/model/store';

const rootReducer = combineReducers({
  auth: authSlice,
  book: bookSlice,
  modal: modalSlice,
  toast: toastSlice,
  myBookHistory: myBookHistorySlice,
});

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: closeModal,
  effect: async (action, listenerApi) => {
    const stateBefore = listenerApi.getOriginalState() as RootState;

    if (stateBefore.modal.type === 'REGISTER_MY_BOOK') {
      listenerApi.dispatch(clearSelectedBook());
    }
  },
});

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
