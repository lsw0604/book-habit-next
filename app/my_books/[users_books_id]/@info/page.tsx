'use client';

import useMyBookPageQueries from '@/queries/myBook/useMyBookPageQueries';
import MyBookDetailInfo from './_components/my-book-detail-info';

/**
 * !TODO: 이 페이지에 굳이 react-query를 사용해서 prefetch가 필요한지 고민해보자
 * * 1. myBookInfoAPI는 window에 있는 localStorage에서 auth token을 Bearer헤더에 실어 요청을 보냄
 * * 2. 이 페이지는 server-side에서 실행하기 때문에 window객체는 당연히 'undefined'임
 * * 3. 내 해결 방안은 두가지 prefetch를 포기하거나 myBookInfoAPI를 수정하는 거
 */

export default function MyBookDetailInfoPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;

  const {
    myBookInfoData,
    myBookInfoError,
    myBookInfoIsError,
    myBookInfoIsLoading,
  } = useMyBookPageQueries(users_books_id);

  return <div>{users_books_id}</div>;
}
