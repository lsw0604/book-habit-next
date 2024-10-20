import React, { useRef } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Textarea from '@/components/common/textarea';
import { ErrorMessage } from '@/components/common/error-message';
import useToastHook from '@/hooks/toast/useToastHook';
import useMyBookCommentUpdateForm from '@/hooks/my-book-comment/useMyBookCommentUpdateForm';
import { useAppDispatch, useAppSelector } from '@/store';
import { myBookCommentActions } from '@/store/features/my-book-comment/my-book-comment-action';
import { myBookCommentSelector } from '@/store/features/my-book-comment/my-book-comment-selector';
import { MyBookCommentUpdateSchemaType } from '@/schemas/my-book-comment.schema';
import useMyBookCommentMutation from '@/queries/my-book-comment/useMyBookCommentMutation';

export default function MyBookCommentItemEdit() {
  const dispatch = useAppDispatch();
  const { successToast } = useToastHook();
  const { selectedComment } = useAppSelector(myBookCommentSelector);

  if (!selectedComment) return null;

  const { isPublic, comment, id } = selectedComment;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useMyBookCommentUpdateForm({
    id,
    isPublic,
    comment,
  });
  const { updateMyBookComment } = useMyBookCommentMutation();
  const { mutate, isPending } = updateMyBookComment();

  const cancelHandler = () => {
    dispatch(myBookCommentActions.setMyBookCommentEdit(false));
  };

  const onSubmit = (data: MyBookCommentUpdateSchemaType) => {
    console.log(data);
    mutate(
      { ...data },
      {
        onSuccess: (response) => {
          dispatch(myBookCommentActions.setMyBookComment(response));
          dispatch(myBookCommentActions.setMyBookCommentEdit(false));
          successToast('코멘트 수정에 성공했습니다.');
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 p-2 border-2 transition-all text-left text-sm w-full mb-1 rounded-md"
    >
      <MyBookCommentIsPublicController control={control} />
      <MyBookCommentCommentController control={control} />
      <div className="w-full h-10 flex">
        <div className="flex gap-4 ml-auto">
          <Button type="button" variant="ghost" onClick={cancelHandler}>
            취소하기
          </Button>
          <Button type="submit" variant="ghost" isLoading={isPending}>
            수정하기
          </Button>
        </div>
      </div>
      {errors.id?.message && <ErrorMessage>{errors.id.message}</ErrorMessage>}
    </form>
  );
}

interface ControllerProps {
  control: Control<MyBookCommentUpdateSchemaType>;
}

const MyBookCommentIsPublicController: React.FC<ControllerProps> = ({
  control,
}) => {
  return (
    <Controller
      name="isPublic"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <div className="flex w-full">
            <Switch checked={value} onCheckedChange={onChange} />
            <span className="text-sm font-semibold ml-2">
              {value ? '공개' : '비공개'}
            </span>
          </div>
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </>
      )}
    />
  );
};

const MyBookCommentCommentController: React.FC<ControllerProps> = ({
  control,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <Controller
      name="comment"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <div className="text-sm font-normal text-gray-800 cursor-pointer min-h-10">
            <Textarea {...field} ref={textareaRef} className="p-0" />
          </div>
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </>
      )}
    />
  );
};
