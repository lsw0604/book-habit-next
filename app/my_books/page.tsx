import MyBookList from './_components/my-book-list';
import MyBookSelector from './_components/my-book-selector';

export default function page() {
  return (
    <div className="w-full h-full flex flex-col">
      <MyBookSelector />
      <MyBookList />
    </div>
  );
}
