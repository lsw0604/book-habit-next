import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  defaultMyBookUpdateValues,
  myBookUpdateSchema,
  MyBookUpdateSchemaType,
} from '@/schemas/my-book-update-schema';

interface UsePutMyBookFormProps {
  rating?: number;
  myBookStatus?: MyBookStatusType;
}

export default function usePutMyBookForm({
  rating = 0,
  myBookStatus,
}: UsePutMyBookFormProps) {
  return useForm<MyBookUpdateSchemaType>({
    resolver: zodResolver(myBookUpdateSchema),
    defaultValues: {
      rating: rating ?? defaultMyBookUpdateValues.rating,
      myBookStatus: myBookStatus ?? defaultMyBookUpdateValues.myBookStatus,
    },
  });
}
