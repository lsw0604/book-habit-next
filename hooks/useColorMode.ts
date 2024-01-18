import { ColorType } from '@/types/style';
import { useLocalStorage, useUpdateEffect } from 'usehooks-ts';

interface UseColorModeOutput {
  colorMode: ColorType;
  colorHandler: (color: ColorType) => void;
}

export function useColorMode(defaultValue?: ColorType): UseColorModeOutput {
  const isColor =
    typeof window !== 'undefined'
      ? (window.localStorage.getItem('color-theme') as ColorType)
      : 'cyan';
  const [colorMode, setColorMode] = useLocalStorage<ColorType>(
    'color',
    defaultValue ?? isColor ?? 'cyan'
  );

  const colorHandler = (color: ColorType) => {
    setColorMode(color);
  };

  useUpdateEffect(() => {
    setColorMode(isColor);
  }, [isColor]);

  return {
    colorMode,
    colorHandler,
  };
}
