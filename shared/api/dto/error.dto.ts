export interface ErrorDTO {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error?: string; // 일부 에러에서만 제공될 수 있음
}
