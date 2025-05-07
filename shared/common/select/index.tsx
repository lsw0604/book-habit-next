'use client';

import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from '@/shared/utils/class-name';
import Alert from '../alert';

type SelectContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  onChange: (value: string) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
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

type SelectChildComponentProps = React.FC<
  Pick<SelectProps, 'children' | 'className'>
>;

type SelectOptionProps = React.FC<
  Pick<SelectProps, 'children' | 'className' | 'value'>
>;

type SelectComponentProps = React.FC<SelectProps> & {
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Option: typeof SelectOption;
  ErrorBoundary: typeof SelectErrorBoundary;
};

const Select: SelectComponentProps = ({
  value,
  onChange,
  children,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <SelectContext.Provider
      value={{ isOpen, setIsOpen, value, onChange, triggerRef }}
    >
      <div className={cn('inline-block relative w-full', className)}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger: SelectChildComponentProps = ({ children, className }) => {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      'SelectTrigger는 반드시 Select 컴포넌트 내부에서 사용되어야 합니다.'
    );

  const { isOpen, setIsOpen, triggerRef } = context;

  const onClickTrigger = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setIsOpen(prev => !prev);
    },
    [setIsOpen]
  );

  return (
    <div
      ref={triggerRef}
      onClick={onClickTrigger}
      className={cn(
        'flex h-10 w-full px-4 py-2 text-sm items-center justify-between rounded-md', // 기본 스타일
        'border border-gray-300 border-input bg-background', // 테두리 스타일
        'ring-offset-background placeholder:text-muted-foreground', // 테두리 스타일
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', // focus styles
        'disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer', // 비활성화 스타일
        isOpen && 'ring-2 ring-ring ring-offset-2', // 열림 스타일
        className
      )}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          'w-4 h-4 opacity-50 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </div>
  );
};

const SelectContent: SelectChildComponentProps = ({ children, className }) => {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      'SelectContent는 반드시 Select 컴포넌트 내부에서 사용되어야 합니다.'
    );
  const { isOpen, triggerRef, setIsOpen } = context;
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const onClickContent = React.useCallback(
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
  useOnClickOutside(contentRef, onClickContent);

  return (
    <>
      {isOpen ? (
        <div
          role="combobox"
          aria-modal="true"
          ref={contentRef}
          className={cn(
            'absolute z-50 min-w-[8rem] w-full overflow-hidden rounded-md mt-2', // 기본 스타일
            'border bg-popover text-popover-foreground shadow-md animate-in fade-in-80', // 컨텐츠 스타일
            className
          )}
        >
          <ul className="p-1">{children}</ul>
        </div>
      ) : null}
    </>
  );
};

const SelectOption: SelectOptionProps = ({ children, className, value }) => {
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

  return (
    <li
      onClick={onClickOption}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm', // 기본 스타일
        'outline-none transition-colors focus:bg-accent focus:text-accent-foreground', // focus 스타일
        selectedValue === value && 'bg-accent text-accent-foreground', // 선택된 옵션 스타일
        selectedValue !== value && 'pl-8',
        className
      )}
    >
      {selectedValue === value && <CheckIcon className="w-4 h-4 mr-2" />}
      {children}
    </li>
  );
};

const SelectErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    console.error(
      `SELECT Component [ERROR] ${error.message} ${
        info.componentStack?.toString() ?? ''
      }`
    );
  };

  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <Alert status="ERROR" message={error.message} />
      )}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Option = SelectOption;
Select.ErrorBoundary = SelectErrorBoundary;

export default Select;
