'use client';

import TagForm from './_components/tag-form';

export default function RegisterTagModal() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl font-bold">태그를 등록해주세요.</h1>
      <TagForm />
    </div>
  );
}
