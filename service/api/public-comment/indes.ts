import type {
  PublicCommentService,
  RequestPublicComments,
  ResponsePublicComments,
} from './types';

import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';
import { isClient } from '@/lib/axios/constant';

let publicCommentServiceInstance: PublicCommentService | null = null;

export const createPublicCommentService = (): PublicCommentService => {
  if (isClient && publicCommentServiceInstance) {
    return publicCommentServiceInstance;
  }

  const client = axiosInstance;

  const service: PublicCommentService = {
    getPublicComments: async (params: RequestPublicComments) => {
      const response = await client.get<ResponsePublicComments>(
        API_ENDPOINTS.PUBLIC_COMMENT,
        { params }
      );

      return response.data;
    },
  };

  if (isClient) {
    publicCommentServiceInstance = service;
  }

  return service;
};

export const publicCommentService = (): PublicCommentService => {
  return createPublicCommentService();
};
