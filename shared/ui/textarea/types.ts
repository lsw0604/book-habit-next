import { TextareaHTMLAttributes } from 'react';

export interface AutoSizeTextareaRef {
  textarea: HTMLTextAreaElement;
  maxHeight: number;
  minHeight: number;
}

export interface AutoSizeTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
  minHeight?: number;
  isError?: boolean;
  label?: string;
  errorMessage?: string;
}
