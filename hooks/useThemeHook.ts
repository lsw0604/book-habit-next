import { ColorType, SystemTheme } from 'types/style';
import { dark, shadow, light, colors } from 'style/theme';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { themeActions } from 'store/theme';
import { useEffect } from 'react';

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

  const isOn = themeMode === 'light';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const systemIsDarkMode = window.matchMedia?.(
        '(prefers-color-scheme: dark)'
      ).matches;
      const localTheme = window.localStorage.getItem('theme') as SystemTheme;
      const localColor = window.localStorage.getItem(
        'color-theme'
      ) as ColorType;

      setThemeMode(
        localTheme === 'dark' || localTheme === 'light'
          ? localTheme
          : systemIsDarkMode
          ? 'dark'
          : 'light'
      );
      setColorMode(localColor ? localColor : 'teal');
    }
  }, []);

  return {
    colorMode,
    theme,
    isOn,
    colorHandler,
    themeHandler,
  };
}
