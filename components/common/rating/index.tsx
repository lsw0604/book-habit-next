'use client';

import { motion } from 'framer-motion';

import Star from './star';
import ErrorMessage from '../error-message';

interface RatingProps {
  rating: number;
  onChange: (value: number) => void;
  label?: string;
  isValid?: boolean;
  errorMessage?: string;
  useValidation?: boolean;
}

export default function Rating({
  rating,
  onChange,
  label,
  errorMessage,
  isValid,
  useValidation,
}: RatingProps) {
  const isClickHandler = (i: number) => {
    if (i === rating) {
      onChange(rating - 1);
    } else {
      onChange(i);
    }
  };

  return (
    <>
      {label && <label></label>}
      <div className="w-full h-[40px]">
        <div className="w-full h-full grid grid-cols-[repeat(5,_1fr)] text-[1rem]">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              className="relative w-auto flex justify-center items-center cursor-pointer"
              key={i}
              onClick={() => isClickHandler(i)}
            >
              <Star i={i} isClicked={rating >= i} />
            </motion.div>
          ))}
        </div>
      </div>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}
