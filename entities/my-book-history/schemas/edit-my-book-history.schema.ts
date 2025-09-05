import { z } from 'zod';

import {
  baseMyBookHistoryRefinement,
  baseMyBookHistorySchema,
} from './base-my-book-history.schema';

export const editMyBookHistorySchema = baseMyBookHistorySchema
  .extend({
    id: z
      .number()
      .int()
      .positive({ message: '기록 ID는 필수이며, 양의 정수여야 합니다.' }),
  })
  .superRefine(baseMyBookHistoryRefinement);

export type EditMyBookHistoryType = z.infer<typeof editMyBookHistorySchema>;
