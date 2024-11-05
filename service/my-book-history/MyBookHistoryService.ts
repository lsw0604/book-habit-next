import { HTTPService } from '../http-service';

class MyBookHistoryService extends HTTPService {
  private readonly url = 'api/my-book-history';

  all(myBookId: RequestGetMyBookHistory) {
    return this.get<ResponseGetMyBookHistory>(`${this.url}/${myBookId}`);
  }

  create(payload: RequestRegisterMyBookHistory) {
    return this.post<ResponseRegisterMyBookHistory>(
      `${this.url}/${payload.myBookId}`,
      JSON.stringify({
        date: payload.date,
        page: payload.page,
        memo: payload.memo,
      })
    );
  }

  update(payload: RequestUpdateMyBookHistory) {
    return this.put<ResponseUpdateMyBookHistory>(
      `${this.url}/${payload.myBookHistoryId}`,
      JSON.stringify({
        date: payload.date,
        page: payload.page,
        memo: payload.memo,
      })
    );
  }

  remove(myBookHistoryId: RequestDeleteMyBookHistory) {
    return this.delete<ResponseDeleteMyBookHistory>(
      `${this.url}/${myBookHistoryId}`
    );
  }
}

export default new MyBookHistoryService();
