'use client';

import {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
  Ref,
  ChangeEvent,
  useEffect,
} from 'react';

import { cn } from '@/shared/utils/class-name';

import { ErrorMessage } from '../error-message';
import { Label } from '../label';

import type { AutoSizeTextareaProps, AutoSizeTextareaRef } from './types';
import { useAutoSizeTextarea } from './useAutosizeTextarea';
import { autoSizeTextareaVariants } from './variants';

type StateType = 'default' | 'error' | 'disabled';

export const AutoSizeTextarea = forwardRef<
  AutoSizeTextareaRef,
  AutoSizeTextareaProps
>(
  (
    {
      id,
      value,
      label,
      isError,
      minHeight = 52,
      maxHeight = Number.MAX_SAFE_INTEGER,
      className,
      disabled,
      errorMessage,
      onChange,
      ...props
    }: AutoSizeTextareaProps,
    ref: Ref<AutoSizeTextareaRef>
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [triggerAutoSize, setTriggerAutoSize] = useState<string>('');

    let state: StateType = 'default';

    if (disabled) {
      state = 'disabled';
    } else if (isError) {
      state = 'error';
    }

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
      <div className="group">
        {label && (
          <Label htmlFor={id} className="text-xs ml-1 font-bold">
            {label}
          </Label>
        )}
        <textarea
          {...props}
          id={id}
          disabled={disabled}
          className={cn(autoSizeTextareaVariants({ state }), className)}
          value={value}
          ref={textareaRef}
          onChange={handleOnChange}
        />
        {isError && !!errorMessage && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </div>
    );
  }
);

AutoSizeTextarea.displayName = 'AutoSizeTextarea';
