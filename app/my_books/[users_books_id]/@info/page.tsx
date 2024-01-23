import React from 'react';
import { dehydrate } from '@tanstack/react-query';

import getQueryClient from '@/lib/getQueryClient';
import ReactQueryHydrate from '@/lib/ReactQueryHydrate';
import { myBookInfoAPI } from '@/lib/api/myBook';

import { queriesKey } from '@/queries';
import MyBookDetailInfo from './_components/my-book-detail-info';

const { info } = queriesKey.myBook.useMyBookPageQueriesKey;
/**
 * !TODO: 이 페이지에 굳이 react-query를 사용해서 prefetch가 필요한지 고민해보자
 * * 1. myBookInfoAPI는 window에 있는 localStorage에서 auth token을 Bearer헤더에 실어 요청을 보냄
 * * 2. 이 페이지는 server-side에서 실행하기 때문에 window객체는 당연히 'undefined'임
 * * 3. 내 해결 방안은 두가지 prefetch를 포기하거나 myBookInfoAPI를 수정하는 거
 */

export default async function MyBookDetailInfoPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([info, users_books_id.toString()], () =>
    myBookInfoAPI(users_books_id)
  );

  return (
    <ReactQueryHydrate state={dehydrate(queryClient)}>
      <MyBookDetailInfo users_books_id={users_books_id} />
    </ReactQueryHydrate>
  );
}
