'use client';

import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Controller } from 'react-hook-form';

import { MyBookHistoryRegistrationSchemaType } from '@/hooks/form/my-book-history/schema/registration.schema';
import useMyBookHistoryRegistrationForm from '@/hooks/form/my-book-history/useMyBookHistoryRegistrationForm';
import useMyBookHistoryMutation from '@/service/my-book-history/useMyBookHistoryService';
import { useAppDispatch, useAppSelector } from '@/store';
import { myBookHistorySelector } from '@/store/features/my-book-history/my-book-history-selector';
import { ErrorMessage } from '@/components/common/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Textarea from '@/components/common/textarea';
import { Button } from '@/components/ui/button';

export default function RegisterMyBookHistoryModal() {
  const params = useParams();
  const { my_book_id } = params;
  const myBookId = Number(my_book_id);

  const history = useAppSelector(myBookHistorySelector);
  const dispatch = useAppDispatch();

  if (!history.createHistory)
    throw Error('history를 등록할 데이터를 확인해주세요.');

  const {
    addMyBookHistory: { mutate, isPending, isError, error },
  } = useMyBookHistoryMutation();
  const { handleSubmit, control } = useMyBookHistoryRegistrationForm({
    date: new Date(history.createHistory.date),
    page: history.createHistory.page,
    memo: history.createHistory.memo,
  });

  console.log(new Date(history.createHistory.date));

  const onSubmit = (data: MyBookHistoryRegistrationSchemaType) => {
    mutate({ ...data, myBookId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 w-full">
        <span className="relative flex w-full h-auto p-2 text-lg justify-center items-center gap-4">
          <CalendarIcon className="w-4 h-4" />
          {history
            ? dayjs(history.createHistory.date).format('YYYY년 MM월 DD일')
            : null}
        </span>
      </div>
      <Controller
        control={control}
        name="page"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-2 w-full mb-2">
            <div className="flex gap-2 w-full">
              <Label className="mr-auto">페이지 수</Label>
              <Input
                {...field}
                onChange={(data) => field.onChange(Number(data.target.value))}
                type="number"
              />
            </div>
            {!!error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="memo"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-2 w-full mb-2">
            <Label>메모</Label>
            <Textarea {...field} className="bg-primary-foreground" />
            {!!error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        )}
      />
      <Button className="w-full" type="submit">
        submit
      </Button>
    </form>
  );
}
