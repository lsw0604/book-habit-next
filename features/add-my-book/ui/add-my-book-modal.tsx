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
import { RegisterMyBookProps } from '@/entities/modal/store';
import { CARD_STYLES } from '@/shared/style/card-style';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { cn } from '@/shared/utils/class-name';

import { useAddMyBookForm, useAddMyBookFormSubmit } from '../hooks';

export function AddMyBookModal({ selectedBook }: RegisterMyBookProps) {
  const { onSubmit, isPending } = useAddMyBookFormSubmit();
  const { handleSubmit } = useAddMyBookForm({ ...selectedBook });

  const disabled = selectedBook.isbns.length === 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div className="w-full text-left">
          <BookCardImage book={selectedBook} />
          <div
            className={cn(
              CARD_STYLES.contentWrapper,
              'p-1 ml-2 pl-2 bg-gray-100 rounded-md'
            )}
          >
            <BookCardTitle book={selectedBook} />
            <BookCardISBN book={selectedBook} />
            <BookCardAuthor book={selectedBook} />
            <BookCardPublisher book={selectedBook} />
            <BookCardPrice book={selectedBook} />
          </div>
        </div>
        <div className="p-1 bg-gray-100 rounded-md my-2">
          <BookCardContent book={selectedBook} />
        </div>
        <div className="w-full flex flex-shrink-0 mt-2 gap-2">
          <Button
            type="submit"
            className="w-full"
            isLoading={isPending}
            disabled={disabled}
          >
            내 서재에 등록하기
          </Button>
        </div>
      </Card>
    </form>
  );
}
