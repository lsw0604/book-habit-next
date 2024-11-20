import { HTTPService } from '../http-service';

class PublicCommentService extends HTTPService {
  private readonly url = 'api/public-comment';
  private static instance: PublicCommentService;

  private constructor(router?: any) {
    super(router);
  }

  public static getInstance(router?: any) {
    if (PublicCommentService.instance) {
      PublicCommentService.instance = new PublicCommentService(router);
    } else if (router) {
      PublicCommentService.instance = new PublicCommentService(router);
    }

    return PublicCommentService.instance;
  }

  private validatePayload(payload: RequestGetPublicCommentList) {
    const { page, page_size, start_date, end_date } = payload;
    if (page && page < 1) throw new Error('page는 1보다 작을 수 없습니다.');
    if (page_size && (page_size < 1 || page_size > 50))
      throw new Error('pageSize는 1보다 작거나 50보다 클 수 없습니다.');
    if (start_date && end_date && new Date(start_date) > new Date(end_date))
      throw new Error('시작일은 종료일 보다 늦을 수 없습니다.');
  }

  private cleanPayload(
    payload: RequestGetPublicCommentList
  ): Record<string, string> {
    return Object.entries(payload).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>);
  }

  all(payload: RequestGetPublicCommentList) {
    this.validatePayload(payload);
    const cleanPayload = this.cleanPayload(payload);
    const params = new URLSearchParams(cleanPayload).toString();
    const url = `${this.url}${params ? `?${params}` : ''}`;

    return this.get<ResponseGetPublicCommentList>(url);
  }
}

export const publicCommentService = PublicCommentService.getInstance();
export const usePublicCommentService = (router?: any) =>
  PublicCommentService.getInstance(router);
