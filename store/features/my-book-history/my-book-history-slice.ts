import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: ReduxMyBookHistoryType = {};

const myBookHistorySlice = createSlice({
  name: 'my-book-history',
  initialState,
  reducers: {
    setMyBookHistoryState: (
      state: WritableDraft<ReduxMyBookHistoryType>,
      action: PayloadAction<ReduxMyBookHistoryType>
    ) => {
      return { ...state, ...action.payload };
    },
    setSelectedDate: (
      state: WritableDraft<ReduxMyBookHistoryType>,
      action: PayloadAction<string | undefined>
    ) => {
      state.selectedDate = action.payload;
    },
    setSelectedMyBookHistory: (
      state: WritableDraft<ReduxMyBookHistoryType>,
      action: PayloadAction<MyBookHistoryItemType[] | undefined>
    ) => {
      state.selectedHistory = action.payload;
    },
    clearMyBookHistory: (state: WritableDraft<ReduxMyBookHistoryType>) => {
      state.selectedHistory = undefined;
      state.selectedDate = undefined;
    },
  },
});

export const {
  setSelectedDate,
  setSelectedMyBookHistory,
  setMyBookHistoryState,
  clearMyBookHistory,
} = myBookHistorySlice.actions;

export default myBookHistorySlice.reducer;
