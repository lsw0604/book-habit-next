import MyBookList from './_components/my-book-list';
import MyBookForm from './_components/my-book-form';

export default function MyBookPage() {
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="w-full flex justify-center p-2 bg-white sticky top-16 z-10">
        <MyBookForm />
      </div>
      <div className="flex-1 overflow-auto">
        <MyBookList />
      </div>
    </div>
  );
}
