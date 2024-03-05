import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootHistoryType = {
  date: undefined,
  status: '',
  page: 0,
};

const history = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistoryState(state, action: PayloadAction<RootHistoryType>) {
      Object.assign(state, action.payload);
    },
    setHistoryDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setHistoryStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setHistoryPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setHistoryInitial(state, _: PayloadAction) {
      Object.assign(state, initialState);
    },
  },
});

export const historyActions = { ...history.actions };

export default history;
