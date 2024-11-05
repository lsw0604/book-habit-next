import { Controller } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/common/error-message';

import { MyBookTagRegistrationSchemaType } from '@/hooks/form/my-book-tag/schema/registration.schema';
import useMyBookTagRegistrationForm from '@/hooks/form/my-book-tag/useMyBookTagRegistrationForm';
import { useMyBookTagMutation } from '@/service/my-book-tag/useMyBookTagService';

export default function TagForm() {
  const params = useParams();
  const { my_book_id } = params;
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useMyBookTagRegistrationForm();
  const {
    addMyBookTag: { mutate, isPending },
  } = useMyBookTagMutation();

  const onSubmit = (data: MyBookTagRegistrationSchemaType) => {
    mutate(
      { tag: data.tag, myBookId: Number(my_book_id) },
      {
        onSuccess: () => {
          reset({ tag: '' });
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <Controller
        control={control}
        name="tag"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-2 w-full">
            <Input
              {...field}
              autoComplete="off"
              className="w-full border-none"
              placeholder="태그를 입력해주세요."
            />
            {!!error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        )}
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        isLoading={isPending}
      >
        추가하기
      </Button>
    </form>
  );
}
