import {
  ChangeEvent,
  FormEvent,
  Suspense,
  useCallback,
  useRef,
  useState,
} from 'react';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookIcon } from 'lucide-react';
import ModalHeader from '../modal-header';
import { IconHome } from '@/style/icon';

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

  const statusRef = useRef<string>('읽기시작함');

  const [value, setValue] = useState<string>('읽기시작함');
  const [page, setPage] = useState<number | string>(0);
  // const { date } = useAppSelector((state: RootState) => state.history);

  const { date } = useAppSelector((state: RootState) => state.myBook);

  const myBookId = parseInt(
    pathname.split('/')[pathname.split('/').length - 1]
  );

  const day = dayjs(date).format('YYYY년MM월DD일');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(day, value, page);
  };

  const onChangeStatus = useCallback((status: string) => {
    setValue(status);
    statusRef.current = status;
  }, []);

  const onChangePage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValidNum = /^\d+$/.test(value);

    if (!isValidNum) return setPage('');
    setPage(parseInt(value, 10));
  }, []);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <ModalHeader title="test" icon={<IconHome />} />
      <span>{day}</span>
      <div className="relative w-full">
        <RadioButton
          options={RADIO_BUTTON_OPTION}
          value={value}
          onChange={onChangeStatus}
        />
      </div>
      <Input type="number" value={page} onChange={onChangePage} />
      <Button type="submit">등록하기</Button>
    </form>
  );
}
