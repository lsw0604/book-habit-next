'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useCommentsReplyRegisterMutation from '@/queries/comments/useCommentsReplyRegisterMutation';

interface CommentDetailReplyFormProps {
  comment_id: number;
}

const schema = z.object({
  reply: z.string().min(1, {
    message: '댓글을 입력해주세요.',
  }),
});

type InputType = z.infer<typeof schema>;

export default function CommentDetailReplyForm({
  comment_id,
}: CommentDetailReplyFormProps) {
  const [useValidation, setUseValidation] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted, isValid },
  } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading } = useCommentsReplyRegisterMutation(comment_id);

  const onSubmit = (data: InputType) => {
    mutate({ comment_id, body: data });
  };

  useUpdateEffect(() => {
    if (isSubmitted) {
      setUseValidation(true);
    }
  }, [isSubmitted]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-center justify-center flex-col"
    >
      <Textarea
        useValidation={useValidation}
        isValid={!isValid}
        errorMessage={errors.reply?.message}
        {...register('reply')}
      />
      <div className="w-full pt-4 flex justify-end">
        <Button type="submit" isLoading={isLoading} variant="default">
          등록하기
        </Button>
      </div>
    </form>
  );
}
