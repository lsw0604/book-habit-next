import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultMyBookListValues,
  myBookListSchema,
  MyBookListSchemaType,
} from '@/schemas/my-book-list.schema';

export default function useGetMyBookForm() {
  return useForm<MyBookListSchemaType>({
    defaultValues: defaultMyBookListValues,
    resolver: zodResolver(myBookListSchema),
  });
}
