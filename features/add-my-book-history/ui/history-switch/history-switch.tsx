import type { HistorySwitchType } from './types';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { Clock, Edit3 } from 'lucide-react';
import { HISTORY_SWITCH_STYLE } from './constant';
import { cn } from '@/shared/utils/class-name';

interface HistorySwitchProps {
  mode: HistorySwitchType;
  setMode: Dispatch<SetStateAction<HistorySwitchType>>;
  className?: string;
}

export default function HistorySwitch({
  mode,
  setMode,
  className,
}: HistorySwitchProps) {
  const handleSetTimerMode = useCallback(() => {
    setMode('timer');
  }, [setMode]); // setMode는 안정적인 함수이므로 의존성 배열에 포함해도 불필요한 재생성은 없습니다.

  const handleSetManualMode = useCallback(() => {
    setMode('manual');
  }, [setMode]);

  return (
    <div className={cn(HISTORY_SWITCH_STYLE.container, className)}>
      <button
        onClick={handleSetTimerMode}
        className={cn(
          HISTORY_SWITCH_STYLE.button.base,
          mode === 'timer'
            ? HISTORY_SWITCH_STYLE.button.on
            : HISTORY_SWITCH_STYLE.button.off
        )}
      >
        <Clock className="w-4 h-4 inline mr-2" />
        타이머 모드
      </button>
      <button
        onClick={handleSetManualMode}
        className={cn(
          HISTORY_SWITCH_STYLE.button.base,
          mode === 'manual'
            ? HISTORY_SWITCH_STYLE.button.on
            : HISTORY_SWITCH_STYLE.button.off
        )}
      >
        <Edit3 className="w-4 h-4 inline mr-2" />
        직접 입력
      </button>
    </div>
  );
}
