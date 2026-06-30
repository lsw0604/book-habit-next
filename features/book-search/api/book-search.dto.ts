import { ResponsePagination } from "@/shared/types";

export interface BookSummaryDTO {
  title: string;
  isbn: string;
  authors: string[];
  translators: string[];
  status: string;
  pubDate: string;
  publisher: string;
  thumbnail: string | null;
  description: string;
}

export interface BookSearchsDTO extends ResponsePagination<BookSummaryDTO> {}
  