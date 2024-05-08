import React, { ReactNode } from 'react';

interface MyBookDetailHistoryItemInputProps {
  children: ReactNode;
}

export default function MyBookDetailHistoryItemInput({
  children,
}: MyBookDetailHistoryItemInputProps) {
  return (
    <span className="px-2 rounded-md mr-2 bg-slate-300">
      <button>{children}</button>
    </span>
  );
}
