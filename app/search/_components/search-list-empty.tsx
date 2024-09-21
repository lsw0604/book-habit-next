import { SearchSchemaType } from '@/schemas/search.schema';
import { useSearchParams } from 'next/navigation';

export default function SearchListEmpty() {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';
  const target =
    (searchParams.get('target') as SearchSchemaType['target']) || 'title';

  const targetFn = (target: SearchSchemaType['target']) => {
    switch (target) {
      case 'isbn':
        return 'ISBN(을)를 검색해주세요.';
      case 'person':
        return '작가명(을)를 검색해주세요.';
      case 'publisher':
        return '출판사명(을)를 검색해주세요.';
      default:
        return '책 제목(을)를 검색해주세요.';
    }
  };

  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="bg-[rgba(0,0,0,0.05)] w-full h-full rounded-lg flex justify-center items-center text-slate-500 text-lg">
        {!query ? (
          <span className="flex">{targetFn(target)}</span>
        ) : (
          <div>
            {targetFn(target)}
            <p className="text-slate-700 font-bold">{query}</p>에 대한
            검색결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
