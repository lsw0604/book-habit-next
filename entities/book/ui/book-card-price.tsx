import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { formattedPrice, calculateDiscountRate } from '../lib';

interface BookCardPriceProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  price: number;
  sale_price: number;
}

export function BookCardPrice({
  price,
  sale_price,
  className,
  ...props
}: BookCardPriceProps) {
  const isNotForSale = sale_price === -1;

  if (isNotForSale) {
    return (
      <div
        className={cn('flex items-baseline gap-1 mt-1 mb-1', className)}
        {...props}
      >
        <span className="bg-black text-xs px-2 py-0.5 font-semibold text-white rounded">
          판매 종료
        </span>
      </div>
    );
  }

  const hasDiscount = sale_price > 0 && sale_price < price;

  return (
    <div
      className={cn('flex items-baseline gap-1 mt-1 mb-1', className)}
      {...props}
    >
      {hasDiscount && (
        <span className="bg-rose-100 text-rose-700 font-semibold text-xs px-2 py-0.5 rounded">
          {calculateDiscountRate(price, sale_price)}%
        </span>
      )}
      <span className="font-bold text-gray-900 ml-1">
        {formattedPrice(sale_price)}원
      </span>
      {hasDiscount && (
        <span className="text-gray-500 text-xs line-through ml-1">
          {formattedPrice(price)}원
        </span>
      )}
    </div>
  );
}
