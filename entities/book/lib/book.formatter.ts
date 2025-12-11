import isbn3 from 'isbn3';

import { formatDate } from '@/shared/utils';

export const formattedAuthor = (authors: string[]): string => {
  if (authors.length === 0) {
    return '미상';
  }
  if (authors.length === 1) {
    return authors[0];
  }
  return `${authors[0]} 외 ${authors.length - 1}명`;
};

export const formattedTranslator = (translator: string[]) => {
  if (translator.length === 0) {
    return '';
  }
  if (translator.length === 1) {
    return `${translator[0]} 역`;
  }
  return `${translator[0]} 외 ${translator.length - 1}명 역`;
};

export const formattedPubDate = (pubDate: string | null) =>
  pubDate ? formatDate(pubDate, 'medium') : '알 수 없음';

export const formattedISBN = (rawISBN: string): string => {
  if (!rawISBN) return '';

  const parts = rawISBN.split(' ');

  // 1. [최우선] 라이브러리가 인정하는 완벽한 ISBN-13 (978, 979 등)
  // 977은 보통 여기서 걸러집니다.
  const original13 = parts.find(part => {
    const parsed = isbn3.parse(part);
    return parsed?.isIsbn13 && parsed?.isValid;
  });

  if (original13) {
    return isbn3.asIsbn13(original13, false)!;
  }

  // -------------------------------------------------------------
  // 2. [순서 변경 & 추가] ISSN(977) 우선 구출 작전
  // ISBN-10 변환 루프(3번)로 넘어가기 전에, 977이 있는지 먼저 확인해야 합니다!
  // -------------------------------------------------------------
  const issnPart = parts.find(part => {
    const cleanCode = part.replace(/[^0-9]/g, '');
    return /^977\d{10}$/.test(cleanCode);
  });

  if (issnPart) {
    // 977을 찾았으면 즉시 반환 (뒤에 있는 10자리 변환 로직 실행 안 함)
    return issnPart.replace(/[^0-9]/g, '');
  }

  // 3. [마지막] 여기까지 왔다면 977도 없다는 뜻. 이제 10자리 변환 시도.
  // "1739361202" 같은 코드는 여기서 처리됩니다.
  // eslint-disable-next-line no-restricted-syntax
  for (const part of parts) {
    const converted = isbn3.asIsbn13(part, false);
    if (converted) {
      return converted;
    }
  }

  return '';
};
