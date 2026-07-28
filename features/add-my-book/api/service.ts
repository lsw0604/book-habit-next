import { MyBookDetailDTO } from "@/entities/my-book";
import { API_ENDPOINTS, apiClient } from "@/shared/api";

export interface AddFinishedPayload {
  isbn: string;
  rating: number;
}

export interface AddMyBookService {
  addFinished: (payload: AddFinishedPayload) => Promise<MyBookDetailDTO>;
  addReading: (isbn: string) => Promise<MyBookDetailDTO>;
  addWantToRead: (isbn: string) => Promise<MyBookDetailDTO>;
};


export const addMyBookService: AddMyBookService = {
  addFinished: async (payload: AddFinishedPayload) => {
    const response = await apiClient.post<MyBookDetailDTO>(
      API_ENDPOINTS.MY_BOOK.FINISHED,
      payload
    );
    return response;
  },
  addReading: async (isbn: string) => {
    const response = await apiClient.post<MyBookDetailDTO>(
      API_ENDPOINTS.MY_BOOK.READING,
      { isbn }
    );
    return response;
  },
  addWantToRead: async (isbn: string) => {
    const response = await apiClient.post<MyBookDetailDTO>(
      API_ENDPOINTS.MY_BOOK.WANT_TO_READ,
      { isbn }
    );
    return response;
  },
}