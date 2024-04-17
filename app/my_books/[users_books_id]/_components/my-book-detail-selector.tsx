'use client';

import { CalendarIcon, ListIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface MyBookDetailSelectorProps {
  type: CategoryType;
  onChange: (type: CategoryType) => void;
}

type SelectorButtonType = {
  type: CategoryType;
  icon: JSX.Element;
};

const SelectorButtons: SelectorButtonType[] = [
  {
    type: 'calendar',
    icon: <CalendarIcon />,
  },
  {
    type: 'list',
    icon: <ListIcon />,
  },
];

export default function MyBookDetailSelector({
  onChange,
  type,
}: MyBookDetailSelectorProps) {
  return (
    <div className="flex px-4 justify-end gap-2">
      {SelectorButtons.map((v) => (
        <button
          key={v.type}
          className={cn(
            'w-10 h-10 flex justify-center items-center shadow-sm rounded-md',
            type === v.type && 'text-blue-300 shadow-lg'
          )}
          onClick={() => onChange(v.type)}
        >
          {v.icon}
        </button>
      ))}
    </div>
  );
}
