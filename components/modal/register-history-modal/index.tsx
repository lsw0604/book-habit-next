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
import { DatePicker } from '@/components/datepicker';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroupOptionType } from '@/types/style';

const RADIO_BUTTON_OPTION: RadioGroupOptionType<string>[] = [
  {
    label: '읽기 시작한 날',
    value: '읽기시작함',
    description: '책을 읽기 시작했어요.',
  },
  {
    label: '읽은 날',
    value: '읽는중',
    description: '책을 읽었어요.',
  },
  {
    label: '다 읽은 날',
    value: '다읽음',
    description: '책을 다 읽었어요.',
  },
];

export default function RegisterHistoryModal() {
  const pathname = usePathname();

  const [value, setValue] = useState<string>('읽기시작함');
  // const { date } = useAppSelector((state: RootState) => state.history);

  const { date } = useAppSelector((state: RootState) => state.myBook);

  const myBookId = parseInt(
    pathname.split('/')[pathname.split('/').length - 1]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full">
        <RadioButton
          options={RADIO_BUTTON_OPTION}
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
}
