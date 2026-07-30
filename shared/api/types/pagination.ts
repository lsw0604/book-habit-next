export interface PaginationMeta {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  nextPage?: number;
  prevPage?: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ResponsePagination<T> {
  meta: PaginationMeta;
  items: T[];
}
