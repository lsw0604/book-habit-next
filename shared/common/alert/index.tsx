import { AlertTriangle, BanIcon, CheckIcon, InfoIcon } from 'lucide-react';
import { cn } from '@/shared/utils/class-name';

const ALERT_ICONS: Record<ToastStatusType, JSX.Element> = {
  SUCCESS: <CheckIcon className="w-6 h-6 stroke-green-500" />,
  ERROR: <BanIcon className="w-6 h-6 stroke-rose-500" />,
  WARNING: <AlertTriangle className="w-6 h-6 stroke-amber-500" />,
  INFO: <InfoIcon className="w-6 h-6 stroke-blue-500" />,
};

const ALERT_STATUS_COLORS: Record<ToastStatusType, string> = {
  SUCCESS: 'text-green-500',
  ERROR: 'text-rose-500',
  WARNING: 'text-amber-500',
  INFO: 'text-blue-500',
};

interface AlertProps extends Pick<ToastType, 'status' | 'message'> {
  className?: string;
}

export default function Alert(alert: AlertProps) {
  return (
    <div
      id="alert"
      className="flex w-full items-start gap-2 p-2 text-foreground"
    >
      <div
        id="alert-icon"
        className={cn(
          'flex-shrink-0 flex flex-col justify-center items-center relative', // 레이아웃 및 위치
          'h-auto p-1', // 크기 조정
          'rounded-lg border border-gray-300 shadow-md', // 테두리 및 그림자
          'bg-background animate-bounce-small' // 배경 및 애니메이션
        )}
      >
        {ALERT_ICONS[alert.status]}
        <h5
          id="alert-status"
          className={cn(
            'mb-1 text-sm font-medium leading-none tracking-tight',
            ALERT_STATUS_COLORS[alert.status]
          )}
        >
          {alert.status}
        </h5>
      </div>
      <div
        id="alert-message"
        className="min-w-0 bg-background rounded-lg border border-gray-300 shadow-md flex items-center min-h-[calc(100%+0.5rem)]"
      >
        <p className="text-justify px-4 py-1 text-sm break-words">
          {alert.message}
        </p>
      </div>
    </div>
  );
}
