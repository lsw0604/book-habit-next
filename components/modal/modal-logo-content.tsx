import { ReactNode } from 'react';

interface ModalLogoContentProps {
  icon: ReactNode;
  message: string;
  highlight?: string;
}

export default function ModalLogoContent({
  icon,
  message,
  highlight,
}: ModalLogoContentProps) {
  return (
    <div className="grid grid-rows-2 px-4 py-0">
      <div className="relative w-full h-full flex justify-center items-center">
        <span>
          {highlight && <span className="text-slate-200">{highlight}</span>}
          {message}
        </span>
      </div>
      <div className="relative w-full h-full flex justify-center items-center">
        {icon}
      </div>
    </div>
  );
}
