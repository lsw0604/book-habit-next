import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootThemeType } from '@/types/redux.theme';
import { ColorType, SystemTheme } from '@/types/style';

const initialState: RootThemeType = {
  themeMode: undefined,
  colorMode: undefined,
};

const theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLocalTheme(state, action: PayloadAction<SystemTheme>) {
      state.themeMode = action.payload;
    },
    setLocalColor(state, action: PayloadAction<ColorType>) {
      state.colorMode = action.payload;
    },
  },
});

export const themeActions = { ...theme.actions };

export default theme;
