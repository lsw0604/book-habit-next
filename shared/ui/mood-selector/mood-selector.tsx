import { Check } from 'lucide-react';

import type { ReadingMood } from '@/entities/my-book-history/model';
import { cn } from '@/shared/utils/class-name';

import { MOOD_SELECTOR_OPTIONS, MOOD_SELECTOR_STYLE } from './constant';
import type { MoodSelectorOption } from './types';

interface MoodSelectorProps {
  value: ReadingMood;
  onChange: (mood: ReadingMood) => void;
  className?: string;
}

export default function MoodSelector({
  value,
  onChange,
  className,
}: MoodSelectorProps) {
  return (
    <div className={cn(MOOD_SELECTOR_STYLE.container, className)}>
      {MOOD_SELECTOR_OPTIONS.map((mood: MoodSelectorOption) => (
        <button
          key={mood.value}
          type="button"
          onClick={() => onChange(mood.value)}
          className={cn(
            MOOD_SELECTOR_STYLE.button,
            value === mood.value && MOOD_SELECTOR_STYLE.selected,
          )}
        >
          {value === mood.value ? (
            <Check className={MOOD_SELECTOR_STYLE.check} />
          ) : (
            <span className={MOOD_SELECTOR_STYLE.emoji}>{mood.emoji}</span>
          )}
          <span className={MOOD_SELECTOR_STYLE.label}>{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
