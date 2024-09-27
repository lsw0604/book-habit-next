export const formattedAuthor = (authors: string[]): string => {
  if (authors.length === 0) {
    return '미상';
  } else if (authors.length === 1) {
    return authors[0];
  } else {
    return `${authors[0]} 외 ${authors.length - 1}명`;
  }
};

export const formattedIsbn = (isbn: string): string => {
  const isbns = isbn.split(' ');
  if (isbns.length === 1) return isbns[0];
  return `${isbns[0]} ${isbns[1]}`;
};

export const formattedPrice = ({
  price,
  sale_price,
}: {
  price: number;
  sale_price: number;
}): string | undefined => {
  if (sale_price < 0) {
    return undefined;
  }

  return `${(1 - Math.floor(sale_price / price)) * 10}%`;
};

export const isbnToArray = (isbn: string) => {
  const [first, second] = isbn.split(' ');
  if (first === '') return [second];
  return [first, second];
};
