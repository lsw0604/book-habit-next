import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootBookRegisterType = {
  endDate: null,
  startDate: null,
  useValidate: false,
};

const bookRegister = createSlice({
  name: 'book_register',
  initialState,
  reducers: {
    setBookRegisterEndDate(state, action: PayloadAction<Date>) {
      state.endDate = action.payload;
    },
    setBookRegisterStartDate(state, action: PayloadAction<Date>) {
      state.startDate = action.payload;
    },
    setBookRegisterUseValidate(state, action: PayloadAction<boolean>) {
      state.useValidate = action.payload;
    },
    setBookRegisterInitialState(state, _: PayloadAction) {
      state = initialState;
      return state;
    },
  },
});

export const bookRegisterActions = { ...bookRegister.actions };

export default bookRegister;
