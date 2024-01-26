import { ReactNode } from 'react';

export default function MyBookDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full h-full relative overflow-auto">{children}</div>;
}
