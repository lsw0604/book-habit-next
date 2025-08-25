import { z } from 'zod';

import { myBookStatusSchema } from '@/entities/my-book/model';

import { AllFilterMyBookStatus, FilterMyBookOrder } from '../model';

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

export const filterMyBookSchema = z.object({
  order: orderSchema,
  status: statusSchema,
});

export type FilterMyBookType = z.infer<typeof filterMyBookSchema>;

export const DEFAULT_FILTER_MY_BOOK: FilterMyBookType = {
  order: FilterMyBookOrder.desc,
  status: 'ALL',
};
