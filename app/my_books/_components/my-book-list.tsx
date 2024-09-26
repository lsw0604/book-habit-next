'use client';

import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';

// import MyBookItem from './my-book-item';

import useGetMyBookListHook from '@/hooks/my-book/useGetMyBookListHook';
import MyBookItem from './my-book-item';

export default function MyBookList() {
  const { data, ref, isFetching } = useGetMyBookListHook();

  const items = data?.pages.flatMap((page) => page.books);
  console.log(items);

  return (
    <div className="w-full h-auto">
      <ul className="w-full grid gap-4 px-4 mb-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-5 md:gap-2 2xl:grid-cols-10 2xl:gap-2 last:mb-0">
        {items?.map((item) => (
          <MyBookItem {...item} />
        ))}
      </ul>
      <div className="mb-[40px]" ref={ref} />
      {isFetching && <div>loading</div>}
    </div>
  );
}

MyBookList.Empty = function () {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.05)] rounded-lg">
        <p className="text">해당 상태로 등록된 책이 없습니다.</p>
      </div>
    </div>
  );
};

// MyBookList.Loader = function () {
//   return (
//     <div className="w-full h-full flex flex-col overflow-scroll">
//       <ul className="w-full grid gap-4 px-4 mb-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-5 md:gap-2 2xl:grid-cols-10 2xl:gap-2 last:mb-0">
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//         <MyBookItem.Loader />
//       </ul>
//     </div>
//   );
// };
