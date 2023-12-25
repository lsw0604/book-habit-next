import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootSearchBookRegisterType = {
  thumbnail: '',
  status: '',
  isbn: '',
  price: 0,
  publisher: '',
  authors: [],
  contents: '',
  url: '',
  title: '',
};

const searchBookRegister = createSlice({
  name: 'search_book_register',
  initialState,
  reducers: {
    setSearchBookRegister(
      state,
      action: PayloadAction<RootSearchBookRegisterType>
    ) {
      state = action.payload;
    },
    setSearchBookRegisterThumbnail(
      state,
      action: PayloadAction<string | undefined>
    ) {
      state.thumbnail = action.payload;
    },
    setSearchBookRegisterStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setSearchBookRegisterISBN(state, action: PayloadAction<string>) {
      state.isbn = action.payload;
    },
    setSearchBookRegisterPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
    setSearchBookRegisterPublisher(state, action: PayloadAction<string>) {
      state.publisher = action.payload;
    },
    setSearchBookRegisterAuthors(state, action: PayloadAction<string[]>) {
      state.authors = action.payload;
    },
    setSearchBookRegisterContents(state, action: PayloadAction<string>) {
      state.contents = action.payload;
    },
    setSearchBookRegisterURL(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    setSearchBookRegisterTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setSearchBookInitialState(state, _: PayloadAction) {
      state = initialState;
      return state;
    },
  },
});

export const searchBookRegisterActions = { ...searchBookRegister.actions };

export default searchBookRegister;
