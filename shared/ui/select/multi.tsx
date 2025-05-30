'use client';

import { CheckIcon, ChevronDownIcon, X } from 'lucide-react';
import React, {
  useState,
  useRef,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { cn } from '@/shared/utils/class-name';
import Tag from '../../common/tag';

interface SelectorRootProps {
  options: string[];
  multiple?: boolean;
  value: string[] | string;
  onChange: (value: string[] | string | undefined) => void;
  children: ReactNode;
}

const SelectorContext = React.createContext<any>(null);

export function SelectorRoot({
  options,
  multiple = false,
  value,
  onChange,
  children,
}: SelectorRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<string[]>(options);

  const selectorRef = useRef<HTMLDivElement>(null);

  const selectOption = (option: string) => {
    if (multiple && Array.isArray(value)) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const addOption = (event: ReactMouseEvent, option: string) => {
    event.stopPropagation();
    selectOption(option);
    setIsOpen(false);
  };

  const onRemoveHandler = (event: ReactMouseEvent, option: string) => {
    event.stopPropagation();
    selectOption(option);
    setSelect(prev => [...prev, option]);
  };

  const onClearHandler = (event: ReactMouseEvent) => {
    event.stopPropagation();
    setSelect(options);
    setIsOpen(false);
    onChange(multiple ? [] : undefined);
  };

  useOnClickOutside(selectorRef, () => setIsOpen(false));

  return (
    <SelectorContext.Provider
      value={{
        isOpen,
        setIsOpen,
        select,
        value,
        selectOption,
        addOption,
        onRemoveHandler,
        onClearHandler,
      }}
    >
      <div ref={selectorRef} className="relative w-full min-h-10 border-b-2">
        {children}
      </div>
    </SelectorContext.Provider>
  );
}

interface SelectorTriggerProps {
  children: ReactNode;
}

export function SelectorTrigger({ children }: SelectorTriggerProps) {
  const { setIsOpen, isOpen } = React.useContext(SelectorContext);

  const handleClick = (event: ReactMouseEvent) => {
    event.stopPropagation();
    setIsOpen((prev: boolean) => !prev);
  };

  return (
    <div className="flex items-center px-2 py-1" onClick={handleClick}>
      {children}
      <ChevronDownIcon className="ml-2 cursor-pointer" />
    </div>
  );
}

interface SelectorOptionsProps {
  children: ReactNode;
}

export function SelectorOptions({ children }: SelectorOptionsProps) {
  const { isOpen, select } = React.useContext(SelectorContext);

  return (
    <ul
      className={cn(
        'absolute list-none hidden w-full left-0 z-100 bg-white shadow-lg',
        isOpen && 'block'
      )}
    >
      {select.length === 0 ? (
        <div className="flex h-[120px] justify-center items-center text-sm">
          <span>목록이 없습니다.</span>
        </div>
      ) : (
        children
      )}
    </ul>
  );
}

interface SelectorOptionProps {
  option: string;
}

export function SelectorOption({ option }: SelectorOptionProps) {
  const { value, addOption } = React.useContext(SelectorContext);
  const isSelected = Array.isArray(value)
    ? value.includes(option)
    : value === option;

  return (
    <li
      className={cn(
        'flex h-10 px-2 cursor-pointer items-center justify-between border-b-2',
        isSelected && 'bg-slate-300'
      )}
      onClick={e => addOption(e, option)}
    >
      {option}
      {isSelected && <CheckIcon className="w-6 h-6" />}
    </li>
  );
}

interface SelectorClearButtonProps {
  children: ReactNode;
}

export function SelectorClearButton({ children }: SelectorClearButtonProps) {
  const { onClearHandler } = React.useContext(SelectorContext);

  return (
    <div onClick={e => onClearHandler(e)} className="cursor-pointer">
      {children}
    </div>
  );
}

interface SelectorValueProps {
  children: ReactNode;
}

export function SelectorValue({ children }: SelectorValueProps) {
  return (
    <div className="flex gap-2 flex-wrap text-center items-center">
      {children}
    </div>
  );
}

// Usage example
export default function Selector({
  options,
  multiple = false,
  value,
  onChange,
}: {
  options: string[];
  multiple?: boolean;
  value: string[] | string;
  onChange: (value: string[] | string | undefined) => void;
}) {
  return (
    <SelectorRoot
      options={options}
      multiple={multiple}
      value={value}
      onChange={onChange}
    >
      <SelectorTrigger>
        <SelectorValue>
          {Array.isArray(value)
            ? value.map((v, i) => <Tag key={i}>{v}</Tag>)
            : value}
        </SelectorValue>
      </SelectorTrigger>
      <SelectorClearButton>
        <X className="cursor-pointer" />
      </SelectorClearButton>
      <SelectorOptions>
        {options.map(option => (
          <SelectorOption key={option} option={option} />
        ))}
      </SelectorOptions>
    </SelectorRoot>
  );
}
