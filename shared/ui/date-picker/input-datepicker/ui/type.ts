import type { InputHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { SelectSingleEventHandler } from 'react-day-picker';
import type { datePickerVariants } from '../style/variants';

export interface InputDatepickerProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'value' | 'onChange' | 'size'
    >,
    VariantProps<typeof datePickerVariants> {
  value: Date | undefined;
  onChange: SelectSingleEventHandler;
  error?: boolean;
}
