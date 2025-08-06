'use client';

import {
  useImperativeHandle,
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
  useState,
  Ref,
  ChangeEvent,
  useEffect,
} from 'react';

import { cn } from '@/shared/utils/class-name';

import { useAutoSizeTextarea } from './useAutosizeTextarea';

interface AutoSizeTextareaRef {
  textarea: HTMLTextAreaElement;
  maxHeight: number;
  minHeight: number;
}

interface AutoSizeTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
  minHeight?: number;
}

export const AutoSizeTextarea = forwardRef<
  AutoSizeTextareaRef,
  AutoSizeTextareaProps
>(
  (
    {
      maxHeight = Number.MAX_SAFE_INTEGER,
      minHeight = 52,
      className,
      onChange,
      value,
      ...props
    }: AutoSizeTextareaProps,
    ref: Ref<AutoSizeTextareaRef>
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [triggerAutoSize, setTriggerAutoSize] = useState<string>('');

    useAutoSizeTextarea({
      textareaRef,
      triggerAutoSize,
      maxHeight,
      minHeight,
    });

    useImperativeHandle(ref, () => ({
      textarea: textareaRef.current as HTMLTextAreaElement,
      focus: () => textareaRef.current?.focus(),
      maxHeight,
      minHeight,
    }));

    useEffect(() => {
      setTriggerAutoSize(value as string);
    }, [props?.defaultValue, value]);

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setTriggerAutoSize(event.target.value);
      onChange?.(event);
    };

    return (
      <textarea
        {...props}
        className={cn(
          'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        value={value}
        ref={textareaRef}
        onChange={handleOnChange}
      />
    );
  }
);

AutoSizeTextarea.displayName = 'AutoSizeTextarea';
