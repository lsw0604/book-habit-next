import { ReactNode } from 'react';

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col overscroll-auto items-center justify-center">
      {children}
    </div>
  );
}
