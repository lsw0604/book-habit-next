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
import { cn } from '@/shared/utils/class-name';

import { useAddMyBookForm, useAddMyBookFormSubmit } from '../hooks';

export default function AddMyBookModal({ selectedBook }: RegisterMyBookProps) {
  const { onSubmit, isPending } = useAddMyBookFormSubmit();
  const { handleSubmit } = useAddMyBookForm({ ...selectedBook });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <BookCardImage item={{ ...selectedBook, isbns: selectedBook.isbns }} />
        <div
          className={cn(
            CARD_STYLES.contentWrapper,
            'p-1 ml-2 pl-2 bg-gray-100 rounded-md'
          )}
        >
          <BookCardTitle>{selectedBook.title}</BookCardTitle>
          <div className="flex gap-2">
            {selectedBook.isbns.map(isbn => (
              <BookCardISBN key={isbn}>{isbn}</BookCardISBN>
            ))}
          </div>
          <BookCardAuthor
            authors={selectedBook.authors}
            translators={selectedBook.translators}
          />
          <BookCardPublisher
            datetime={selectedBook.datetime}
            publisher={selectedBook.publisher}
          />
          <BookCardPrice
            price={selectedBook.price}
            salePrice={selectedBook.salePrice}
          />
        </div>
      </div>
      <div className="p-1 bg-gray-100 rounded-md my-2">
        <BookCardContent content={selectedBook.contents} />
      </div>
      <div className="w-full flex flex-shrink-0 mt-2 gap-2">
        <Button className="w-full" isLoading={isPending} type="submit">
          내 서재에 등록하기
        </Button>
      </div>
    </form>
  );
}
