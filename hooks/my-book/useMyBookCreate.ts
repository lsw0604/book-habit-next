import { useCallback, useEffect } from 'react';

import useMyBookForm from '@/hooks/my-book/useMyBookForm';
import useToastHook from '@/hooks/toast/useToastHook';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import { MyBookSchemaType } from '@/schemas/my-book.schema';
import useMyBookMutation from '@/queries/my-book/useMyBookMutation';
import { BOOK_FIELDS, BookFieldType } from '@/constant/book-field';

export default function useMyBookCreate(book: ReduxBookType) {
  const { successToast } = useToastHook();
  const { addMyBook } = useMyBookMutation();
  const { mutate, isPending, isError, error, isSuccess } = addMyBook();
  const { handleSubmit, setValue, formState } = useMyBookForm();

  const onSubmit = useCallback(
    (data: MyBookSchemaType) => {
      mutate(data);
    },
    [mutate]
  );

  useEffect(() => {
    BOOK_FIELDS.forEach((field: BookFieldType) => setValue(field, book[field]));
  }, [book, setValue]);

  useErrorHandler(isError, error);

  useEffect(() => {
    if (isSuccess) {
      successToast('나의서재에 등록하는데 성공했습니다.');
    }
  }, [isSuccess]);

  return {
    onSubmit,
    handleSubmit,
    isPending,
    formState,
  };
}
