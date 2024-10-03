import { getMyBookDetailAPI } from '@/service/my-book';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constant/queries-key';
import { AxiosError } from 'axios';

/**
 * 내 책 상세 정보를 조회하는 쿼리 훅
 *
 * 책 상세 정보는 일반적으로 자주 변경되지 않으므로, 이러한 캐싱 전략을 적용합니다.
 * - 제목, 저자, 출판사 등의 정보는 거의 변경되지 않습니다.
 * - 다른 정보들도 실시간으로 변경되지 않습니다.
 * - 오래된 데이터를 봐도 문제가 없지만, 너무 오래되면 안 됩니다.
 * - 서버에 자주 요청을 보내지 않도록 합니다.
 */
export default function useMyBookDetailQuery(myBookId: RequestGetMyBookDetail) {
  return useQuery<ResponseGetMyBookDetail, AxiosError<NestServerErrorType>>({
    queryKey: [queryKeys.myBook.getDetail(myBookId)],
    queryFn: () => getMyBookDetailAPI(myBookId),
    gcTime: 30 * 60 * 1000, // 30분
    staleTime: 10 * 60 * 1000, // 10분
  });
}
