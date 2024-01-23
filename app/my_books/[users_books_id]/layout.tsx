import { ReactNode } from 'react';

export default function MyBookDetailLayout({
  info,
  comment,
  calendar,
}: {
  info: ReactNode;
  calendar: ReactNode;
  comment: ReactNode;
}) {
  return (
    <div className="w-full h-full relative overflow-auto">
      <div>{info}</div>
      <div>{calendar}</div>
      <div>{comment}</div>
    </div>
  );
}
