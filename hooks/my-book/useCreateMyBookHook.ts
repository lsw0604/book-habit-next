import { useCallback, useEffect } from 'react';

import useCreateMyBookForm from '@/hooks/my-book/useCreateMyBookForm';
import useToastHook from '@/hooks/toast/useToastHook';
import { MyBookSchemaType } from '@/schemas/my-book.schema';
import useMutationCreateMyBook from '@/queries/my-book/useMutationCreateMyBook';
import { BOOK_FIELDS } from '@/constant/book-field';

type BookFieldType = (typeof BOOK_FIELDS)[number];

export default function useCreateMyBookHook(book: ReduxBookType) {
  const { errorToast, successToast } = useToastHook();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useCreateMyBookForm();
  const { mutate, isPending, isError, error, isSuccess } =
    useMutationCreateMyBook({
      title: book.title,
    });

  const onSubmit = useCallback(
    (data: MyBookSchemaType) => {
      mutate(data);
    },
    [mutate]
  );

  useEffect(() => {
    BOOK_FIELDS.forEach((field: BookFieldType) => setValue(field, book[field]));
  }, [book, setValue]);

  useEffect(() => {
    BOOK_FIELDS.forEach((field: BookFieldType) => {
      if (!!errors[field]?.message) {
        errorToast(errors[field].message);
      }
    });
  }, [errors, errorToast]);

  useEffect(() => {
    if (isError && error?.response && error?.response?.data) {
      errorToast(error.response.data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      successToast('나의서재에 등록하는데 성공했습니다.');
    }
  }, [isSuccess]);

  return {
    onSubmit,
    handleSubmit,
    isPending,
  };
}
