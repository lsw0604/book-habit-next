import { ReactNode } from 'react';

export default function MyBookDetailLayout({
  detail,
  reply,
}: {
  detail: ReactNode;
  reply: ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <section className="w-full h-auto p-2">{detail}</section>
      <section className="w-full h-auto p-2">{reply}</section>
    </div>
  );
}
