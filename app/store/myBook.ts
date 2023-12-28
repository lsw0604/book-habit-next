import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootMyBookType = {
  date: null,
  status: '',
  useValidation: false,
  rating: 0,
  comment: '',
  comment_isOpen: false,
  comment_id: undefined,
  history_id: undefined,
  users_books_id: undefined,
};

const myBook = createSlice({
  name: 'my_book',
  initialState,
  reducers: {
    setMyBookState(state, action: PayloadAction<RootMyBookType>) {
      Object.assign(state, action.payload);
    },
    setMyBookDate(state, action: PayloadAction<Date | null>) {
      state.date = action.payload;
    },
    setMyBookStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setMyBookUseValidation(state, action: PayloadAction<boolean>) {
      state.useValidation = action.payload;
    },
    setMyBookRating(state, action: PayloadAction<number>) {
      state.rating = action.payload;
    },
    setMyBookComment(state, action: PayloadAction<string>) {
      state.comment = action.payload;
    },
    setMyBookCommentIsOpen(state, action: PayloadAction<boolean>) {
      state.comment_isOpen = action.payload;
    },
    setMyBookCommentId(state, action: PayloadAction<number | undefined>) {
      state.comment_id = action.payload;
    },
    setMyBookHistoryId(state, action: PayloadAction<number | undefined>) {
      state.history_id = action.payload;
      return state;
    },
    setMyBookUsersBooksId(state, action: PayloadAction<number | undefined>) {
      state.users_books_id = action.payload;
      return state;
    },
    setInitialState(state, _: PayloadAction) {
      Object.assign(state, initialState);
    },
  },
});

export const myBookActions = { ...myBook.actions };

export default myBook;
