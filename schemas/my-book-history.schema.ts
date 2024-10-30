import dayjs from 'dayjs';
import { z } from 'zod';

export type MyBookHistorySchemaType = z.infer<typeof myBookHistorySchema>;

export const defaultMyBookHistoryValues: MyBookHistorySchemaType = {
  date: dayjs().toDate(),
  memo: '',
  page: 1,
};

export const myBookHistorySchema = z.object({
  date: z.date({ required_error: '날짜 값이 없습니다.' }),
  page: z.number().min(1, { message: '페이지 번호는 1 이상이어야 합니다.' }),
  memo: z.string().max(300, { message: '최대 300글자 이하 입력해주세요.' }),
});
