import { useMemo } from 'react';
import {
  getHours,
  getMinutes,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';
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

export const useTimePicker = ({
  date,
  setDate,
}: UseTimePickerProps): ReturnTimePicker => {
  const _date = date ?? new Date();

  const hour = useMemo(() => getValidHour(String(getHours(_date))), [_date]);
  const minute = useMemo(
    () => getValidMinuteOrSecond(String(getMinutes(_date))),
    [_date]
  );
  const second = useMemo(
    () => getValidMinuteOrSecond(String(getSeconds(_date))),
    [_date]
  );

  const setTime = (value: string, type: PickerType) => {
    let newDate;
    const numericValue = parseInt(value, 10);

    switch (type) {
      case 'hours':
        newDate = setHours(_date, numericValue);
        break;
      case 'minutes':
        newDate = setMinutes(_date, numericValue);
        break;
      case 'seconds':
        newDate = setSeconds(_date, numericValue);
        break;
    }
    setDate(newDate);
  };

  const stepTime = (step: number, type: PickerType) => {
    const currentVal = {
      hours: getHours(_date),
      minutes: getMinutes(_date),
      seconds: getSeconds(_date),
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
