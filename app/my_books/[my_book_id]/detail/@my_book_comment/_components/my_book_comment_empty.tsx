export default function MyBookCommentEmpty() {
  return (
    <li className="snap-start h-[264px] transition-all">
      <div className="flex w-full rounded-md h-full items-center justify-center bg-[rgba(0,0,0,0.05)]">
        <span className="text-slate-600 font-bold text-lg">
          저장된 Comment가 없습니다.
        </span>
      </div>
    </li>
  );
}
