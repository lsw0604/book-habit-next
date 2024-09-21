import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { searchSchema, SearchSchemaType } from '@/schemas/search.schema';

export default function useSearchForm(param: SearchSchemaType) {
  return useForm<SearchSchemaType>({
    defaultValues: {
      ...param,
    },
    resolver: zodResolver(searchSchema),
  });
}
