import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: ReduxBookType = {
  authors: [],
  contents: '',
  datetime: '',
  isbn: [],
  price: 0,
  publisher: '',
  sale_price: 0,
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
    setBookState(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<ReduxBookType>
    ) {
      Object.assign(state, action.payload);
    },
    setBookTitle(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'title'>>
    ) {
      state.title = action.payload.title;
    },
    setBookPublisher(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'publisher'>>
    ) {
      state.publisher = action.payload.publisher;
    },
    setBookPrice(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'price'>>
    ) {
      state.price = action.payload.price;
    },
    setBookSalePrice(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'sale_price'>>
    ) {
      state.sale_price = action.payload.sale_price;
    },
    setBookThumbnail(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'thumbnail'>>
    ) {
      state.thumbnail = action.payload.thumbnail;
    },
    setBookContents(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'contents'>>
    ) {
      state.contents = action.payload.contents;
    },
    setBookUrl(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'url'>>
    ) {
      state.url = action.payload.url;
    },
    setBookDatetime(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'datetime'>>
    ) {
      state.datetime = action.payload.datetime;
    },
    setBookStatus(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'status'>>
    ) {
      state.status = action.payload.status;
    },
    setBookAuthors(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'authors'>>
    ) {
      state.authors = action.payload.authors;
    },
    setBookTranslators(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'translators'>>
    ) {
      state.translators = action.payload.translators;
    },
    setBookIsbn(
      state: WritableDraft<ReduxBookType>,
      action: PayloadAction<Pick<ReduxBookType, 'isbn'>>
    ) {
      state.isbn = action.payload.isbn;
    },
    setInitialBook(state: WritableDraft<ReduxBookType>) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setInitialBook,
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
  setBookState,
} = bookSlice.actions;

export default bookSlice.reducer;
