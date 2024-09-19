import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: ReduxUserType = {
  id: 0,
  email: '',
  name: '',
  isLogged: false,
  birthday: '',
  gender: undefined,
  provider: undefined,
  profile: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(
      state: WritableDraft<ReduxUserType>,
      action: PayloadAction<ReduxUserType>
    ) {
      Object.assign(state, action.payload);
    },
    setUserId(
      state: WritableDraft<ReduxUserType>,
      action: PayloadAction<Pick<ReduxUserType, 'id'>>
    ) {
      state.id = action.payload.id;
    },
    setUserEmail(
      state: WritableDraft<ReduxUserType>,
      action: PayloadAction<Pick<ReduxUserType, 'email'>>
    ) {
      state.email = action.payload.email;
    },
    setUserName(
      state: WritableDraft<ReduxUserType>,
      action: PayloadAction<Pick<ReduxUserType, 'name'>>
    ) {
      state.name = action.payload.name;
    },
    setUserIsLogged(
      state: WritableDraft<ReduxUserType>,
      action: PayloadAction<Pick<ReduxUserType, 'isLogged'>>
    ) {
      state.isLogged = action.payload.isLogged;
    },
    setUserBirthday(
      state: WritableDraft<ReduxUserType>,
      action: PayloadAction<Pick<ReduxUserType, 'birthday'>>
    ) {
      state.birthday = action.payload.birthday;
    },
    setUserGender(
      state: WritableDraft<ReduxUserType>,
      action: PayloadAction<Pick<ReduxUserType, 'gender'>>
    ) {
      state.gender = action.payload.gender;
    },
    setUserProvider(
      state: WritableDraft<ReduxUserType>,
      action: PayloadAction<Pick<ReduxUserType, 'provider'>>
    ) {
      state.provider = action.payload.provider;
    },
    setUserProfile(
      state: WritableDraft<ReduxUserType>,
      action: PayloadAction<Pick<ReduxUserType, 'profile'>>
    ) {
      state.profile = action.payload.profile;
    },
    setInitialUser(state: WritableDraft<ReduxUserType>) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setInitialUser,
  setUserBirthday,
  setUserEmail,
  setUserGender,
  setUserId,
  setUserIsLogged,
  setUserName,
  setUserProfile,
  setUserProvider,
  setUserState,
} = userSlice.actions;

export default userSlice.reducer;
