import { ReactNode } from 'react';

export default function RegisterHistoryForm({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <form className="w-full h-full flex flex-col justify-between">
      {children}
      <div className="relative mb-4">Content</div>
      <div className="relative"></div>
    </form>
  );
}
