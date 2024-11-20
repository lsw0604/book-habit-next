import { HTTPService } from '../http-service';

class MyBookTagService extends HTTPService {
  private readonly url = 'api/my-book-tag';
  private static instance: MyBookTagService;

  private constructor(router?: any) {
    super(router);
  }

  public static getInstance(router?: any) {
    if (MyBookTagService.instance) {
      MyBookTagService.instance = new MyBookTagService(router);
    } else if (router) {
      MyBookTagService.instance = new MyBookTagService(router);
    }

    return MyBookTagService.instance;
  }

  create(payload: RequestRegisterMyBookTag) {
    return this.post<ResponseRegisterMyBookTag>(
      `${this.url}/${payload.myBookId}`,
      JSON.stringify({
        tag: payload.tag,
      })
    );
  }

  remove(myBookTagId: RequestDeleteMyBookTag) {
    return this.delete<ResponseDeleteMyBookTag>(`${this.url}/${myBookTagId}`);
  }
}

export const myBookTagService = MyBookTagService.getInstance();
export const useMyBookTagService = (router?: any) =>
  MyBookTagService.getInstance(router);
