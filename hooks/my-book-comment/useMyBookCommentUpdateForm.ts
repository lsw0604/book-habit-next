import {
  defaultMyBookCommentUpdateValues,
  myBookCommentUpdateSchema,
  MyBookCommentUpdateSchemaType,
} from '@/schemas/my-book-comment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function useMyBookCommentUpdateForm(
  initialPageParam?: MyBookCommentUpdateSchemaType
) {
  return useForm<MyBookCommentUpdateSchemaType>({
    defaultValues: initialPageParam ?? defaultMyBookCommentUpdateValues,
    resolver: zodResolver(myBookCommentUpdateSchema),
  });
}
