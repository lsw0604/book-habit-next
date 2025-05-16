import type { RootState } from '@/shared/redux/store';
import type { Book } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Book = {
  authors: [],
  contents: '',
  datetime: '',
  isbns: [],
  price: 0,
  publisher: '',
  salePrice: 0,
  status: '',
  thumbnail: '',
  title: '',
  translators: [],
  url: '',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookState(state, action: PayloadAction<Book>): void {
      Object.assign(state, action.payload);
    },
    setBookTitle(state, action: PayloadAction<Pick<Book, 'title'>>) {
      state.title = action.payload.title;
    },
    setBookPublisher(state, action: PayloadAction<Pick<Book, 'publisher'>>) {
      state.publisher = action.payload.publisher;
    },
    setBookPrice(state, action: PayloadAction<Pick<Book, 'price'>>) {
      state.price = action.payload.price;
    },
    setBookSalePrice(state, action: PayloadAction<Pick<Book, 'salePrice'>>) {
      state.salePrice = action.payload.salePrice;
    },
    setBookThumbnail(state, action: PayloadAction<Pick<Book, 'thumbnail'>>) {
      state.thumbnail = action.payload.thumbnail;
    },
    setBookContents(state, action: PayloadAction<Pick<Book, 'contents'>>) {
      state.contents = action.payload.contents;
    },
    setBookUrl(state, action: PayloadAction<Pick<Book, 'url'>>) {
      state.url = action.payload.url;
    },
    setBookDatetime(state, action: PayloadAction<Pick<Book, 'datetime'>>) {
      state.datetime = action.payload.datetime;
    },
    setBookStatus(state, action: PayloadAction<Pick<Book, 'status'>>) {
      state.status = action.payload.status;
    },
    setBookAuthors(state, action: PayloadAction<Pick<Book, 'authors'>>) {
      state.authors = action.payload.authors;
    },
    setBookTranslators(
      state,
      action: PayloadAction<Pick<Book, 'translators'>>
    ) {
      state.translators = action.payload.translators;
    },
    setBookIsbn(state, action: PayloadAction<Pick<Book, 'isbns'>>) {
      state.isbns = action.payload.isbns;
    },

    setInitialBook(state): void {
      Object.assign(state, initialState);
    },
  },
});

export const bookSelector = (state: RootState) => state.book;

export const {
  setInitialBook,
  setBookState,
  setBookAuthors,
  setBookContents,
  setBookDatetime,
  setBookIsbn,
  setBookPrice,
  setBookPublisher,
  setBookSalePrice,
  setBookStatus,
  setBookThumbnail,
  setBookTitle,
  setBookTranslators,
  setBookUrl,
} = bookSlice.actions;

export default bookSlice.reducer;
