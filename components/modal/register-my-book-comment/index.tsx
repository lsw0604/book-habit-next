import React from 'react';
import { Globe2Icon } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Textarea from '@/components/common/textarea';
import { ErrorMessage } from '@/components/common/error-message';
import { useAppDispatch } from '@/store';
import { modalActions } from '@/store/features/modal/modal-action';
import useMyBookCommentForm from '@/hooks/my-book-comment/useMyBookCommentForm';
import useMyBookCommentMutation from '@/queries/my-book-comment/useMyBookCommentMutation';
import { MyBookCommentSchemaType } from '@/schemas/my-book-comment.schema';
import { Button } from '@/components/ui/button';

export default function RegisterMyBookCommentModal() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { my_book_id } = params;

  const { addMyBookComment } = useMyBookCommentMutation();
  const { mutate, isPending } = addMyBookComment();
  const { handleSubmit, control } = useMyBookCommentForm();

  const onSubmit = (data: MyBookCommentSchemaType) => {
    mutate(
      { myBookId: parseInt(my_book_id as string, 10), ...data },
      {
        onSuccess: () => {
          dispatch(
            modalActions.setModalState({ isOpen: false, type: undefined })
          );
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IsPublicController control={control} />
      <CommentController control={control} />
      <Button className="w-full" type="submit">
        등록하기
      </Button>
    </form>
  );
}

interface ControllerProps {
  control: Control<MyBookCommentSchemaType>;
}

const IsPublicController: React.FC<ControllerProps> = ({ control }) => {
  return (
    <Controller
      name="isPublic"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="relative mb-2 w-full flex gap-2">
          <Label className="w-full flex text-center gap-2 items-center">
            <Globe2Icon className="w-6 h-6" />
            <span className="text-sm text-muted-foreground">
              {value ? '공개' : '비공개'}
            </span>
          </Label>
          <Switch onCheckedChange={onChange} checked={value} />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

const CommentController: React.FC<ControllerProps> = ({ control }) => {
  return (
    <Controller
      name="comment"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative mb-2 w-full">
          <Textarea
            {...field}
            className="min-h-[40vh]"
            placeholder="책을 읽고 느낀점을 한줄평으로 남겨주세요."
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};
