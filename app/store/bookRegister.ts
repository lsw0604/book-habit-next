import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootBookRegisterType = {
  endDate: null,
  startDate: null,
  useValidation: false,
};

const bookRegister = createSlice({
  name: 'book_register',
  initialState,
  reducers: {
    setBookRegisterState(state, action: PayloadAction<RootBookRegisterType>) {
      Object.assign(state, action.payload);
    },
    setBookRegisterEndDate(state, action: PayloadAction<Date | null>) {
      state.endDate = action.payload;
    },
    setBookRegisterStartDate(state, action: PayloadAction<Date | null>) {
      state.startDate = action.payload;
    },
    setBookRegisterUseValidate(state, action: PayloadAction<boolean>) {
      state.useValidation = action.payload;
    },
    setBookRegisterInitialState(state, _: PayloadAction) {
      Object.assign(state, initialState);
    },
  },
});

export const bookRegisterActions = { ...bookRegister.actions };

export default bookRegister;
