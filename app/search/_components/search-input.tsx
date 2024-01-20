'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

export default function SearchInput() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');

  const onChangeKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    []
  );

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (keyword !== '')
      return router.push(`?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <form
      className="w-full flex px-4 py-0 flex-col relative"
      onSubmit={onSubmit}
    >
      <Input
        value={keyword}
        onChange={onChangeKeyword}
        className="rounded-xl"
        icon={<SearchIcon className="w-4 h-4" />}
      />
      <button hidden type="submit" />
    </form>
  );
}
