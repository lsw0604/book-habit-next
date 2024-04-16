'use client';

import { CalendarIcon, ListIcon } from 'lucide-react';
import { useCallback } from 'react';

interface MyBookDetailSelectorProps {
  onChange: () => void;
}

export default function MyBookDetailSelector({
  onChange,
}: MyBookDetailSelectorProps) {
  const onChangeType = useCallback(() => {}, []);

  return (
    <div className="flex">
      <button className="w-10 h-10 flex justify-center items-center shadow-lg rounded-md">
        <CalendarIcon />
      </button>
      <button className="w-10 h-10 flex justify-center items-center shadow-lg rounded-md">
        <ListIcon />
      </button>
    </div>
  );
}
