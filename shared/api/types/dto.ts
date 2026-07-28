export interface ResponseDTO<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorDTO {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error?: string;
}
