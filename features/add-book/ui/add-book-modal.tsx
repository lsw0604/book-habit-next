'use client';

import { useRouter } from 'next/navigation';

import {
  BookCardAuthor,
  BookCardContent,
  BookCardImage,
  BookCardISBN,
  BookCardPrice,
  BookCardPublisher,
  BookCardTitle,
  deserializeSearchBook,
  useAddBook,
} from '@/entities/book';
import type { AddBookProps } from '@/entities/modal';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';

import { useAddBookForm } from '../hooks';
import type { AddBookType } from '../schemas';

export function AddBookModal({ serializedSearchBook }: AddBookProps) {
  const router = useRouter();
  const searchBook = deserializeSearchBook(serializedSearchBook);
  const { handleSubmit } = useAddBookForm(searchBook);
  const { mutate } = useAddBook();

  const onSubmit = async (data: AddBookType) => {
    mutate(data, {
      onSuccess: response => {
        router.push(`/book/${response.id}`);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="shadow-none border-none">
        <CardContent className="flex gap-4">
          <BookCardImage
            thumbnail={searchBook.thumbnail}
            isbns={searchBook.isbns}
          />
          <div className="flex flex-col flex-grow space-y-2">
            <BookCardTitle
              title={searchBook.title}
              className="text-lg font-semibold"
            />
            <Separator />
            <div className="space-y-1 text-sm">
              <BookCardISBN isbns={searchBook.isbns} />
              <BookCardAuthor
                authors={searchBook.authors}
                translators={searchBook.translators}
              />
              <BookCardPublisher
                publisher={searchBook.publisher}
                datetime={searchBook.datetime}
              />
              <BookCardPrice
                price={searchBook.price}
                sale_price={searchBook.sale_price}
              />
            </div>
            <Separator />
          </div>
        </CardContent>
        <CardFooter>
          <BookCardContent
            bookContent={searchBook.contents}
            className="text-sm text-muted-foreground"
          />
        </CardFooter>
      </Card>
      <div className="py-4 px-6">
        <Button type="submit" className="w-full">
          내 서재에 등록하기
        </Button>
      </div>
    </form>
  );
}
