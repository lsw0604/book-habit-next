import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/shared/redux/store';

import type { Book } from '../model';

type BookState = {
  selectedBook: Book | null;
};

const initialState: BookState = {
  selectedBook: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    selectBook(state, action: PayloadAction<Book>) {
      state.selectedBook = action.payload;
    },
    clearSelectedBook(state) {
      state.selectedBook = null;
    },
  },
});

export const bookSelector = (state: RootState) => state.book;

export const { selectBook, clearSelectedBook } = bookSlice.actions;

export default bookSlice.reducer;
