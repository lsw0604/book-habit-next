import {
  defaultMyBookCommentValues,
  myBookCommentSchema,
  MyBookCommentSchemaType,
} from '@/schemas/my-book-comment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function useMyBookCommentForm(
  initialPageParam: Pick<MyBookCommentSchemaType, 'myBookId'>
) {
  return useForm<MyBookCommentSchemaType>({
    defaultValues: initialPageParam ?? defaultMyBookCommentValues,
    resolver: zodResolver(myBookCommentSchema),
  });
}
