import type { RootState } from '@/shared/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyBookHistory } from './types';

interface MyBookHistoryState {
  selectedDate: string | null;
  selectedHistory: MyBookHistory | null;
}

const initialState: MyBookHistoryState = {
  selectedDate: null,
  selectedHistory: null,
};

const myBookHistorySlice = createSlice({
  name: 'myBookHistory',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
    },
    setSelectedHistory(state, action: PayloadAction<MyBookHistory | null>) {
      state.selectedHistory = action.payload;
    },
    clearSelectedHistory(state) {
      state.selectedHistory = null;
    },
    clearSelectedDate(state) {
      state.selectedDate = null;
    },
    initialMyBookHistory(state) {
      Object.assign(state, initialState);
    },
  },
});

export const myBookHistorySelector = (state: RootState) => state.myBookHistory;

export const {
  setSelectedDate,
  setSelectedHistory,
  clearSelectedDate,
  clearSelectedHistory,
  initialMyBookHistory,
} = myBookHistorySlice.actions;

export default myBookHistorySlice.reducer;
