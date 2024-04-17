'use client';

import { CalendarIcon, ListIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface MyBookDetailSelectorProps {
  category: CategoryType;
  onChange: (type: CategoryType) => void;
}

type SelectorButtonType = {
  category: CategoryType;
  icon: JSX.Element;
};

const SelectorButtons: SelectorButtonType[] = [
  {
    category: 'calendar',
    icon: <CalendarIcon />,
  },
  {
    category: 'list',
    icon: <ListIcon />,
  },
];

export default function MyBookDetailSelector({
  onChange,
  category,
}: MyBookDetailSelectorProps) {
  return (
    <div className="flex px-4 justify-end gap-2">
      {SelectorButtons.map((v) => (
        <button
          key={v.category}
          className={cn(
            'w-10 h-10 flex justify-center items-center shadow-sm rounded-md',
            category === v.category && 'text-slate-400 shadow-lg'
          )}
          onClick={() => onChange(v.category)}
        >
          {v.icon}
        </button>
      ))}
    </div>
  );
}
