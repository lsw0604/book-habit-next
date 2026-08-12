'use client';

import { useSession } from '@/entities/user';

import { SearchedBookActiveActions } from './searched-book-active-actions';
import { SearchedBookDeactiveAction } from './searched-book-deactive-action';

interface SearchedBookActionsProps {
  isbn: string;
}

export function SearchedBookActions({ isbn }: SearchedBookActionsProps) {
  const { data: user } = useSession();

  if (!user) return <SearchedBookDeactiveAction isbn={isbn} />;

  return <SearchedBookActiveActions isbn={isbn} />;
}
