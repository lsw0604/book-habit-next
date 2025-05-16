import Link from 'next/link';

export default function MyBookListLoginError() {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full bg-[rgba(0,0,0,0.05)] rounded-lg">
        <h1 className="text-xl font-bold text-gray-400">
          해당 페이지는 로그인이 필요합니다
        </h1>
        <Link
          className="text-xl font-bold text-gray-400 hover:underline"
          href="/login"
        >
          로그인하러가기
        </Link>
      </div>
    </div>
  );
}
