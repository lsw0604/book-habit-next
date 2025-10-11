import {
  BookSearchForm,
  BookSearchFormProvider,
} from '@/features/book-search-form';

export function BookSearchBar() {
  return (
    <BookSearchFormProvider>
      <BookSearchForm />
    </BookSearchFormProvider>
  );
}
