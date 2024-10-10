import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import {
  defaultPublicCommentValues,
  PublicCommentSchemaType,
} from '@/schemas/public-comment.schema';
import { parseParam } from '@/utils/params';

const MAX_SIZE = 50;
const MIN_SIZE = 10;

export default function usePublicCommentParams(): PublicCommentSchemaType {
  const searchParams = useSearchParams();

  const sizeParser = (size: string) => {
    const num = parseInt(size, 10);
    if (isNaN(num)) return defaultPublicCommentValues.pageSize;
    return num >= MIN_SIZE && num <= MAX_SIZE
      ? num
      : defaultPublicCommentValues.pageSize;
  };

  const dateParser = (date: string, type: 'startDate' | 'endDate') => {
    const parsedDate = dayjs(date, 'YYYYMMDD', true);
    return parsedDate.isValid()
      ? parsedDate.toDate()
      : defaultPublicCommentValues[type];
  };

  return {
    pageSize: parseParam(
      searchParams,
      'pageSize',
      sizeParser,
      defaultPublicCommentValues.pageSize
    ),
    startDate: parseParam(
      searchParams,
      'start_date',
      (date) => dateParser(date, 'startDate'),
      defaultPublicCommentValues.startDate
    ),
    endDate: parseParam(
      searchParams,
      'end_date',
      (date) => dateParser(date, 'endDate'),
      defaultPublicCommentValues.endDate
    ),
  };
}
