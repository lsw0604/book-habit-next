'use client'

import { userSelector } from "@/entities/user"
import { useAppSelector } from "@/shared/redux"
import { SearchedBookLoginPrompt } from "./searched-book-login-prompt";
import { SearchedBookActiveActions } from "./searched-book-active-actions";

interface SearchedBookActionsProps {
  isbn: string;
}

export function SearchedBookActions ({ isbn }: SearchedBookActionsProps) {
  const { isAuthenticated } = useAppSelector(userSelector)

  if (!isAuthenticated) return <SearchedBookLoginPrompt isbn={isbn}/>

  return <SearchedBookActiveActions isbn={isbn} />;
}