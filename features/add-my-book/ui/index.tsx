import { bookSelector } from '@/entities/book/model/store';
import { useAppSelector } from '@/shared/redux/store';
import { useAddMyBookForm, useAddMyBookFormSubmit } from '../lib/hooks';
import { BookCardContent, BookCardImage } from '@/entities/book';
import { Button } from '@/shared/ui/button';

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
        <BookCardContent
          variant="modal"
          item={{
            ...book,
            sale_price: book.salePrice,
            isbn: book.isbns.join(', '),
          }}
        />
      </div>
      <div className="w-full flex flex-shrink-0 mt-2 gap-2">
        <Button className="w-full" isLoading={isPending} type="submit">
          등록하기
        </Button>
      </div>
    </form>
  );
}
