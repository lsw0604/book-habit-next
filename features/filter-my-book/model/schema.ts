import { z } from 'zod';

import { myBookStatusSchema } from '@/entities/my-book/model';

import {
  AllFilterMyBookStatus,
  FilterMyBookOrder,
} from './filter-my-book.model';

const orderSchema = z.nativeEnum(FilterMyBookOrder, {
  errorMap: () => ({
    message: '정렬 방식은 "오름차순" "내림차순" 이어야 합니다.',
  }),
});

const statusSchema = z.union([myBookStatusSchema, z.literal('ALL')], {
  errorMap: () => {
    const availableStatus = Object.values(AllFilterMyBookStatus).join(', ');
    return {
      message: `검색 상태는 [${availableStatus}] 중 하나여야 합니다.`,
    };
  },
});

export const myBookFilterSchema = z.object({
  order: orderSchema,
  status: statusSchema,
});

export type MyBookFilterType = z.infer<typeof myBookFilterSchema>;

export const DEFAULT_MY_BOOK_FILTER: MyBookFilterType = {
  order: FilterMyBookOrder.desc,
  status: 'ALL',
};
