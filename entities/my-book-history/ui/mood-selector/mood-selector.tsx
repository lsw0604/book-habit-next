import type { MoodSelectorOption } from './types';
import type { ReadingMood } from '../../model';
import { MOOD_SELECTOR_STYLE, MOOD_SELECTOR_OPTIONS } from './constant';
import { cn } from '@/shared/utils/class-name';
import { Check } from 'lucide-react';

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
          onClick={() => onChange(mood.value)}
          className={cn(
            MOOD_SELECTOR_STYLE.button.base,
            MOOD_SELECTOR_STYLE.button.hover,
            mood.color,
            value === mood.value
              ? MOOD_SELECTOR_STYLE.button.on
              : MOOD_SELECTOR_STYLE.button.off
          )}
        >
          {value === mood.value ? (
            <Check className={mood.check} />
          ) : (
            <span className={MOOD_SELECTOR_STYLE.emoji}>{mood.emoji}</span>
          )}
          <span className={MOOD_SELECTOR_STYLE.label}>{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
