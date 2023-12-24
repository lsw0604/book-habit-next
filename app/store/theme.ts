'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootThemeType } from '@/types/redux.theme';
import { ColorType, SystemTheme } from '@/types/style';

let localTheme;
let systemTheme;
let colorTheme;

if (typeof window !== 'undefined') {
  localTheme = window.localStorage.getItem('theme');
  systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  colorTheme = window.localStorage.getItem('color-theme') as ColorType;
}

const initialState: RootThemeType = {
  themeMode:
    localTheme === 'dark' || localTheme === 'light'
      ? localTheme
      : systemTheme
      ? 'dark'
      : 'light',
  colorMode: colorTheme === null ? 'teal' : colorTheme,
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
