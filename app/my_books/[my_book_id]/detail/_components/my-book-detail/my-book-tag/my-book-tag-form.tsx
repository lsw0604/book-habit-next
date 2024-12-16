'use client';

import { Controller } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useMyBookTagRegistrationForm from '@/hooks/form/my-book-tag/useMyBookTagRegistrationForm';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useSuccessHandler from '@/hooks/success/useSuccessHandler';
import useMyBookTagFormSubmit from '@/hooks/my-book-tag/useMyBookTagFormSubmit';

export default function MyBookTagForm() {
  const params = useParams();
  const { my_book_id } = params;
  const myBookId = Number(my_book_id);

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useMyBookTagRegistrationForm();

  const { onSubmit, isPending, isSuccess, isError, error } =
    useMyBookTagFormSubmit({
      reset,
      myBookId,
    });

  useErrorHandler(isError, error);
  useSuccessHandler({ isSuccess, message: '태그가 추가되었습니다.' });

  return (
    <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="tag"
        render={({ field }) => (
          <Input
            {...field}
            autoComplete="off"
            className="border-none"
            placeholder="태그를 입력해주세요."
          />
        )}
      />
      <Button
        variant="ghost"
        className="text-gray-500 text-sm font-bold"
        type="submit"
        disabled={isSubmitting}
        isLoading={isPending}
      >
        등록
      </Button>
    </form>
  );
}
