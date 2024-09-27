import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultSearchValues, searchSchema, SearchSchemaType } from '@/schemas/search.schema';

export default function useSearchForm(initialPageParam?: SearchSchemaType) {
  return useForm<SearchSchemaType>({
    defaultValues: initialPageParam ?? defaultSearchValues,
    resolver: zodResolver(searchSchema),
  });
}
