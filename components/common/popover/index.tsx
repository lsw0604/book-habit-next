'use client';

import React from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import Dropdown from '@/components/common/dropdown';
import { cn } from '@/utils/class-name';

type PopoverContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeContent: () => void;
  triggerRef: React.RefObject<HTMLDivElement>;
};

const PopoverContext = React.createContext<PopoverContextType | null>(null);

interface PopoverProps {
  children: React.ReactNode;
  className?: string;
}

type PopoverChildComponent = React.FC<PopoverProps>;

type PopoverComponent = React.FC<PopoverProps> & {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
};

const Popover: PopoverComponent = ({ className, children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const triggerRef = React.useRef<HTMLDivElement | null>(null);

  const closeContent = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <PopoverContext.Provider
      value={{ isOpen, setIsOpen, closeContent, triggerRef }}
    >
      <div className={cn('inline-block relative', className)}>{children}</div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger: PopoverChildComponent = ({ className, children }) => {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error('PopoverTrigger must be used within a Popover');

  const { setIsOpen, triggerRef } = context;

  const onClickTrigger = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setIsOpen((prev: boolean) => !prev);
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
};

const PopoverContent: PopoverChildComponent = ({ className, children }) => {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error('PopoverContent must be used within a Popover');

  const { isOpen, closeContent, triggerRef } = context;
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const onClickContent = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (
        triggerRef.current &&
        triggerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      closeContent();
    },
    [closeContent, triggerRef]
  );

  const onPressKeydown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeContent();
      }
    },
    [closeContent]
  );

  useOnClickOutside(contentRef, onClickContent);
  useEventListener('keydown', onPressKeydown);

  return (
    <>
      {isOpen ? (
        <Dropdown
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          className={className}
        >
          {children}
        </Dropdown>
      ) : null}
    </>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export default Popover;
