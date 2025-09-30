export interface ResponseDTO<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
