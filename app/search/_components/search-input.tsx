'use client';

import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';

const schema = z.object({
  search: z.string().min(1, {
    message: '검색어를 입력해주세요.',
  }),
});

type InputType = z.infer<typeof schema>;

export default function SearchInput() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: InputType) => {
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
