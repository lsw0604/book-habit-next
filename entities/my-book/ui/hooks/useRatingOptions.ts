import { BOOK_RATING_OPTIONS } from '../constants';

export const useRatingOptions = () => {
  const getRatingText = (rating: number): string => {
    return BOOK_RATING_OPTIONS.find(item => item.rating === rating)?.text || '';
  };

  return {
    ratingOptions: BOOK_RATING_OPTIONS,
    getRatingText,
  };
};
