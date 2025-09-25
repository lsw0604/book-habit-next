'use client';

import Link from 'next/link';

import { CharacterSad } from '@/shared/assets';
import { Button } from '@/shared/ui/button';
import { PageContainer } from '@/shared/ui/page-container'; // 공통 페이지 컨테이너

export default function NotFound() {
  return (
    <PageContainer>
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        {/* 메인 콘텐츠 카드 */}
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8">
          {/* 왼쪽: 404 숫자 및 텍스트 */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-extrabold text-slate-800 mb-2">
              404
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-4 font-semibold break-words">
              페이지를 찾을 수 없어요! 😥
            </p>
            <p className="text-md md:text-lg text-slate-500 mb-8 break-words">
              요청하신 페이지를 찾을 수 없습니다.{' '}
              <br className="hidden sm:block" />
              주소를 다시 확인하시거나, 아래 버튼을 이용해 주세요.
            </p>

            {/* 액션 버튼 그룹 */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href="/" passHref>
                <Button variant="none">홈으로 가기</Button>
              </Link>
              {/* 검색 페이지가 있다면 활성화하세요. */}
              {/* <Link href="/search" passHref>
                <button className="bg-gray-200 hover:bg-gray-300 text-slate-700 font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-full sm:w-auto">
                  검색하기
                </button>
              </Link> */}
            </div>

            {/* 추가적인 도움 링크 (선택 사항) */}
            <div className="mt-8 text-sm text-slate-400 flex items-center justify-center md:justify-start gap-4">
              <Link href="/contact" className="hover:underline">
                문의하기
              </Link>
              <Link href="/help" className="hover:underline">
                도움말 보기
              </Link>
            </div>
          </div>

          {/* 오른쪽: 캐릭터 이미지 */}
          <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
            <CharacterSad className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
