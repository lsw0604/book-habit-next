import { forwardRef } from 'react';
import { cn } from '@/shared/utils/class-name';
import { BookCardContentProps } from '../model/types';
import { formattedAuthor, formattedDatetime, formattedPrice } from '../lib';

const BookCardContent = forwardRef<HTMLDivElement, BookCardContentProps>(
  ({ className, item, variant = 'list', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('ml-4 flex flex-col grow', className)}
        {...props}
      >
        <span className="font-bold line-clamp-2 text-foreground text-base mt-1 hover:underline">
          {item.title}
        </span>
        <div className="line-clamp-1 flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700">
          {item.isbn}
        </div>
        <div className="line-clamp-2 flex overflow-hidden whitespace-normal break-all text-sm text-gray-800 my-1">
          {formattedAuthor(item.authors)} | {item.publisher}
        </div>
        <div className="flex flex-row flex-wrap place-items-center items-center justify-start gap-1">
          <span className="font-bold inline-block align-top text-green-800 text-lg">
            {formattedPrice({
              price: item.price,
              sale_price: item.sale_price,
            })}
          </span>
          <span className="inline-block align-top text-sm">
            <span className="font-medium">{item.price}</span>
            <span className="font-light">원</span>
          </span>
          {item.sale_price > 0 ? (
            <span className="text-xs font-medium line-block items-center uppercase text-gray-800">
              ({item.sale_price})
            </span>
          ) : null}
        </div>
        <p
          className={cn(
            'text-sm font-normal text-gray-800',
            variant === 'list' && 'break-all line-clamp-2'
          )}
        >
          {item.contents === ''
            ? '해당 책의 정보가 등록되지 않았습니다.'
            : item.contents}
        </p>
        <div className="mt-auto line-clamp-1 flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700">
          {formattedDatetime(item.datetime)}
        </div>
      </div>
    );
  }
);

BookCardContent.displayName = 'BookCardContent';

export default BookCardContent;
