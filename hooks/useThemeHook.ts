'use client';

import { ColorType, SystemTheme } from 'types/style';
import { dark, shadow, light, colors } from 'style/theme';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { themeActions } from 'store/theme';

export default function useThemeHook() {
  const dispatch = useAppDispatch();

  const { themeMode, colorMode } = useAppSelector(
    (state: RootState) => state.theme
  );

  const setThemeMode = (themeMode: SystemTheme) =>
    dispatch(themeActions.setLocalTheme(themeMode));

  const setColorMode = (colorMode: ColorType) => {
    dispatch(themeActions.setLocalColor(colorMode));
  };

  const themeHandler = (): void => {
    const newTheme: SystemTheme = themeMode === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setThemeMode(newTheme);
  };

  const colorHandler = (colorMode: ColorType): void => {
    window.localStorage.setItem('color-theme', colorMode);
    setColorMode(colorMode);
  };

  const theme =
    themeMode === 'light'
      ? {
          mode: light,
          shadow,
          colors: colorMode === undefined ? colors['teal'] : colors[colorMode],
        }
      : {
          mode: dark,
          shadow,
          colors: colorMode === undefined ? colors['teal'] : colors[colorMode],
        };

  return {
    theme,
    isOn: themeMode === 'light',
    colorHandler,
    themeHandler,
  };
}
