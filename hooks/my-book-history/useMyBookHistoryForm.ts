import {
  defaultMyBookHistoryValues,
  MyBookHistorySchemaType,
  myBookHistorySchema,
} from '@/schemas/my-book-history.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function useMyBookHistoryForm(
  initialPageProps?: MyBookHistorySchemaType
) {
  return useForm<MyBookHistorySchemaType>({
    defaultValues: initialPageProps ?? defaultMyBookHistoryValues,
    resolver: zodResolver(myBookHistorySchema),
  });
}
