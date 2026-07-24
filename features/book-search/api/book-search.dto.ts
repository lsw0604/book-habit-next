import { BookSummaryDTO } from "@/entities/book";
import { ResponsePagination } from "@/shared/types";

export interface BookSearchsDTO extends ResponsePagination<BookSummaryDTO> { }
