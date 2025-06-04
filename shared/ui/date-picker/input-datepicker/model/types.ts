import { RefObject } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';

export interface InputDatepickerProps {
  value: Date | undefined;
  onChange: SelectSingleEventHandler;
  className?: string;
}

export interface UseInputDatepickerProps
  extends Pick<InputDatepickerProps, 'value' | 'onChange'> {}

export interface UseInputDatepickerNavigationProps {
  date: DateState;
  yearRef: RefObject<HTMLInputElement>;
  monthRef: RefObject<HTMLInputElement>;
  dayRef: RefObject<HTMLInputElement>;
}

export interface DateState {
  year: string;
  month: string;
  day: string;
}

export interface UseInputDatepickerValidation {
  isMonthInvalid: boolean;
  isDayInvalidBasic: boolean;
  isDateCompositionInvalid: boolean;
  areAllFieldsFilled: boolean;
  parsedValidDate: Date | null;
}
