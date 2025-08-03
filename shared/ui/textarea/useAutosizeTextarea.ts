import { MutableRefObject, useEffect, useState } from 'react';

interface UseAutoSizeTextareaProps {
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  minHeight?: number;
  maxHeight?: number;
  triggerAutoSize: string;
}

export const useAutoSizeTextarea = ({
  textareaRef,
  triggerAutoSize,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0,
}: UseAutoSizeTextareaProps) => {
  const [init, setInit] = useState<boolean>(true);

  const offsetBorder = 6;
  const textareaElement = textareaRef.current;

  useEffect(() => {
    if (textareaElement) {
      if (init) {
        textareaElement.style.minHeight = `${minHeight + offsetBorder}px`;

        if (maxHeight > minHeight) {
          textareaElement.style.maxHeight = `${maxHeight}px`;
        }

        setInit(false);
      }
      textareaElement.style.height = `${minHeight + offsetBorder}px`;

      const { scrollHeight } = textareaElement;

      if (scrollHeight > maxHeight) {
        textareaElement.style.height = `${maxHeight}px`;
      } else {
        textareaElement.style.height = `${scrollHeight + offsetBorder}px`;
      }
    }
  }, [textareaElement, init, minHeight, maxHeight, triggerAutoSize]);
};
