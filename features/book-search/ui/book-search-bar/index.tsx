import { BookSearchProvider as FormProvider } from "./provider";
import { BookSearchForm as FormContent } from './form';

export function BookSearchBar() {
  return (
    <div className="w-full bg-white p-4">
      <FormProvider>
        <FormContent />
      </FormProvider>
    </div>
  )
}