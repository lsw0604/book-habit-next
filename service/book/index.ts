export const bookSearchAPI = async ({
  query,
  sort = 'accuracy',
  page = 1,
  size = 10,
  target = 'title',
}: RequestBookSearch): Promise<ResponseBookSearch> => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?query=${query}&sort=${sort}&page=${page}&size=${size}&target=${target}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
        },
      }
    );

    if (!response.ok) throw new Error('response error');

    const data = await response.json();

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
