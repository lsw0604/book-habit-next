import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, SearchType } from '@/schemas/search.schema';

export function useSearchFormHook() {
  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SearchType>({
    resolver: zodResolver(searchSchema),
    mode: 'onSubmit',
    defaultValues: {
      search: '',
      size: 10,
      sort: 'accuracy',
      target: 'title',
    },
  });

  return {
    handleSubmit,
    register,
    errors,
  };
}
