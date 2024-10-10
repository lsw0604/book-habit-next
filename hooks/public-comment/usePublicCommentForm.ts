import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  defaultPublicCommentValues,
  publicCommentSchema,
  PublicCommentSchemaType,
} from '@/schemas/public-comment.schema';

export default function usePublicCommentForm(
  initialPageParam?: PublicCommentSchemaType
) {
  return useForm<PublicCommentSchemaType>({
    defaultValues: initialPageParam ?? defaultPublicCommentValues,
    resolver: zodResolver(publicCommentSchema),
  });
}
