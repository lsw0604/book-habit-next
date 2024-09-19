import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  searchSchema,
  SearchType,
  defaultSearchValues,
} from '@/schemas/search.schema';

export function useSearchFormHook() {
  return useForm<SearchType>({
    resolver: zodResolver(searchSchema),
    mode: 'onSubmit',
    defaultValues: defaultSearchValues,
  });
}
