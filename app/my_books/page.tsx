import MyBookList from './_components/my-book-list';
import MyBookForm from './_components/my-book-form';

export default function MyBookPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-center p-2">
        <MyBookForm />
      </div>
      <div className="flex-1 overflow-auto">
        <MyBookList />
      </div>
    </div>
  );
}
