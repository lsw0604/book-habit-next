import { bookSelector } from '@/entities/book/model/store';
import {
  BookCardAuthor,
  BookCardContent,
  BookCardImage,
  BookCardISBN,
  BookCardPrice,
  BookCardPublisher,
  BookCardTitle,
} from '@/entities/book';
import { useAddMyBookForm, useAddMyBookFormSubmit } from '../lib/hooks';
import { useAppSelector } from '@/shared/redux/store';
import { Button } from '@/shared/ui/button';
import { CARD_STYLES } from '@/shared/style/card-style';
import { cn } from '@/shared/utils/class-name';

export default function RegisterMyBookModal() {
  const book = useAppSelector(bookSelector);
  const { handleSubmit } = useAddMyBookForm({
    ...book,
    sale_price: book.salePrice,
  });
  const { onSubmit, isPending } = useAddMyBookFormSubmit();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <BookCardImage item={{ ...book, isbn: book.isbns.join(', ') }} />
        <div className={cn(CARD_STYLES.contentWrapper)}>
          <BookCardTitle>{book.title}</BookCardTitle>
          <div className="flex gap-2">
            {book.isbns.map(isbn => (
              <BookCardISBN key={isbn}>{isbn}</BookCardISBN>
            ))}
          </div>
          <BookCardAuthor
            authors={book.authors}
            translators={book.translators}
          />
          <BookCardPublisher
            datetime={book.datetime}
            publisher={book.publisher}
          />
          <BookCardPrice price={book.price} sale_price={book.salePrice} />
          <BookCardContent content={book.contents} />
        </div>
      </div>
      <div className="w-full flex flex-shrink-0 mt-2 gap-2">
        <Button className="w-full" isLoading={isPending} type="submit">
          등록하기
        </Button>
      </div>
    </form>
  );
}
