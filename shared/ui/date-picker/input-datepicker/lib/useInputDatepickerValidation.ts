import { isValid, parse } from 'date-fns';
import { DateState, UseInputDatepickerValidation } from '../model/types'; // DateState 타입 경로를 실제 프로젝트에 맞게 수정하세요.
import { MAX_YEAR_LENGTH, MAX_MONTH_DAY_LENGTH } from './constant'; // 상수 파일 경로

export function useInputDatepickerValidation(
  date: DateState
): UseInputDatepickerValidation {
  const { year, month, day } = date;

  const areAllFieldsFilled =
    year.length === MAX_YEAR_LENGTH &&
    month.length === MAX_MONTH_DAY_LENGTH &&
    day.length === MAX_MONTH_DAY_LENGTH;

  const parsedMonthInt = parseInt(month, 10);
  const isMonthInvalid =
    month.length === MAX_MONTH_DAY_LENGTH && // 월이 두 글자일 때만 검사
    (parsedMonthInt > 12 || parsedMonthInt < 1);

  const parsedDayInt = parseInt(day, 10);
  const isDayInvalidBasic =
    day.length === MAX_MONTH_DAY_LENGTH && // 일이 두 글자일 때만 검사
    (parsedDayInt > 31 || parsedDayInt < 1);

  let parsedValidDate: Date | null = null;
  let isActualDateValid = false;

  if (areAllFieldsFilled && !isMonthInvalid && !isDayInvalidBasic) {
    const dateString = `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}`;
    // date-fns의 parse는 세 번째 인자로 referenceDate가 필수입니다.
    const parsedDateObj = parse(dateString, 'yyyy-MM-dd', new Date());

    if (isValid(parsedDateObj)) {
      // date-fns의 parse는 일반적으로 엄격하여, "1995-02-31" 같은 경우 Invalid Date를 반환합니다.
      // 따라서, isValid(parsedDateObj)가 true라면, 해당 날짜는 존재하며,
      // 추가로 입력된 년, 월, 일이 파싱된 년, 월, 일과 일치하는지 확인하여
      // 혹시 모를 라이브러리 버전이나 특이 케이스에 의한 overflow 파싱을 방지합니다.
      if (
        parsedDateObj.getFullYear() === parseInt(year, 10) &&
        parsedDateObj.getMonth() + 1 === parsedMonthInt && // getMonth는 0부터 시작
        parsedDateObj.getDate() === parsedDayInt
      ) {
        isActualDateValid = true;
        parsedValidDate = parsedDateObj;
      }
    }
  }

  // isDateCompositionInvalid는 모든 필드가 채워지고, 월/일 기본 범위는 정상이지만,
  // 실제 날짜 조합이 유효하지 않은 경우(예: 2월 31일) true가 됩니다.
  const isDateCompositionInvalid =
    areAllFieldsFilled &&
    !isMonthInvalid &&
    !isDayInvalidBasic &&
    !isActualDateValid;

  return {
    isMonthInvalid,
    isDayInvalidBasic,
    isDateCompositionInvalid,
    areAllFieldsFilled,
    parsedValidDate,
  };
}
