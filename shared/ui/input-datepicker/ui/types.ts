import type { VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';
import type { SelectSingleEventHandler } from 'react-day-picker';

import { inputVariants } from '@/shared/ui/input/style';

export interface InputDatepickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>,
    VariantProps<typeof inputVariants> {
  value?: Date;
  onChange: SelectSingleEventHandler;
  error?: boolean;
  label?: string;
  errorMessage?: string;
}
