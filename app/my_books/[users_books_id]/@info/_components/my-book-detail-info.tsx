'use client';

import useMyBookPageQueries from '@/queries/myBook/useMyBookPageQueries';

interface MyBookDetailInfoProps {
  users_books_id: number;
}

export default function MyBookDetailInfo({
  users_books_id,
}: MyBookDetailInfoProps) {
  const {
    myBookInfoData,
    myBookInfoError,
    myBookInfoIsError,
    myBookInfoIsLoading,
  } = useMyBookPageQueries(users_books_id);

  return <div>{myBookInfoData?.result.title}</div>;
}
