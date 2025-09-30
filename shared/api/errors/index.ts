import { ErrorDTO } from '../dto';

export class APIError extends Error {
  public readonly statusCode: number;

  public readonly path: string;

  public readonly timestamp: string;

  constructor(dto: ErrorDTO) {
    super(dto.message);

    this.name = 'API Error';
    this.statusCode = dto.statusCode;
    this.path = dto.path;
    this.timestamp = dto.timestamp;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}
