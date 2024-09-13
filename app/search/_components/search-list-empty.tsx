interface SearchEmptyProps {
  keyword?: string;
}

export default function SearchListEmpty({ keyword }: SearchEmptyProps) {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="bg-[rgba(0,0,0,0.05)] w-full h-full rounded-lg flex justify-center items-center">
        {!keyword ? (
          <span className="flex text-lg text-slate-500">
            책 제목을 검색해주세요.
          </span>
        ) : (
          <span className="flex text-lg text-slate-500">
            <p className="text-lg text-cyan-300">{keyword}</p>에 대한 검색결과가
            없습니다.
          </span>
        )}
      </div>
    </div>
  );
}
