import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultMyBookListValues,
  myBookListSchema,
  MyBookListSchemaType,
} from '@/schemas/my-book-list.schema';

export default function useMyBookListForm(
  initialPageParam?: MyBookListSchemaType
) {
  return useForm<MyBookListSchemaType>({
    defaultValues: initialPageParam ?? defaultMyBookListValues,
    resolver: zodResolver(myBookListSchema),
  });
}
