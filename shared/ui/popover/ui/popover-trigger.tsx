import {
  type MouseEvent,
  type TouchEvent,
  ReactNode,
  useCallback,
  useContext,
} from 'react';
import { PopoverContext } from '../hooks';
import { cn } from '@/shared/utils/class-name';

interface PopoverTriggerProps {
  className?: string;
  children: ReactNode;
}

export default function PopoverTrigger({
  children,
  className,
}: PopoverTriggerProps) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('PopoverTrigger must be used within a Popover');

  const { setIsOpen, triggerRef } = context;

  const onClickTrigger = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();
      setIsOpen(prev => !prev);
    },
    [setIsOpen]
  );

  return (
    <div
      ref={triggerRef}
      onClick={onClickTrigger}
      className={cn('cursor-pointer', className)}
    >
      {children}
    </div>
  );
}
