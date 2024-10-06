import { UseFormReset } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useMyBookTagMutation from '@/queries/my-book-tag/useMyBookTagMutation';
import useToastHook from '@/hooks/toast/useToastHook';
import { MyBookTagSchemaType } from '@/schemas/my-book-tag.schema';
import useErrorHandler from '@/hooks/error/useErrorHandler';

export default function useMyBookTagFormSubmit(
  reset: UseFormReset<MyBookTagSchemaType>
) {
  const params = useParams();
  const { my_book_id } = params;
  const { addMyBookTag } = useMyBookTagMutation();
  const { mutate, isSuccess, isError, error, isPending } = addMyBookTag();
  const { successToast } = useToastHook();

  const onSubmit = 
    (data: MyBookTagSchemaType) => {
      mutate(
        { myBookId: Number(my_book_id), tag: data.tag },
        {
          onSuccess: () => {
            reset({ tag: '' });
          },
        }
      );
    };

  useEffect(() => {
    if (isSuccess) {
      successToast('태그가 추가되었습니다.');
    }
  }, [isSuccess]);

  useErrorHandler(isError, error);

  return {
    onSubmit,
    isPending,
  };
}
