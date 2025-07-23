import {
  getHours,
  getMinutes,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';
import { useMemo } from 'react';

import { getValidHour, getValidMinuteOrSecond } from '../lib/formatter';

type PickerType = 'hours' | 'minutes' | 'seconds';

interface UseTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

interface ReturnTimePicker {
  second: string;
  hour: string;
  minute: string;
  setTime: (value: string, type: PickerType) => void;
  stepTime: (step: number, type: PickerType) => void;
}

export const useTimepicker = ({
  date,
  setDate,
}: UseTimePickerProps): ReturnTimePicker => {
  const currentDate = useMemo(() => date ?? new Date(), [date]);

  const hour = useMemo(
    () => getValidHour(String(getHours(currentDate))),
    [currentDate]
  );
  const minute = useMemo(
    () => getValidMinuteOrSecond(String(getMinutes(currentDate))),
    [currentDate]
  );
  const second = useMemo(
    () => getValidMinuteOrSecond(String(getSeconds(currentDate))),
    [currentDate]
  );

  const setTime = (value: string, type: PickerType) => {
    let newDate;
    const numericValue = parseInt(value, 10);

    switch (type) {
      case 'hours':
        newDate = setHours(currentDate, numericValue);
        break;
      case 'minutes':
        newDate = setMinutes(currentDate, numericValue);
        break;
      case 'seconds':
        newDate = setSeconds(currentDate, numericValue);
        break;
      default:
        return;
    }
    setDate(newDate);
  };

  const stepTime = (step: number, type: PickerType) => {
    const currentVal = {
      hours: getHours(currentDate),
      minutes: getMinutes(currentDate),
      seconds: getSeconds(currentDate),
    };

    const newNumericValue = currentVal[type] + step;
    // getValid... 유틸리티 함수를 사용하여 값을 순환시킨 후 설정
    const validValue =
      type === 'hours'
        ? getValidHour(String(newNumericValue))
        : getValidMinuteOrSecond(String(newNumericValue));

    setTime(validValue, type);
  };

  return {
    hour,
    minute,
    second,
    setTime,
    stepTime,
  };
};
