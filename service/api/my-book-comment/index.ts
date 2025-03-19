import type {
  MyBookCommentService,
  RequestPostMyBookComment,
  RequestDeleteMyBookComment,
  RequestGetMyBookComments,
  RequestUpdateMyBookComment,
  ResponseDeleteMyBookComment,
  ResponseGetMyBookComments,
  ResponsePostMyBookComment,
  ResponseUpdateMyBookComment,
} from '@/service/api/my-book-comment/types';

import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';
import { isClient } from '@/lib/axios/constant';

let myBookCommentServiceInstance: MyBookCommentService | null = null;

export const createMyBookCommentService = (): MyBookCommentService => {
  if (isClient && myBookCommentServiceInstance) {
    return myBookCommentServiceInstance;
  }

  const client = axiosInstance;

  const service: MyBookCommentService = {
    postMyBookComment: async (payload: RequestPostMyBookComment) => {
      const response = await client.post<ResponsePostMyBookComment>(
        API_ENDPOINTS.MY_BOOK_COMMENT,
        payload
      );

      return response.data;
    },
    getMyBookComments: async ({ myBookId }: RequestGetMyBookComments) => {
      const response = await client.get<ResponseGetMyBookComments>(
        `${API_ENDPOINTS.MY_BOOK_COMMENT}/${myBookId}`
      );
      return response.data;
    },
    putMyBookComment: async ({
      id,
      isPublic,
      comment,
    }: RequestUpdateMyBookComment) => {
      const response = await client.put<ResponseUpdateMyBookComment>(
        `${API_ENDPOINTS.MY_BOOK_COMMENT}/${id}`,
        {
          isPublic,
          comment,
        }
      );
      return response.data;
    },
    deleteMyBookComment: async ({
      myBookCommentId,
    }: RequestDeleteMyBookComment) => {
      const response = await client.delete<ResponseDeleteMyBookComment>(
        `${API_ENDPOINTS.MY_BOOK_COMMENT}/${myBookCommentId}`
      );
      return response.data;
    },
  };

  if (isClient) {
    myBookCommentServiceInstance = service;
  }

  return service;
};
