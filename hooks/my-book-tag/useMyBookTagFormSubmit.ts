import { UseFormReset } from 'react-hook-form';
import useMyBookTagMutation from '@/queries/my-book-tag/useMyBookTagMutation';
import { MyBookTagSchemaType } from '@/schemas/my-book-tag.schema';

interface UseMyBookTagFormSubmitProps {
  reset: UseFormReset<MyBookTagSchemaType>;
  myBookId: number;
}

export default function useMyBookTagFormSubmit({
  reset,
  myBookId,
}: UseMyBookTagFormSubmitProps) {
  const { addMyBookTag } = useMyBookTagMutation();
  const { mutate, isSuccess, isError, error, isPending } = addMyBookTag();

  const onSubmit = (data: MyBookTagSchemaType) => {
    mutate(
      { myBookId, tag: data.tag },
      {
        onSuccess: () => {
          reset({ tag: '' });
        },
      }
    );
  };

  return {
    onSubmit,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
