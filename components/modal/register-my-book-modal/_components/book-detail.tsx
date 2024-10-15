import dayjs from 'dayjs';
import { FieldErrors } from 'react-hook-form';

import Tag from '@/components/common/tag';
import { ErrorMessage } from '@/components/common/error-message';
import ImageWrapper from '@/components/common/image-wrapper';
import { MyBookSchemaType } from '@/schemas/my-book.schema';
import { formattedIsbn, formattedPrice } from '@/utils/book';

interface BookDetailProps {
  detail: ReduxBookType;
  errors: FieldErrors<MyBookSchemaType>;
}

export default function BookDetail({ detail, errors }: BookDetailProps) {
  const time = dayjs(detail.datetime);
  return (
    <>
      <div className="flex" key={detail.isbn[0]}>
        <div className="flex w-full">
          <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
            <ImageWrapper
              src={detail.thumbnail}
              alt={detail.thumbnail}
              width={120}
              height={174}
              priority
            />
            {errors.thumbnail?.message && (
              <ErrorMessage>{errors.thumbnail.message}</ErrorMessage>
            )}
          </div>
          <div className="ml-4 flex flex-col grow">
            <span className="font-bold line-clamp-2 text-foreground text-base mt-1 hover:underline">
              {detail.title}
            </span>
            <div className="line-clamp-1 flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700">
              {formattedIsbn(detail.isbn.join(' '))}
            </div>
            <div className="flex flex-row flex-wrap place-items-center items-center justify-start gap-1">
              <span className="font-bold inline-block align-top text-green-800 text-lg">
                {formattedPrice({
                  price: detail.price,
                  sale_price: detail.sale_price,
                })}
              </span>
              <span className="inline-block align-top text-sm">
                <span className="font-medium">{detail.price}</span>
                <span className="font-light">원</span>
              </span>
              {detail.sale_price > 0 ? (
                <span className="text-xs font-medium line-block items-center uppercase text-gray-800">
                  ({detail.sale_price})
                </span>
              ) : null}
            </div>
            <p className="text-sm font-normal text-gray-800">
              {detail.contents === ''
                ? '해당 책의 정보가 등록되지 않았습니다.'
                : detail.contents}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap w-full mt-2">
        {detail.status ? <Tag>{detail.status}</Tag> : null}
        {detail.authors.map((author) => (
          <Tag key={author}>{author}</Tag>
        ))}
        {detail.translators.map((translator) => (
          <Tag key={translator}>{translator}</Tag>
        ))}
        <Tag>{detail.publisher}</Tag>
        <Tag>{time.add(9, 'hour').format('YYYY.MM.DD')}</Tag>
      </div>
    </>
  );
}
