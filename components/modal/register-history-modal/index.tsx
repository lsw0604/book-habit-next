import { Suspense, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import RadioButton from '../../common/radio-button';
import RegisterHistoryModalList from './register-history-modal-list';

import { RootState, useAppSelector } from '@/app/store';
import { queriesKey } from '@/queries';
import { myBookHistoryAPI } from '@/lib/api/myBook';
import Rating from '@/components/common/rating';

const RADIO_BUTTON_OPTION = [
  {
    label: '읽기시작함',
    value: '읽기시작함',
  },
  { label: '읽는중', value: '읽는중' },
  { label: '다읽음', value: '다읽음' },
];

const { history } = queriesKey.myBook.useMyBookPageQueriesKey;

export default function RegisterHistoryModal() {
  const pathname = usePathname();
  const [value, setValue] = useState<string>('읽기시작함');
  const [rating, setIsRating] = useState(0);

  const onChangeRating = (i: number) => {
    setIsRating(i);
  };

  const { date } = useAppSelector((state: RootState) => state.myBook);

  const myBookId = parseInt(
    pathname.split('/')[pathname.split('/').length - 1]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex">
        <Suspense fallback={<div>loading...</div>}>
          <RegisterHistoryModalList myBookId={myBookId} />
        </Suspense>
      </div>
      <div className="relative w-full">
        <RadioButton
          options={RADIO_BUTTON_OPTION}
          value={value}
          onChange={setValue}
        />
      </div>
      <Rating rating={rating} onChange={onChangeRating} />
    </div>
  );
}
