import React, { ReactNode } from 'react';
import MyBookSelector from './_components/my-book-selector';

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col overflow-auto relative">
      <MyBookSelector />
      {children}
    </div>
  );
}
