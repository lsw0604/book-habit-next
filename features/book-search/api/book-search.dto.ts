import { BookSummaryDTO } from "@/entities/book";
import { ResponsePagination } from "@/shared/api";

export interface BookSearchsDTO extends ResponsePagination<BookSummaryDTO> { }
