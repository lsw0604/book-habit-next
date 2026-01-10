import { z } from 'zod';

import { myBookStatusSchema } from '@/entities/my-book';

import { FILTER_BOOK_STATUS_OPTIONS } from './constants';
import { FilterMyBookOrder } from './types';

const orderSchema = z.nativeEnum(FilterMyBookOrder, {
  errorMap: () => ({
    message: '정렬 방식은 "오름차순" "내림차순" 이어야 합니다.',
  }),
});

const statusSchema = z.union([myBookStatusSchema, z.literal('ALL')], {
  errorMap: () => {
    // 굳이 객체를 새로 만들지 말고, UI용 상수를 재활용해서 메시지 생성
    const availableStatus = FILTER_BOOK_STATUS_OPTIONS.map(o => o.value).join(
      ', '
    );
    return {
      message: `검색 상태는 [${availableStatus}] 중 하나여야 합니다.`,
    };
  },
});

export const filterMyBookSchema = z.object({
  order: orderSchema,
  status: statusSchema,
});

export type FilterMyBookType = z.infer<typeof filterMyBookSchema>;

export const DEFAULT_FILTER_MY_BOOK: FilterMyBookType = {
  order: FilterMyBookOrder.desc,
  status: 'ALL',
};
