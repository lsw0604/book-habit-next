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
      Object.assign(state, action.payload);
    },
    setSearchBookInitialState(state, _: PayloadAction) {
      Object.assign(state, initialState);
    },
  },
});

export const searchBookRegisterActions = { ...searchBookRegister.actions };

export default searchBookRegister;
