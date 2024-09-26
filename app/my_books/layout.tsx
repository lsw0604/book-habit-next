'use client';

import React, { ReactNode } from 'react';
// import MyBookSelector from './_components/my-book-selector';
import MyBookForm from './_components/my-book-form';

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col overflow-auto relative">
      <div className="sticky top-0 z-50">
        <MyBookForm />
      </div>
      {children}
    </div>
  );
}
