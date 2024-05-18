type MutationResponse = {
  message: string;
  status: 'error' | 'info' | 'success' | 'warning' | '';
};

// useMyBookCommentQuery의 타입들

type MyBookCommentQueryResponseType = {
  comments: MyBookCommentQueryListType;
};
type MyBookCommentQueryListType = MyBookCommentQueryItemType[];
type MyBookCommentQueryItemType = {
  comment_id: number;
  comment: string;
  comment_is_open: boolean;
  status: '읽는중' | '읽기전' | '다읽음';
  rating: number;
  created_at: string;
  updated_at?: string;
};
type MyBookCommentQueryRequestType = number;

// useMyBookCommentDeleteMutation의 타입들
type MyBookCommentDeleteMutationResponseType = MutationResponse;
type MyBookCommentDeleteMutationRequestType = number;

// useMyBookHistoryDeleteMutation의 타입들
type MyBookHistoryDeleteMutationResponseType = MutationResponse;
type MyBookHistoryDeleteMutationRequestType = number;

// useMyBookListInfinityQuery의 타입들
type MyBookListInfinityQueryResponseType = {
  nextPage: number;
  books: MyBookListInfinityQueryItemType[];
};

type MyBookListInfinityQueryItemType = Pick<
  BooksType,
  'isbn' | 'thumbnail' | 'title'
> & {
  id: number;
  status?: '다읽음' | '읽기시작함' | '읽고싶음' | '읽는중';
  date?: string;
};

// useMyBookCommentUpdateMutation의 타입들
type MyBookCommentUpdateMutationResponseType = MutationResponse;
type MyBookCommentUpdateMutationRequestType = {
  comment_id: MyBookCommentUpdateMutationCommentIdType;
  body: MyBookCommentUpdateMutationBodyType;
};
type MyBookCommentUpdateMutationCommentIdType = number;
type MyBookCommentUpdateMutationBodyType = {
  rating: number;
  comment: string;
};

// useMyBookHistoryMutation의 타입들
type MyBookHistoryMutationResponseType = MutationResponse;
type MyBookHistoryMutationRequestType = {
  status: '다읽음' | '읽는중' | '읽기시작함';
  date: Date;
  users_books_id: number;
};

// useMyBookListDeleteMutation의 타입들
type MyBookListDeleteMutationResponseType = MutationResponse;
type MyBookListDeleteMutationRequestType = number;

// useMyBookCommentMutation의 타입들

type MyBookCommentMutationResponseType = MutationResponse;
type MyBookCommentMutationRequestType = {
  status: string;
  rating: number;
  comment: string;
  comment_is_open: boolean;
  users_books_id: number;
};

/**
 * TODO: type 정리하기
 * * MyBookPageQueriesInfoResponseType
 * * MyBookPageQueriesInfoResultType
 * * MyBookPageQueriesInfoRequestType
 */

// useMyBookPageQueries의 타입들

// myBook INFO
type MyBookPageQueriesInfoResponseType = {
  result: MyBookPageQueriesInfoResultType;
};

type MyBookDetailInfoQueryResponseType = {
  result: MyBookDetailInfoResultType;
};

type MyBookPageQueriesInfoResultType = {
  title: string;
  thumbnail?: string;
  url: string;
  contents: string;
  publisher: string;
  authors: string;
};

type MyBookDetailInfoResultType = {
  title: string;
  thumbnail?: string;
  url: string;
  contents: string;
  publisher: string;
  authors: string;
};

type MyBookPageQueriesInfoRequestType = number;

type MyBookDetailInfoQueryRequestType = number;

// history LIST
type MyBookHistoryListResponseType = {
  // books: MyBookPageQueriesHistoryListType;
  history: Record<string, MyBookHistoryListType>;
  start_date: Date;
  end_date: Date;
};
type MyBookHistoryListType = MyBookHistoryItemType[];

type MyBookHistoryItemType = {
  id: number;
  status: '읽기시작함' | '다읽음' | '읽고싶음' | '읽는중';
  date: string;
  page: number | null;
  created_at: string;
  updated_at: string | null;
};
type MyBookHistoryListRequestType = number;
