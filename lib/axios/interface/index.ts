export interface ResponseDto<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
}

export interface ErrorResponseDto {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error?: string; // 일부 에러에서만 제공될 수 있음
}
