import dayjs from 'dayjs';

export const formattedAuthor = (authors: string[]): string => {
  if (authors.length === 0) {
    return '미상';
  } else if (authors.length === 1) {
    return authors[0];
  } else {
    return `${authors[0]} 외 ${authors.length - 1}명`;
  }
};

export const formattedTranslator = (translator: string[]) => {
  if (translator.length === 0) {
    return '';
  } else if (translator.length === 1) {
    return `${translator[0]} 역`;
  } else {
    return `${translator[0]} 외 ${translator.length - 1}명 역`;
  }
};

export const calculateDiscountRate = (price: number, sale_price: number) => {
  if (!price || price <= 0 || !sale_price || sale_price <= 0) return 0;
  return Math.round(((price - sale_price) / price) * 100);
};

export const formattedPrice = (price: number) => {
  return new Intl.NumberFormat('ko-kr').format(price);
};

export const formattedDatetime = (datetime: string) =>
  dayjs(datetime).format('YYYY.MM.DD');
