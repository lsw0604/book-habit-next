'use client';

import Selector from '@/components/common/selector';
import { useRouter, useSearchParams } from 'next/navigation';

const SELECTOR_OPTIONS: SelectorBookType[] = [
  '전체보기',
  '다읽음',
  '읽고싶음',
  '읽는중',
];

export default function MyBookSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get('category')
    ? searchParams.get('category')
    : undefined;

  if (!category) return null;

  const onNavigate = (category?: string) => {
    router.push(`/my_books?category=${category}`);
  };

  return (
    <div className="p-4 sticky top-0">
      <div className="p-4 rounded-lg shadow-lg bg-white">
        <Selector
          options={SELECTOR_OPTIONS}
          value={category}
          onChange={(e) => onNavigate(e)}
        />
      </div>
    </div>
  );
}
