import { UseFormReset } from 'react-hook-form';
import { useMyBookTagMutation } from '@/service/my-book-tag/useMyBookTagService';
import { MyBookTagRegistrationSchemaType } from '../form/my-book-tag/schema/registration.schema';

interface UseMyBookTagFormSubmitProps {
  reset: UseFormReset<MyBookTagRegistrationSchemaType>;
  myBookId: number;
}

export default function useMyBookTagFormSubmit({
  reset,
  myBookId,
}: UseMyBookTagFormSubmitProps) {
  const {
    addMyBookTag: { mutate, isSuccess, isError, error, isPending },
  } = useMyBookTagMutation();

  const onSubmit = (data: MyBookTagRegistrationSchemaType) => {
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
