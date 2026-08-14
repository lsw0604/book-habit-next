import { ErrorDTO } from './dto';

/** 응답을 받지 못한 실패에는 HTTP 상태가 없으므로 0을 쓴다 */
const NETWORK_ERROR_STATUS = 0;

export class APIError extends Error {
  public readonly statusCode: number;

  public readonly path: string;

  public readonly timestamp: string;

  /**
   * 서버 응답 자체를 받지 못한 경우(네트워크 단절·타임아웃·CORS·DNS 실패).
   * 이때 statusCode는 0이며, 서버가 내려준 메시지가 없으므로 클라이언트가 문구를 만든다.
   */
  public readonly isNetworkError: boolean;

  constructor(dto: ErrorDTO, isNetworkError = false) {
    super(dto.message);

    this.name = 'API Error';
    this.statusCode = dto.statusCode;
    this.path = dto.path;
    this.timestamp = dto.timestamp;
    this.isNetworkError = isNetworkError;

    Object.setPrototypeOf(this, APIError.prototype);
  }

  /** 응답을 받지 못한 실패를 APIError로 정규화한다 */
  static network(path = ''): APIError {
    return new APIError(
      {
        statusCode: NETWORK_ERROR_STATUS,
        message: '서버에 연결할 수 없습니다.\n네트워크 상태를 확인해주세요.',
        path,
        timestamp: new Date().toISOString(),
      },
      true
    );
  }
}
