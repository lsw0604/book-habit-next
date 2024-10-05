'use client';

import { useParams } from 'next/navigation';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useMyBookTagForm from '@/hooks/my-book-tag/useMyBookTagForm';
import { MyBookTagSchemaType } from '@/schemas/my-book-tag.schema';
import useMyBookTagMutation from '@/queries/my-book-tag/useMyBookTagMutation';

export default function MyBookTagForm() {
  const params = useParams();
  const { my_book_id } = params;
  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useMyBookTagForm();
  const { addMyBookTag } = useMyBookTagMutation();
  const { mutate, isPending } = addMyBookTag();

  const onSubmit = (data: MyBookTagSchemaType) => {
    mutate(
      { myBookId: Number(my_book_id), tag: data.tag },
      {
        onSuccess: () => {
          reset({ tag: '' });
        },
      }
    );
  };

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
      <Button type="submit" disabled={isSubmitting} isLoading={isPending}>
        추가
      </Button>
    </form>
  );
}
