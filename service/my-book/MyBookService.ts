import { HTTPService } from '../http-service';

class MyBookService extends HTTPService {
  private readonly url = '/api/my-book';
  private static instance: MyBookService;

  private constructor(router?: any) {
    super(router);
  }

  public static getInstance(router?: any): MyBookService {
    if (MyBookService.instance) {
      MyBookService.instance = new MyBookService(router);
    } else if (router) {
      MyBookService.instance = new MyBookService(router);
    }

    return MyBookService.instance;
  }

  all({ status = 'ALL', page = 1, order = 'desc' }: RequestGetMyBookList) {
    return this.get<ResponseGetMyBookList>(
      `${this.url}?status=${status}&page=${page}&order=${order}`
    );
  }

  detail(myBookId: RequestGetMyBookDetail) {
    return this.get<ResponseGetMyBookDetail>(`${this.url}/${myBookId}`);
  }

  add(payload: RequestPostMyBook) {
    return this.post<ResponsePostMyBook>(
      `${this.url}`,
      JSON.stringify(payload)
    );
  }

  update(payload: RequestPutMyBook) {
    return this.put<ResponsePutMyBook>(
      `${this.url}/${payload.myBookId}`,
      JSON.stringify({
        myBookStatus: payload.myBookStatus,
        rating: payload.rating,
      })
    );
  }

  remove(myBookId: RequestDeleteMyBook) {
    return this.delete<ResponseDeleteMyBook>(`${this.url}/${myBookId}`);
  }
}

export const myBookService = MyBookService.getInstance();
export const useMyBookService = (router?: any) =>
  MyBookService.getInstance(router);
