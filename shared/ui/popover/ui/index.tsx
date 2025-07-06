import { ReactNode, useCallback, useRef, useState } from 'react';
import PopoverTrigger from './popover-trigger';
import PopoverContent from './popover-content';
import { PopoverContext } from '../hooks';
import { cn } from '@/shared/utils/class-name';

interface PopoverProps {
  className?: string;
  children: ReactNode;
}

function Popover({ className, children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const closeContent = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <PopoverContext.Provider
      value={{ isOpen, setIsOpen, closeContent, triggerRef }}
    >
      <div className={cn('inline-block relative', className)}>{children}</div>
    </PopoverContext.Provider>
  );
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export default Popover;
