import { ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { cn } from '@/shared/utils/class-name';

import { PopoverContext } from '../hooks';

import PopoverContent from './popover-content';
import PopoverTrigger from './popover-trigger';

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

  const popoverContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      closeContent,
      triggerRef,
    }),
    [isOpen, setIsOpen, closeContent, triggerRef],
  );

  return (
    <PopoverContext.Provider value={popoverContextValue}>
      <div className={cn('inline-block relative', className)}>{children}</div>
    </PopoverContext.Provider>
  );
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export default Popover;
