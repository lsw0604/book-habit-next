'use client';

import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

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
  if (!context) throw new Error('SelectTrigger must be used within a Select');

  const { isOpen, setIsOpen, triggerRef } = context;

  const onClickTrigger = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setIsOpen((prev) => !prev);
    },
    [setIsOpen]
  );

  return (
    <div
      ref={triggerRef}
      onClick={onClickTrigger}
      className={cn(
        'flex h-10 w-full px-4 py-2 text-sm items-center justify-between rounded-md ', // base styles
        'border border-gray-300 border-input bg-background', // border styles
        'ring-offset-background placeholder:text-muted-foreground', // ring styles
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', // focus styles
        'disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer', // disabled styles
        isOpen && 'ring-2 ring-ring ring-offset-2', // open styles
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
  if (!context) throw new Error('SelectContent must be used within a Select');
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
            'absolute z-50 min-w-[8rem] w-full overflow-hidden rounded-md mt-2', // base styles
            'border bg-popover text-popover-foreground shadow-md animate-in fade-in-80', // content styles
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
  if (!context) throw new Error('SelectOption must be used within a Select');

  const { onChange, value: selectedValue, setIsOpen } = context;

  const onClickOption = React.useCallback(() => {
    onChange(value);
    setIsOpen(false);
  }, [onChange, setIsOpen, value]);

  return (
    <li
      onClick={onClickOption}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm', // base styles
        'outline-none transition-colors focus:bg-accent focus:text-accent-foreground', // focus styles
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50', // disabled styles
        selectedValue === value && 'bg-accent text-accent-foreground',
        selectedValue !== value && 'pl-8',
        className
      )}
    >
      {selectedValue === value && <CheckIcon className="w-4 h-4 mr-2" />}
      {children}
    </li>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Option = SelectOption;

export default Select;
