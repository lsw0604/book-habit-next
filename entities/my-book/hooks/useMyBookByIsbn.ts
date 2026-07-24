import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MyBookDetailDTO, myBookService } from "../api"
import { AxiosError } from "axios";
import { ErrorDTO } from "@/shared/api/dto";
import { queryKeys } from "@/shared/query";
import { toMyBookDetailViewModel } from "../lib";
import { MyBookDetail } from "../model";

export const useMyBookIsbn = (isbn: string) => {
  const { findByIsbn } = myBookService;
  const queryClient = useQueryClient();

  return useQuery<MyBookDetailDTO | null, AxiosError<ErrorDTO>, MyBookDetail | null>({
    queryKey: queryKeys.myBook.exist(isbn).queryKey,
    queryFn: async () => {
      const response = await findByIsbn(isbn);
      if (!response) return null;

      // 💡 [Cache Seeding] 뷰모델 중복 변환 연산 없이 DTO 원본 id를 직접 참조하여 주입
      queryClient.setQueryData(
        queryKeys.myBook.detail(response.id).queryKey,
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