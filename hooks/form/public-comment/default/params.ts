import dayjs from 'dayjs';
import { PublicCommentParamsSchemaType } from '../schema/params.schema';

export const defaultPublicCommentValue: PublicCommentParamsSchemaType = {
  pageSize: 10,
  startDate: dayjs().startOf('month').toDate(),
  endDate: dayjs().endOf('month').toDate(),
};
