import { Dispatch, SetStateAction, useCallback } from 'react';
import { Clock, Edit3 } from 'lucide-react';
import { cn } from '@/shared/utils/class-name';

export type AddMyBookHistorySwitchType = 'timer' | 'manual';

interface AddMyBookHistorySwitchProps {
  mode: AddMyBookHistorySwitchType;
  setMode: Dispatch<SetStateAction<AddMyBookHistorySwitchType>>;
  className?: string;
}

const STYLES = {
  base: 'flex mb-6 bg-gray-100 rounded-lg p-1',
  button: {
    base: 'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
    on: 'bg-white text-blue-600 shadow-sm',
    off: 'text-gray-600 hover:text-gray-900',
  },
};

export default function AddMyBookHistorySwitch({
  mode,
  setMode,
  className,
}: AddMyBookHistorySwitchProps) {
  const handleSetTimerMode = useCallback(() => {
    setMode('timer');
  }, [setMode]); // setMode는 안정적인 함수이므로 의존성 배열에 포함해도 불필요한 재생성은 없습니다.

  const handleSetManualMode = useCallback(() => {
    setMode('manual');
  }, [setMode]);

  return (
    <div className={cn(STYLES.base, className)}>
      <button
        onClick={handleSetTimerMode}
        className={cn(
          STYLES.button.base,
          mode === 'timer' ? STYLES.button.on : STYLES.button.off
        )}
      >
        <Clock className="w-4 h-4 inline mr-2" />
        타이머 모드
      </button>
      <button
        onClick={handleSetManualMode}
        className={cn(
          STYLES.button.base,
          mode === 'manual' ? STYLES.button.on : STYLES.button.off
        )}
      >
        <Edit3 className="w-4 h-4 inline mr-2" />
        직접 입력
      </button>
    </div>
  );
}
