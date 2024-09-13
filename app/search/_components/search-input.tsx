'use client';

import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useSearchFormHook } from '@/hooks/search/useSearchFormHook';
import { SearchInputType } from '../types/input';

export default function SearchInput() {
  const router = useRouter();
  const { handleSubmit, register } = useSearchFormHook();

  const onSubmit = (data: SearchInputType) => {
    if (data.search.length !== 0) return router.push(`?keyword=${data.search}`);
  };

  return (
    <form
      className="w-full flex px-4 py-0 flex-col relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register('search')}
        className="rounded-full"
        icon={<SearchIcon className="w-4 h-4" />}
      />
      <button hidden type="submit" />
    </form>
  );
}
