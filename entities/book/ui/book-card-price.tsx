import type { BookCardPriceProps } from './types';
import { formattedPrice, calculateDiscountRate } from '../lib';
import { cn } from '@/shared/utils/class-name';

export default function BookCardPrice({
  price,
  salePrice,
  className,
}: BookCardPriceProps) {
  const hasDiscount = salePrice > 0 && salePrice < price;

  return (
    <div className={cn('flex items-baseline gap-1 mt-1 mb-1', className)}>
      {hasDiscount && (
        <span className="bg-rose-100 text-rose-700 font-semibold text-xs px-2 py-0.5 rounded">
          {calculateDiscountRate(price, salePrice)}%
        </span>
      )}
      <span className="font-bold text-gray-900 ml-1">
        {formattedPrice(salePrice)}원
      </span>
      {hasDiscount && (
        <span className="text-gray-500 text-xs line-through ml-1">
          {formattedPrice(price)}원
        </span>
      )}
    </div>
  );
}
