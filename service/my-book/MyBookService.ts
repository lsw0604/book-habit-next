import { HTTPService } from '../http-service';

class MyBookService extends HTTPService {
  private readonly url = '/api/my-book';

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
      JSON.stringify({ status: payload.myBookStatus, rating: payload.rating })
    );
  }

  remove(myBookId: RequestDeleteMyBook) {
    return this.delete<ResponseDeleteMyBook>(`${this.url}/${myBookId}`);
  }
}

export default new MyBookService();
