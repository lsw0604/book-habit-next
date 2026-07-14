'use client'

import { userSelector } from "@/entities/user"
import { useAppSelector } from "@/shared/redux"
import { SearchedBookDeactiveActions } from "./searched-book-deactive-action";
import { SearchedBookActiveActions } from "./searched-book-active-actions";

interface SearchedBookActionsProps {
  isbn: string;
}

export function SearchedBookActions({ isbn }: SearchedBookActionsProps) {
  const { isAuthenticated } = useAppSelector(userSelector)

  if (!isAuthenticated) return <SearchedBookDeactiveActions isbn={isbn} />

  return <SearchedBookActiveActions isbn={isbn} />;
}