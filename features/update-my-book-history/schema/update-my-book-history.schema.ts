import { z } from 'zod';

import {
  baseMyBookHistoryRefinement,
  baseMyBookHistorySchema,
} from '@/entities/my-book-history';

export const updateMyBookHistorySchema = baseMyBookHistorySchema
  .extend({
    id: z
      .number()
      .int()
      .positive({ message: '기록 ID는 필수이며, 양의 정수여야 합니다.' }),
  })
  .superRefine(baseMyBookHistoryRefinement);

export type UpdateMyBookHistoryType = z.infer<typeof updateMyBookHistorySchema>;

export type UpdateMyBookHistoryPayload = {
  id: number;
} & Partial<Omit<UpdateMyBookHistoryType, 'id'>>;