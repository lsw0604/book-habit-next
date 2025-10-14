import { Search } from 'lucide-react';

export function BookSearchEmptyQuery() {
  return (
    <div className="w-full h-full pb-4 fade-in-5">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-slate-100 text-center">
        <Search className="h-16 w-16 mb-4 text-slate-400" strokeWidth={1.5} />
        <h2 className="text-xl font-bold text-slate-800">
          <span className="block mt-2">검색어를 입력해주세요.</span>
        </h2>
        <p className="mt-4 text-base text-slate-500 leading-relaxed">
          찾고 싶은 도서의 제목, 저자, 출판사 등을
          <br />
          입력하여 검색해보세요.
        </p>
      </div>
    </div>
  );
}
