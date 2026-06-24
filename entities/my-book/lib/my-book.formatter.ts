export const formattedAuthor = (authors: string[]): string => {
  if (authors.length === 0) return '미상';
  if (authors.length === 1) return authors[0];
  return authors.join(', ') + ' 외 ' + (authors.length - 1) + '명';
}

export const formattedTranslator = (translators: string[]): string => {
  if (translators.length === 0) return '없음';
  if (translators.length === 1) return translators[0] + ' 역';
  return translators.join(', ') + ' 외 ' + (translators.length - 1) + '명 역';
}

export const formattedTotalPage = (totalPage: number | null) => {
  return totalPage ? `${totalPage}쪽` : '알 수 없음';
}