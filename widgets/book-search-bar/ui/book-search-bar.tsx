import {
  BookSearchForm,
  BookSearchFormProvider,
} from '@/features/book-search';

export function BookSearchBar() {
  return (
    <div className="w-full bg-white p-4">
    <BookSearchFormProvider>
      <BookSearchForm />
    </BookSearchFormProvider>
    </div>
  );
}
