import { SearchX } from 'lucide-react';

import { useBookSearchParams } from '@/entities/book';

export function BookSearchNotFound() {
  const { query } = useBookSearchParams();

  return (
    <div className="flex-1 w-full pb-4 fade-in-5 flex flex-col">
      <div className="flex flex-1 w-full flex-col items-center justify-center rounded-lg bg-slate-100 text-center">
        <SearchX className="h-16 w-16 mb-4 text-slate-400" strokeWidth={1.5} />
        <h2 className="text-xl font-bold text-slate-800">
          <strong className="rounded-md bg-slate-200 py-1 px-2 text-slate-700 font-bold">
            {query}
          </strong>
          <span className="block mt-2">에 대한 검색 결과가 없습니다.</span>
        </h2>
        <p className="mt-4 text-base text-slate-500 leading-relaxed">
          오타가 없는지 확인하거나
          <br />
          다른 검색어로 다시 검색해보세요.
        </p>
      </div>
    </div>
  );
}
