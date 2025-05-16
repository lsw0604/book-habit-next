import { BOOK_RATINGS } from '../model';

export const useRatingOptions = () => {
  const getRatingText = (rating: number): string => {
    return BOOK_RATINGS.find(item => item.rating === rating)?.text || '';
  };

  return {
    ratingOptions: BOOK_RATINGS,
    getRatingText,
  };
};
