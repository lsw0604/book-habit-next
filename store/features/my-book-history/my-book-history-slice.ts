import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: ReduxMyBookHistoryType = {};

const myBookHistorySlice = createSlice({
  name: 'my-book-history',
  initialState,
  reducers: {
    setSelectedMyBookHistory: (
      state: WritableDraft<ReduxMyBookHistoryType>,
      action: PayloadAction<MyBookHistoryItemType>
    ) => {
      state.selectedHistory = action.payload;
    },
    setCreateMyBookHistory: (
      state: WritableDraft<ReduxMyBookHistoryType>,
      action: PayloadAction<ReduxCreateHistoryType>
    ) => {
      state.createHistory = action.payload;
    },
    clearMyBookHistory: (state: WritableDraft<ReduxMyBookHistoryType>) => {
      state.selectedHistory = undefined;
      state.createHistory = undefined;
    },
  },
});

export const {
  setSelectedMyBookHistory,
  setCreateMyBookHistory,
  clearMyBookHistory,
} = myBookHistorySlice.actions;

export default myBookHistorySlice.reducer;
