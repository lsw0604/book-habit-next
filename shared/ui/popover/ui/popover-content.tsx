import { ReactNode, useCallback, useContext, useRef } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { PopoverContext } from '../hooks';
import { Dropdown } from '@/shared/ui/dropdown';
import { cn } from '@/shared/utils/class-name';

interface PopoverContentProps {
  className?: string;
  children: ReactNode;
}

export default function PopoverContent({
  children,
  className,
}: PopoverContentProps) {
  const context = useContext(PopoverContext);

  if (!context) throw new Error('PopoverContent must be within a Popover');

  const { isOpen, closeContent, triggerRef } = context;
  const contentRef = useRef<HTMLDivElement>(null);

  const onClickContent = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (
        triggerRef.current &&
        triggerRef.current.contains(event?.target as Node)
      ) {
        return;
      }

      closeContent();
    },
    [closeContent, triggerRef]
  );

  const onPressKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeContent();
      }
    },
    [closeContent]
  );

  useOnClickOutside(contentRef, onClickContent);
  useEventListener('keydown', onPressKey);

  return (
    <>
      {isOpen ? (
        <Dropdown
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          className={cn(className)}
        >
          {children}
        </Dropdown>
      ) : null}
    </>
  );
}
