import { HTTPService } from '../http-service';

class MyBookCommentService extends HTTPService {
  private readonly url = 'api/my-book-comment';

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

export default new MyBookCommentService();
