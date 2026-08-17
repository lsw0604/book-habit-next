import type { VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';

import { inputVariants } from '@/shared/ui/input/style';

export interface InputDatepickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>,
    VariantProps<typeof inputVariants> {
  value?: Date;
  /** react-day-picker의 4인자 핸들러 대신 값만 받는다 — RHF의 onChange와 그대로 맞물린다 */
  onChange: (date: Date | undefined) => void;
  error?: boolean;
  label?: string;
  errorMessage?: string;
  /** 선택 가능한 첫 날. 캘린더와 텍스트 입력 검증에 함께 쓰인다 */
  fromDate?: Date;
  /** 선택 가능한 마지막 날 */
  toDate?: Date;
}
