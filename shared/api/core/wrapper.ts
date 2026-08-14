import {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
  isCancel,
} from 'axios';

import type { ResponseDTO, ErrorDTO } from '../types';
import { APIError } from '../types';

/**
 * 서비스가 axios를 몰라도 되도록 응답 봉투를 벗기고 에러를 APIError로 정규화한다.
 *
 * 정규화를 끝까지 하지 않으면(예: 응답 없는 실패를 그대로 흘려보내면)
 * 훅에 선언된 `APIError` 타입이 거짓이 되고, 결국 UI가 axios를 알아야 한다.
 */
async function handleRequest<T>(
  request: Promise<AxiosResponse<ResponseDTO<T>>>
): Promise<T> {
  try {
    const response = await request;

    return response.data.data;
  } catch (err) {
    /**
     * 취소(CanceledError)도 AxiosError를 상속하고 response가 없어서,
     * 걸러내지 않으면 네트워크 실패로 오인된다.
     * 이 프로젝트는 낙관적 뮤테이션마다 queryClient.cancelQueries()를 호출하므로
     * 정상적인 취소가 에러로 표시되면 안 된다 — 원본 그대로 통과시킨다.
     */
    if (!isCancel(err) && isAxiosError<ErrorDTO>(err)) {
      // 서버가 응답을 내려준 경우 — 응답 본문을 그대로 사용한다
      if (err.response) {
        throw new APIError(err.response.data);
      }
      // 응답 자체가 없는 경우 — 네트워크 단절·타임아웃·CORS 등
      throw APIError.network(err.config?.url);
    }

    throw err;
  }
}

export const createApiWrapper = (client: AxiosInstance) => ({
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    handleRequest(client.get<ResponseDTO<T>>(url, config)),
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    handleRequest(client.delete<ResponseDTO<T>>(url, config)),
  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    handleRequest(client.post<ResponseDTO<T>>(url, data, config)),
  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    handleRequest(client.patch<ResponseDTO<T>>(url, data, config)),
  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => handleRequest(client.put<ResponseDTO<T>>(url, data, config)),
});
