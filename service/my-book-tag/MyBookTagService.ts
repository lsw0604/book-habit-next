import { HTTPService } from '../http-service';

class MyBookTagService extends HTTPService {
  private readonly url = 'api/my-book-tag';

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

export default new MyBookTagService();
