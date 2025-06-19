import {
  ChangeEvent,
  SetStateAction,
  Dispatch,
  useEffect,
  useRef,
  useState,
  RefObject,
  KeyboardEvent,
} from 'react';

interface TimePickerProps {
  initialTime?: string;
  onTimeChange: (time: string) => void;
}

interface IHandleBlur {
  value: string;
  setter: Dispatch<SetStateAction<string>>;
}

interface IHandleInputChange {
  e: ChangeEvent<HTMLInputElement>;
  setter: Dispatch<SetStateAction<string>>;
  min: number;
  max: number;
  nextRef: RefObject<HTMLInputElement> | null;
}

interface IHandleKeydown {
  e: KeyboardEvent<HTMLInputElement>;
  setter: Dispatch<SetStateAction<string>>;
  min: number;
  max: number;
  prevRef: RefObject<HTMLInputElement> | null;
  nextRef: RefObject<HTMLInputElement> | null;
  currentValue: string;
}

export default function TimePicker({
  onTimeChange,
  initialTime,
}: TimePickerProps) {
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const [second, setSecond] = useState<string>('00');

  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialTime) {
      const [initHour, initMinute, initSecond] = initialTime.split(':');

      // 초기값이 유효한지 간단히 검사하고 설정
      setHour(initHour ? initHour.padStart(2, '0') : '00');
      setMinute(initMinute ? initMinute.padStart(2, '0') : '00');
      setSecond(initSecond ? initSecond.padStart(2, '0') : '00');
    }
  }, [initialTime]);

  useEffect(() => {
    const currentHour = parseInt(hour, 10);
    const currentMinute = parseInt(minute, 10);
    const currentSecond = parseInt(second, 10);

    const isValid =
      !Number.isNaN(currentHour) &&
      !Number.isNaN(currentMinute) &&
      !Number.isNaN(currentSecond) &&
      currentHour >= 0 &&
      currentHour <= 23 &&
      currentMinute >= 0 &&
      currentMinute <= 59 &&
      currentSecond >= 0 &&
      currentSecond <= 59;

    if (!isValid) return; // 유효하지 않으면 onTimeChange 호출 X

    const formattedTime = `${String(currentHour).padStart(2, '0')}:${String(
      currentMinute
    ).padStart(2, '0')}:${String(currentSecond).padStart(2, '0')}`;

    onTimeChange(formattedTime);
  }, [hour, minute, second, onTimeChange]); // onTimeChange를 의존성 배열에 추가 (권장)

  const handleInputChange = ({
    e,
    setter,
    min,
    max,
    nextRef,
  }: IHandleInputChange) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    // 2자리 이상 입력 방지
    if (value.length > 2) {
      value = value.substring(0, 2);
    }

    let numValue = parseInt(value, 10);

    if (isNaN(numValue)) {
      setter(''); // 숫자가 아니면 빈 문자열로 설정
    } else {
      // 최대값을 초과하면 최대값으로 설정
      if (numValue > max) {
        numValue = max;
      }

      if (numValue < min) {
        numValue = min;
      }
      setter(String(numValue));
    }

    // 2자리 모두 입력했거나, 최대값으로 자동 조절된 경우 다음 필드로 이동
    if (
      (value.length === 2 || (!isNaN(numValue) && numValue === max)) &&
      nextRef &&
      nextRef.current
    ) {
      nextRef.current.focus();
    }
  };

  const handleBlur = ({ value, setter }: IHandleBlur) => {
    if (value && value.length === 2) {
      setter(value.padStart(2, '0'));
    }
  };

  const handleKeydown = ({
    e,
    max,
    min,
    setter,
    prevRef,
    nextRef,
    currentValue,
  }: IHandleKeydown) => {
    let numVal = parseInt(currentValue, 10);
    if (isNaN(numVal)) numVal = 0;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newValue = String(Math.min(numVal + 1, max)).padStart(2, '0');
      setter(newValue);
      e.currentTarget.select(); // 값 변경 후 전체 선택
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newValue = String(Math.max(numVal - 1, min)).padStart(2, '0');
      setter(newValue);
      e.currentTarget.select(); // 값 변경 후 전체 선택
    } else if (
      e.key === 'Backspace' &&
      currentValue === '' && // 현재 값이 비어있고
      prevRef &&
      prevRef.current
    ) {
      // 현재 필드가 비어있을 때 백스페이스 누르면 이전 필드로 이동
      prevRef.current.focus();
    } else if (
      e.key === 'Backspace' &&
      currentValue !== '' && // 현재 값이 있을 때 백스페이스 누르면 값 지우기 후 이전 필드로 이동
      prevRef &&
      prevRef.current
    ) {
      if (
        e.currentTarget.selectionStart === 0 &&
        e.currentTarget.selectionEnd === 0
      ) {
        // 커서가 맨 앞에 있을 때 Backspace 누르면 이전 필드로 이동
        setter(''); // 현재 필드 값 지우기
        prevRef.current.focus();
        e.preventDefault(); // 기본 Backspace 동작 방지 (예: 브라우저 뒤로가기)
      } else {
        // 일반적인 Backspace 동작 허용
        setter(currentValue.substring(0, currentValue.length - 1));
      }
    } else if (e.key === 'ArrowLeft' && prevRef && prevRef.current) {
      // 커서가 맨 앞에 있을 때만 이동
      console.log('prev');
      if (
        e.currentTarget.selectionStart === 0 &&
        e.currentTarget.selectionEnd === 0
      ) {
        console.log('prev2');
        prevRef.current.focus();
      }
    } else if (e.key === 'ArrowRight' && nextRef && nextRef.current) {
      // 커서가 맨 뒤에 있을 때만 이동
      if (
        e.currentTarget.selectionStart === currentValue.length &&
        e.currentTarget.selectionEnd === currentValue.length
      ) {
        nextRef.current.focus();
      }
    }
  };

  return (
    <div className="flex w-full h-10 text-sm border border-input rounded-md justify-center items-center">
      <input
        className="border-none w-8 focus:outline-none py-2 box-border text-center h-full text-gray-700"
        id="hour"
        type="text"
        ref={hourRef}
        value={hour}
        onBlur={() => handleBlur({ value: hour, setter: setHour })}
        onChange={e =>
          handleInputChange({
            e,
            min: 0,
            max: 23,
            setter: setHour,
            nextRef: minuteRef,
          })
        }
        onKeyDown={e =>
          handleKeydown({
            e,
            min: 0,
            max: 23,
            setter: setHour,
            currentValue: hour,
            nextRef: minuteRef,
            prevRef: null,
          })
        }
        maxLength={2}
        placeholder="HH"
        autoCapitalize="off"
      />
      <span>:</span> {/* 하이픈 대신 일반적으로 사용되는 콜론으로 변경 */}
      <input
        className="border-none w-8 focus:outline-none py-2 box-border text-center h-full text-gray-700"
        id="minute"
        type="text"
        ref={minuteRef}
        value={minute}
        onBlur={() => handleBlur({ value: minute, setter: setMinute })}
        onChange={e =>
          handleInputChange({
            e,
            min: 0,
            max: 59,
            setter: setMinute,
            nextRef: secondRef,
          })
        }
        onKeyDown={e =>
          handleKeydown({
            e,
            min: 0,
            max: 59,
            setter: setMinute,
            prevRef: hourRef,
            nextRef: secondRef,
            currentValue: minute,
          })
        }
        maxLength={2}
        placeholder="MM"
        autoCapitalize="off"
      />
      <span>:</span> {/* 하이픈 대신 일반적으로 사용되는 콜론으로 변경 */}
      <input
        className="border-none w-8 focus:outline-none py-2 box-border text-center h-full text-gray-700"
        id="second"
        type="text"
        ref={secondRef}
        value={second}
        onBlur={() => handleBlur({ value: second, setter: setSecond })}
        onChange={e =>
          handleInputChange({
            e,
            min: 0,
            max: 59,
            setter: setSecond,
            nextRef: null,
          })
        }
        onKeyDown={e =>
          handleKeydown({
            e,
            min: 0,
            max: 59,
            setter: setSecond,
            nextRef: null,
            prevRef: minuteRef,
            currentValue: second,
          })
        }
        maxLength={2}
        placeholder="SS"
        autoCapitalize="off"
      />
    </div>
  );
}
