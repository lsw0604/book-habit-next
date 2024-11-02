import { InfoIcon } from 'lucide-react';

interface SearchListNotFoundProps {
  query?: string;
}

export default function SearchListNotFound({ query }: SearchListNotFoundProps) {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="bg-[rgba(0,0,0,0.05)] w-full h-full rounded-lg flex justify-center items-center text-slate-500 text-lg">
        {!query ? (
          <span className="flex">찾고싶은 내용을 검색해주세요.</span>
        ) : (
          <h1 className="px-10 pb-10">
            <div className="w-full flex justify-center mb-2">
              <InfoIcon className="w-12 h-12" />
            </div>
            <span className="text-slate-600 font-bold text-lg mr-2">
              {query}
            </span>
            에 대한 검색결과가 없습니다.
          </h1>
        )}
      </div>
    </div>
  );
}
