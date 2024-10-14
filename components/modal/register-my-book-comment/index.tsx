import { Controller } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

import useMyBookCommentForm from '@/hooks/my-book-comment/useMyBookCommentForm';
import useMyBookCommentMutation from '@/queries/my-book-comment/useMyBookCommentMutation';
import { MyBookCommentSchemaType } from '@/schemas/my-book-comment.schema';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function RegisterMyBookCommentModal() {
  const params = useParams();
  const router = useRouter();
  const { my_books_id: myBookId } = params;

  const { addMyBookComment } = useMyBookCommentMutation();
  const { mutate, isPending } = addMyBookComment();
  const { handleSubmit, control } = useMyBookCommentForm({
    myBookId: Number(myBookId),
  });

  const onSubmit = (data: MyBookCommentSchemaType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="comment"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <Label>Textarea</Label>
            <Textarea {...field} maxLength={256} />
          </div>
        )}
      />
    </form>
  );
}
