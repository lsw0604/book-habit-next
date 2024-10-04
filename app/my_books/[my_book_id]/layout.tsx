import { ReactNode } from 'react';
import MyBookDetailPage from './@detail/page';

export default function MyBookDetailLayout({
  params,
  history,
}: {
  params: { my_book_id: number };
  history: ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <section className="w-full h-auto p-2">
        <MyBookDetailPage params={params} />
      </section>
      <section className="w-full h-auto p-2">{history}</section>
    </div>
  );
}
