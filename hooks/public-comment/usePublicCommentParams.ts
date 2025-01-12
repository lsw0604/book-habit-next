import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { PublicCommentParamsSchemaType } from '../form/public-comment/schema/params.schema';
import { defaultPublicCommentValue } from '../form/public-comment/default/params';
import { parseParam } from '@/utils/params';

const MAX_SIZE = 50;
const MIN_SIZE = 10;

export default function usePublicCommentParams(): PublicCommentParamsSchemaType {
  const searchParams = useSearchParams();

  const sizeParser = (size: string) => {
    const num = parseInt(size, 10);
    if (isNaN(num)) return defaultPublicCommentValue.pageSize;
    return num >= MIN_SIZE && num <= MAX_SIZE
      ? num
      : defaultPublicCommentValue.pageSize;
  };

  const dateParser = (date: string, type: 'startDate' | 'endDate') => {
    const parsedDate = dayjs(date, 'YYYYMMDD', true);
    return parsedDate.isValid()
      ? parsedDate.toDate()
      : defaultPublicCommentValue[type];
  };

  return {
    pageSize: parseParam(
      searchParams,
      'pageSize',
      sizeParser,
      defaultPublicCommentValue.pageSize
    ),
    startDate: parseParam(
      searchParams,
      'start_date',
      (date) => dateParser(date, 'startDate'),
      defaultPublicCommentValue.startDate
    ),
    endDate: parseParam(
      searchParams,
      'end_date',
      (date) => dateParser(date, 'endDate'),
      defaultPublicCommentValue.endDate
    ),
  };
}
