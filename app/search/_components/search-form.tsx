'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, FormEventHandler, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import SearchPopover from './search-popover';
import { useSearchFormHook } from '@/hooks/search/useSearchFormHook';
import { ListFilterIcon } from 'lucide-react';
import { SearchType } from '@/schemas/search.schema';

export default function SearchForm() {
  const router = useRouter();
  const { handleSubmit, register, errors } = useSearchFormHook();

  const [] = useState();

  const onSubmit = (data: SearchType) => {
    console.log(data);
  };

  return (
    <form
      className="w-full flex px-4 relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input className="rounded-full mr-2" {...register('search')} />
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded-full" variant="ghost">
            <ListFilterIcon className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 mr-4">
          <SearchPopover register={register} />
        </PopoverContent>
      </Popover>
    </form>
  );
}
