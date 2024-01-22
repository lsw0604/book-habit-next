'use client';

import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function CommentDetailReplyForm() {
  const [value, setValue] = useState<string>('');

  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex items-center justify-center flex-col"
    >
      <Textarea value={value} onChange={onChange} />
      <div className="w-full pt-4 flex justify-end">
        <Button className="bg-slate-100 hover:bg-slate-200" variant="ghost">
          등록하기
        </Button>
      </div>
    </form>
  );
}
