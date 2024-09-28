import { AlertTriangle, BanIcon, CheckIcon, InfoIcon } from 'lucide-react';
import { cn } from '@/utils/class-name';

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
    <div className="flex w-full items-start gap-2 p-2 text-foreground">
      <div className="flex-shrink-0 relative rounded-lg border border-gray-300 shadow-md p-1 h-auto text-sm bg-background text-foreground justify-center items-center flex flex-col animate-bounce-small">
        {ALERT_ICONS[alert.status]}
        <h5
          className={cn(
            'mb-1 text-sm font-medium leading-none tracking-tight',
            ALERT_STATUS_COLORS[alert.status]
          )}
        >
          {alert.status}
        </h5>
      </div>
      <div className="flex-grow min-w-0 min-h-full bg-background rounded-lg border border-gray-300 shadow-md">
        <p className="text-justify px-4 py-1 text-sm break-words">
          {alert.message}
        </p>
      </div>
    </div>
  );
}
