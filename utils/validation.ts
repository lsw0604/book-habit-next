/**
 * * 주어진 문자열이 숫자로만 구성되어 있고, 지정된 최대 길이를 초과하지 않는지 확인합니다.
 *
 * @param {string} value - 검사할 문자열입니다.
 * @param {number} maxLength - 문자열의 최대 허용 길이입니다.
 * @returns {boolean} 문자열이 숫자로만 구성되어 있고, 최대 길이를 초과하지 않으면 true를 반환합니다.
 */
export const isValidNumericString = (value: string, maxLength: number) =>
  /^\d*$/.test(value) && value.length <= maxLength;
