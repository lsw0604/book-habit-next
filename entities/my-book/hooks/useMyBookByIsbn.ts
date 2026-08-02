import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { APIError } from "@/shared/api";

import { myBookQueryKeys, myBookService, type MyBookDetailDTO } from "../api"
import { toMyBookDetailViewModel } from "../lib";
import type { MyBookDetail } from "../model";

export const useMyBookIsbn = (isbn: string) => {
  const { findByIsbn } = myBookService;
  const queryClient = useQueryClient();

  return useQuery<MyBookDetailDTO | null, APIError, MyBookDetail | null>({
    queryKey: myBookQueryKeys.exist(isbn).queryKey,
    queryFn: async () => {
      const response = await findByIsbn(isbn);
      if (!response) return null;

      // 💡 [Cache Seeding] 뷰모델 중복 변환 연산 없이 DTO 원본 id를 직접 참조하여 주입
      queryClient.setQueryData(
        myBookQueryKeys.detail(response.id).queryKey,
        response
      );

      return response;
    },
    select: (response) => {
      if (!response) return null;
      return toMyBookDetailViewModel(response);
    },
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    enabled: !!isbn,
  })
}