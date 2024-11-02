import dayjs from 'dayjs';
import { publicCommentParamsSchemaType } from '../schema/params.schema';

export const defaultPublicCommentValue: publicCommentParamsSchemaType = {
  pageSize: 10,
  startDate: dayjs().startOf('month').toDate(),
  endDate: dayjs().endOf('month').toDate(),
};
