import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultMyBookValues,
  myBookSchema,
  MyBookSchemaType,
} from '@/schemas/my-book.schema';

export default function useCreateMyBookForm() {
  return useForm<MyBookSchemaType>({
    defaultValues: defaultMyBookValues,
    resolver: zodResolver(myBookSchema),
  });
}
