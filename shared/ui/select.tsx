'use client';

import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useOnClickOutside } from 'usehooks-ts';

import { cn } from '@/shared/utils/class-name';

type SelectContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  onChange: (value: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
};

const SelectContext = React.createContext<SelectContextType | undefined>(
  undefined
);

interface SelectProps {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// NOTE: Compound Component Pattern을 위한 타입 정의
interface SelectComponent extends React.FC<SelectProps> {
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Option: typeof SelectOption;
  ErrorBoundary: typeof SelectErrorBoundary;
}

function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      'SelectTrigger는 반드시 Select 컴포넌트 내부에서 사용되어야 합니다.'
    );

  const { isOpen, setIsOpen, triggerRef } = context;

  const onClickTrigger = React.useCallback(() => {
    setIsOpen(prev => !prev);
  }, [setIsOpen]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(prev => !prev);
      }
    },
    [setIsOpen]
  );

  return (
    <button
      type="button"
      ref={triggerRef}
      onClick={onClickTrigger}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md',
        'border border-gray-300 border-input bg-background px-3 py-2 text-sm',
        'placeholder:text-muted-foreground',
        'focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
        className
      )}
    >
      {children}
      <ChevronDownIcon
        size={16}
        className={cn(
          'opacity-50 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

function SelectContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      'SelectContent는 반드시 Select 컴포넌트 내부에서 사용되어야 합니다.'
    );
  const { isOpen, triggerRef, setIsOpen } = context;
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const handleClickOutside = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (
        triggerRef.current &&
        triggerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    },
    [setIsOpen, triggerRef]
  );

  useOnClickOutside(contentRef, handleClickOutside);

  return isOpen ? (
    <div
      role="listbox"
      ref={contentRef}
      className={cn(
        'absolute z-50 mt-2 min-w-[8rem] w-full overflow-hidden rounded-md',
        'border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
        className
      )}
    >
      <ul className="p-1">{children}</ul>
    </div>
  ) : null;
}

function SelectOption({
  children,
  className,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      'SelectOption는 반드시 Select 컴포넌트 내부에서 사용되어야 합니다.'
    );

  const { onChange, value: selectedValue, setIsOpen } = context;

  const onClickOption = React.useCallback(() => {
    onChange(value);
    setIsOpen(false);
  }, [onChange, setIsOpen, value]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClickOption();
      }
    },
    [onClickOption]
  );

  return (
    <li
      onClick={onClickOption}
      onKeyDown={handleKeyDown}
      role="option"
      aria-selected={selectedValue === value}
      tabIndex={0}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-4 py-2 text-sm',
        'outline-none transition-colors duration-200',
        selectedValue === value && 'bg-accent text-accent-foreground',
        className
      )}
    >
      {selectedValue === value && (
        <CheckIcon className="absolute right-2 flex h-4 w-4 items-center justify-center" />
      )}
      {children}
    </li>
  );
}

function SelectErrorFallback({ error }: { error: Error }) {
  return <div>{error.message}</div>;
}

function SelectErrorBoundary({ children }: { children: React.ReactNode }) {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    console.error(
      `SELECT Component [ERROR] ${error.message} ${
        info.componentStack?.toString() ?? ''
      }`
    );
  };

  return (
    <ErrorBoundary
      FallbackComponent={SelectErrorFallback}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
}

function Select({ value, onChange, children, className }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const contextValue = React.useMemo(
    () => ({ isOpen, setIsOpen, value, onChange, triggerRef }),
    [isOpen, value, onChange]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cn('relative inline-block w-full', className)}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Option = SelectOption;
Select.ErrorBoundary = SelectErrorBoundary;

export default Select as SelectComponent;
