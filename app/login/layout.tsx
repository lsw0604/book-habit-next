import { ReactNode } from 'react';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {children}
    </div>
  );
}
