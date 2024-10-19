import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: ReduxMyBookCommentType = {};

const myBookCommentSlice = createSlice({
  name: 'my-book-comment',
  initialState,
  reducers: {
    setMyBookComment: (
      state: WritableDraft<ReduxMyBookCommentType>,
      action: PayloadAction<MyBookCommentItemType>
    ) => {
      state.selectedComment = action.payload;
    },
    clearMyBookComment: (state: WritableDraft<ReduxMyBookCommentType>) => {
      state.selectedComment = undefined;
      state.isEdit = undefined;
    },
    updateMyBookComment: (
      state: WritableDraft<ReduxMyBookCommentType>,
      action: PayloadAction<Partial<MyBookCommentItemType>>
    ) => {
      if (state.selectedComment) {
        state.selectedComment = { ...state.selectedComment, ...action.payload };
      }
    },
    setMyBookCommentEdit: (
      state: WritableDraft<ReduxMyBookCommentType>,
      action: PayloadAction<boolean>
    ) => {
      state.isEdit = action.payload;
    },
  },
});

export const {
  clearMyBookComment,
  setMyBookComment,
  updateMyBookComment,
  setMyBookCommentEdit,
} = myBookCommentSlice.actions;

export default myBookCommentSlice.reducer;
