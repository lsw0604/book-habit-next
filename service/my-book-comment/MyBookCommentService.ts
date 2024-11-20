import { HTTPService } from '../http-service';

class MyBookCommentService extends HTTPService {
  private readonly url = 'api/my-book-comment';
  private static instance: MyBookCommentService;

  private constructor(router?: any) {
    super(router);
  }

  public static getInstance(router?: any) {
    if (MyBookCommentService.instance) {
      MyBookCommentService.instance = new MyBookCommentService(router);
    } else if (router) {
      MyBookCommentService.instance = new MyBookCommentService(router);
    }

    return MyBookCommentService.instance;
  }

  all(myBookId: RequestGetMyBookCommentList) {
    return this.get<ResponseGetMyBookCommentList>(`${this.url}/${myBookId}`);
  }

  create(payload: RequestPostMyBookComment) {
    return this.post<ResponsePostMyBookComment>(
      `${this.url}/${payload.myBookId}`,
      JSON.stringify({ comment: payload.comment, isPublic: payload.isPublic })
    );
  }

  update(payload: RequestUpdateMyBookComment) {
    return this.put<ResponseUpdateMyBookComment>(
      `${this.url}/${payload.id}`,
      JSON.stringify({ comment: payload.comment, isPublic: payload.isPublic })
    );
  }

  remove(myBookCommentId: RequestDeleteMyBookComment) {
    return this.delete<ResponseDeleteMyBookComment>(
      `${this.url}/${myBookCommentId}`
    );
  }
}

export const myBookCommentService = MyBookCommentService.getInstance();
export const useMyBookCommentService = (router?: any) =>
  MyBookCommentService.getInstance(router);
