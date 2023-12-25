import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootReplyType = {
  comment_id: 0,
  reply_id: 0,
};

const reply = createSlice({
  name: 'reply',
  initialState,
  reducers: {
    setReplyCommentId(state, action: PayloadAction<number>) {
      state.comment_id = action.payload;
    },
    setReplyId(state, action: PayloadAction<number>) {
      state.reply_id = action.payload;
    },
    setReplyInitialState(state, _: PayloadAction) {
      state = initialState;
      return state;
    },
  },
});

export const replyActions = { ...reply.actions };

export default reply;
