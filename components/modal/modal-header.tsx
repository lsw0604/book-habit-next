import { ReactNode } from 'react';

interface ModalHeaderProps {
  icon?: ReactNode;
  title: string;
  sub?: string;
}

export default function ModalHeader({ icon, title, sub }: ModalHeaderProps) {
  return (
    <div className="h-10 flex w-full items-center justify-center gap-4 mb-2">
      {icon && <div className="h-full flex items-center w-8">{icon}</div>}
      <div className="flex flex-col">
        <span className="text-xl">{title}</span>
        {sub && <span className="text-xs">{sub}</span>}
      </div>
    </div>
  );
}
