'use client';

import ImageWrapper from '@/components/common/image-wrapper';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { queriesKey } from '@/queries';
import { myBookInfoAPI } from '@/lib/api/myBook';
import { AxiosError } from 'axios';
import { BookMarkedIcon, BookmarkIcon } from 'lucide-react';

interface MyBookDetailInfoProps {
  users_books_id: number;
}

const { info } = queriesKey.myBook.useMyBookPageQueriesKey;

export default function MyBookDetailInfo({
  users_books_id,
}: MyBookDetailInfoProps) {
  const { data, isLoading } = useQuery<
    MyBookPageQueriesInfoResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookPageQueriesInfoResultType
  >([info, users_books_id.toString()], () => myBookInfoAPI(users_books_id), {
    select: (response) => {
      return response.result;
    },
  });

  if (!data) return null;

  const { authors, contents, publisher, title, url, thumbnail } = data;

  return (
    <div className="w-full h-full p-4">
      <div className="flex flex-row w-full h-auto shadow-lg rounded-lg">
        <div className="flex justify-center items-center w-[40%] relative p-4">
          <ImageWrapper width={120} height={174} alt={'test'} src={thumbnail} />
          <div className="w-[120px] h-[174px] absolute">
            <BookmarkIcon className="absolute right-2 h-6 fill-yellow-300 stroke-yellow-300" />
          </div>
        </div>
        <div className="w-[60%] flex flex-col h-full py-4 pr-4">
          <div className="w-full h-full mb-2">
            <div className="w-full">
              <h2 className="w-full truncate text-xs">{publisher}</h2>
              <h1 className="w-full truncate text-lg">{title}</h1>
              <h3 className="w-full truncate text-xs">{authors}</h3>
            </div>
          </div>
          {contents === '' ? (
            <p className="w-full text-sm whitespace-pre-line line-clamp-4 overflow-hidden mb-2">
              등록된 정보가 없습니다.
            </p>
          ) : (
            <p className="w-full text-sm whitespace-pre-line line-clamp-4 overflow-hidden mb-2">
              {contents}
            </p>
          )}
          <a className="text-sm" href={url} target="_blank" rel="noreferrer">
            더보기
          </a>
        </div>
      </div>
    </div>
  );
}
