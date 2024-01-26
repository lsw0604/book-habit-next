import ImageWrapper from '@/components/common/image-wrapper';
import React from 'react';

interface MyBookDetailInfoProps {
  users_books_id: number;
}

export default function MyBookDetailInfo({
  users_books_id,
}: MyBookDetailInfoProps) {
  return (
    <div className="flex flex-col w-full h-auto p-4 shadow-lg rounded-lg">
      <div className="flex justify-center items-center w-[40%] relative p-4">
        <div>
          <ImageWrapper
            width={120}
            height={174}
            alt={'test'}
            src={
              'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F501503%3Ftimestamp%3D20230210142025'
            }
          />
        </div>
      </div>
      <div className="w-[57%] flex flex-col h-full"></div>
    </div>
  );
}
