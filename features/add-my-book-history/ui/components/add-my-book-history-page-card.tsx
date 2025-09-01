import { BookOpenIcon } from 'lucide-react';
import { FocusEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { calculatePages } from '@/entities/my-book-history';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';

import type { AddMyBookHistoryType } from '../../schemas';

export function AddMyBookHistoryPageCard() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<AddMyBookHistoryType>();
  const [startPage, endPage] = watch(['startPage', 'endPage']);

  const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <Card className="gap-2 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>
          독서 페이지 기록<span className="ml-2 text-red-500">*</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Input
          label="독서 시작 페이지"
          id="startPage"
          type="number"
          inputMode="numeric"
          autoComplete="off"
          min={0}
          error={!!errors.startPage}
          errorMessage={errors.startPage?.message}
          onFocus={handleOnFocus}
          {...register('startPage', { valueAsNumber: true })}
        />
        <Input
          label="독서 종료 페이지"
          id="endPage"
          type="number"
          inputMode="numeric"
          autoComplete="off"
          min={0}
          error={!!errors.endPage}
          onFocus={handleOnFocus}
          errorMessage={errors.endPage?.message}
          {...register('endPage', { valueAsNumber: true })}
        />
      </CardContent>
      <CardFooter>
        <div className="mt-4 bg-muted border rounded-lg p-3 w-full">
          <div className="flex items-center gap-1.5 mb-1.5">
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">
              읽은 페이지
            </span>
          </div>
          <p className="text-sm text-foreground line-clamp-2">
            {startPage}p ~ {endPage}p (총 {calculatePages(startPage, endPage)}{' '}
            페이지)
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
