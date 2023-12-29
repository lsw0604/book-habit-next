import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootUserType = {
  id: 0,
  email: '',
  name: '',
  isLogged: false,
  age: 0,
  gender: '',
  provider: '',
  profile: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<RootUserType>) {
      Object.assign(state, action.payload);
    },
    setUserId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setUserIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
    setUserAge(state, action: PayloadAction<number | undefined>) {
      state.age = action.payload;
    },
    setUserGender(state, action: PayloadAction<GenderType | undefined>) {
      state.gender = action.payload;
    },
    setUserProvider(state, action: PayloadAction<ProviderType>) {
      state.provider = action.payload;
    },
    setUserProfile(state, action: PayloadAction<string>) {
      state.profile = action.payload;
    },
    setUserInitialState(state, _: PayloadAction) {
      state = initialState;
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
