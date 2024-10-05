import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  defaultMyBookTagValues,
  myBookTagSchema,
  MyBookTagSchemaType,
} from '@/schemas/my-book-tag.schema';

export default function useMyBookTagForm() {
  return useForm<MyBookTagSchemaType>({
    resolver: zodResolver(myBookTagSchema),
    defaultValues: defaultMyBookTagValues,
  });
}
