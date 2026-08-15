import { Skeleton } from '@/shared/ui/skeleton';

/**
 * BookViewCompound의 배치를 그대로 흉내낸다.
 * 치수가 어긋나면 데이터가 도착하는 순간 레이아웃이 튀므로,
 * 표지 크기와 각 블록의 여백은 book-view-compound.tsx와 함께 움직여야 한다.
 */

/** 작가 / 역자 / 출판일 / 출판사 / 책 페이지 5행 */
const INFO_ROWS = [
  { label: 'w-10', value: 'w-24' },
  { label: 'w-10', value: 'w-20' },
  { label: 'w-12', value: 'w-28' },
  { label: 'w-12', value: 'w-24' },
  { label: 'w-16', value: 'w-16' },
];

const DESCRIPTION_LINES = ['w-full', 'w-full', 'w-[92%]', 'w-[70%]'];

function MyBookIdentityLoader() {
  return (
    <>
      {/* 표지 — BookViewCompound.Thumbnail */}
      <Skeleton className="mb-6 h-[348px] w-[250px] flex-shrink-0 rounded-lg" />

      {/* 제목 + 정보 목록 — BookViewCompound.MainInfo */}
      <div className="w-full">
        <Skeleton className="mx-auto mb-6 h-8 w-3/4" />

        <div className="mb-8 space-y-3.5 rounded-xl bg-gray-50 p-5">
          {INFO_ROWS.map(row => (
            <div key={row.label + row.value} className="flex justify-between">
              <Skeleton className={`h-5 ${row.label}`} />
              <Skeleton className={`h-5 ${row.value}`} />
            </div>
          ))}
        </div>
      </div>

      {/* 액션 — BookViewCompound.Actions */}
      <div className="mb-8 flex w-full justify-center gap-3">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </>
  );
}

function MyBookDescriptionLoader() {
  return (
    <div className="mt-4 w-full">
      <Skeleton className="mb-3 h-6 w-28" />
      <div className="min-h-20 space-y-2.5 rounded-xl border border-gray-100 bg-gray-100 p-4">
        {DESCRIPTION_LINES.map(width => (
          <Skeleton key={width} className={`h-4 ${width}`} />
        ))}
      </div>
    </div>
  );
}

export function MyBookDetailLoader() {
  return (
    <div className="flex w-full flex-col items-center p-2">
      <MyBookIdentityLoader />
      <MyBookDescriptionLoader />
    </div>
  );
}
