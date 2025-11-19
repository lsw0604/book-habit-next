declare module '*.svg' {
  import React from 'react';

  const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}

// src/types/isbn3.d.ts

declare module 'isbn3' {
  /**
   * isbn3.parse()가 반환하는 객체의 구조입니다.
   */
  export interface ParsedIsbn {
    isbn13: string; // "9788912345678"
    isbn10: string; // "891234567X"
    isbn13h: string; // "978-89-1234-567-8" (하이픈 포함)
    isbn10h: string; // "89-1234-567-X" (하이픈 포함)

    prefix: string; // "978"
    group: string; // "89" (국가/언어 코드, 89는 한국)
    publisher: string; // 출판사 식별 번호
    article: string; // 책 고유 번호
    check: string; // 체크 디지트 (검증 번호)

    source: string; // 입력했던 원본 문자열
    isIsbn13: boolean; // 입력값이 ISBN-13이었는지 여부
    isIsbn10: boolean; // 입력값이 ISBN-10이었는지 여부
    isValid: boolean; // 유효한 ISBN인지 최종 여부
  }

  /**
   * ISBN 문자열을 분석하여 상세 정보를 반환합니다.
   * 분석할 수 없는 문자열이면 null을 반환합니다.
   */
  export function parse(isbn: string): ParsedIsbn | null;

  /**
   * 입력된 값을 ISBN-13으로 변환합니다.
   * @param hyphen true면 하이픈이 포함된 문자열 반환
   */
  export function asIsbn13(isbn: string, hyphen?: boolean): string | null;

  /**
   * 입력된 값을 ISBN-10으로 변환합니다.
   */
  export function asIsbn10(isbn: string, hyphen?: boolean): string | null;

  /**
   * 하이픈을 추가합니다.
   */
  export function hyphenate(isbn: string): string;
}
