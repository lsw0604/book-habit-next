import { FetchService } from '../fetch-service';

class SearchService extends FetchService {
  constructor() {
    super('https://dapi.kakao.com', {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
    });
  }

  public async searchBook(
    params: RequestSearchBook
  ): Promise<ResponseSearchBook> {
    const {
      query,
      sort = 'accuracy',
      page = 1,
      size = 10,
      target = 'title',
    } = params;
    return this.get<ResponseSearchBook>(
      `/v3/search/book?query=${query}&sort=${sort}&page=${page}&size=${size}&target=${target}`
    );
  }
}

export default new SearchService();
