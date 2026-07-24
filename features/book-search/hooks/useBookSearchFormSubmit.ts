'use client'

import { useRouter } from "next/navigation";

import type { BookSearchParams } from "../schema";
import { useCallback } from "react";
import { bookSearchUrlBuilder } from "../lib";

export const useBookSearchFormSubmit = () => {
  const router = useRouter();

  const onSubmit = useCallback(
    (data: BookSearchParams) => {
      router.push(bookSearchUrlBuilder(data));
    },
    [router]
  );

  return {
    onSubmit
  }
}