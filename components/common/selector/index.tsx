'use client';

import { CheckIcon, ChevronDownIcon, X } from 'lucide-react';
import { useState, useRef, MouseEvent as ReactMouseEvent } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import ErrorMessage from '../error-message';

import { cn } from '@/lib/utils';

interface SelectorProps {
  options: string[];
  label?: string;
  errorMessage?: string;
  isValid?: boolean;
  useValidation?: boolean;
}

interface MultiSelectorProps {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
}

interface SingleSelectorProps {
  multiple?: false;
  value?: string;
  onChange: (value?: string) => void;
}

type Selector = SelectorProps & (SingleSelectorProps | MultiSelectorProps);

export default function Selector({
  label,
  value,
  options,
  isValid,
  multiple,
  onChange,
  errorMessage,
  useValidation,
}: Selector) {
  const [select, setSelect] = useState<string[]>(options);
  const [isOpen, setIsOpen] = useState(false);

  const selectorRef = useRef<HTMLDivElement>(null);

  const selectOption = (option: string) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) return onChange(option);
    }
  };

  const onRemoveHandler = (event: ReactMouseEvent, value: string) => {
    event.stopPropagation();
    selectOption(value);
    setSelect((prev) => [...prev, value]);
  };

  const initSelectOption = () => {
    setSelect(options);
  };

  const onClearHandler = (event: ReactMouseEvent) => {
    event.stopPropagation();
    initSelectOption();
    setIsOpen(false);
    return multiple ? onChange([]) : onChange(undefined);
  };

  const handleOption = (event: ReactMouseEvent) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const addOption = (event: ReactMouseEvent, option: string) => {
    if (multiple) {
      event.stopPropagation();
      selectOption(option);
      setSelect((prev) => prev.filter((o) => o !== option));
      setIsOpen(false);
    } else {
      event.stopPropagation();
      selectOption(option);
      setIsOpen(false);
    }
  };

  useOnClickOutside(selectorRef, () => setIsOpen(false));

  return (
    <>
      {label && (
        <label className="ml-2 mb-2 block text-sm text-slate-500">
          {label}
        </label>
      )}
      <div
        className="flex relative w-full min-h-10 border-b-2 border-b-black items-center px-2 py-1"
        ref={selectorRef}
        onClick={handleOption}
      >
        <div className="flex w-full h-full">
          <div className="flex gap-2 flex-wrap text-center items-center w-full">
            {multiple ? (
              value.map((tag, i) => (
                <div
                  className="flex items-center border-none rounded-lg cursor-pointer outline-none bg-slate-200 text-black px-2 py-1 justify-center gap-2 text-center text-sm"
                  key={i}
                >
                  {tag}
                  <X
                    className="w-4 h-4 fill-slate-200 cursor-pointer"
                    onClick={(e) => onRemoveHandler(e, tag)}
                  />
                </div>
              ))
            ) : (
              <span className="text-sm h-4">{value}</span>
            )}
          </div>

          <div className="flex gap-2 w-auto h-auto items-center">
            {multiple && (
              <X
                onClick={(e) => onClearHandler(e)}
                className="cursor-pointer"
              />
            )}
            <div className="inline-block w-0.5 self-stretch bg-slate-300 opacity-100 dark:opacity-50"></div>
            <ChevronDownIcon
              onClick={handleOption}
              className="cursor-pointer"
            />
          </div>
        </div>
        <ul
          className={cn(
            'absolute m-0 p-0 list-none hidden max-h-50 overflow-y-auto w-full rounded-lg left-0 z-100 bg-white top-[calc(100%_+_1em)] shadow-lg',
            isOpen && 'block'
          )}
        >
          {select.length === 0 ? (
            <div className="flex h-[120px] justify-center items-center text-sm">
              <span>목록이 없습니다.</span>
            </div>
          ) : (
            select.map((option) => (
              <li
                className={cn(
                  'flex h-10 px-2 cursor-pointer items-center justify-between border-slate-300 border-b-2',
                  value === option && 'bg-slate-300 text-slate-100'
                )}
                key={option}
                onClick={(e) => addOption(e, option)}
              >
                {option}
                {value === option && <CheckIcon className="w-6 h-6" />}
              </li>
            ))
          )}
        </ul>
      </div>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}
