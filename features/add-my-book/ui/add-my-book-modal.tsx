'use client';

import {
  BookCardAuthor,
  BookCardContent,
  BookCardImage,
  BookCardISBN,
  BookCardPrice,
  BookCardPublisher,
  BookCardTitle,
} from '@/entities/book';
import type { AddMyBookProps } from '@/entities/modal';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';

import { useAddMyBookForm, useAddMyBookFormSubmit } from '../hooks';

export function AddMyBookModal({ selectedBook }: AddMyBookProps) {
  const { onSubmit, isPending } = useAddMyBookFormSubmit();
  const { handleSubmit } = useAddMyBookForm({ ...selectedBook });

  const disabled = selectedBook.isbns.length === 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="shadow-none border-none">
        <CardContent className="flex gap-4">
          <BookCardImage book={selectedBook} />
          <div className="flex flex-col flex-grow space-y-2">
            <BookCardTitle
              book={selectedBook}
              className="text-lg font-semibold"
            />
            <Separator />
            <div className="space-y-1 text-sm">
              <BookCardISBN book={selectedBook} />
              <BookCardAuthor book={selectedBook} />
              <BookCardPublisher book={selectedBook} />
              <BookCardPrice book={selectedBook} />
            </div>
            <Separator />
          </div>
        </CardContent>
        <CardFooter>
          <BookCardContent
            book={selectedBook}
            className="text-sm text-muted-foreground"
          />
        </CardFooter>
      </Card>
      <div className="py-4 px-6">
        <Button
          type="submit"
          className="w-full"
          isLoading={isPending}
          disabled={disabled}
        >
          내 서재에 등록하기
        </Button>
      </div>
    </form>
  );
}
