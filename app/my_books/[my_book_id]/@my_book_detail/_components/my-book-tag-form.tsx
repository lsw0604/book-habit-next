'use client';

import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useMyBookTagForm from '@/hooks/my-book-tag/useMyBookTagForm';
import useMyBookTagFormSubmit from '@/hooks/my-book-tag/useMyBookTagFormSubmit';

export default function MyBookTagForm() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useMyBookTagForm();
  const { onSubmit, isPending } = useMyBookTagFormSubmit(reset);

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
