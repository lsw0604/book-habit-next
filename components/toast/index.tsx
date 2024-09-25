'use client';

import { motion } from 'framer-motion';
import { BanIcon, CheckIcon, InfoIcon, AlertTriangle } from 'lucide-react';
import { TOAST_VARIANT } from '@/constant/toast-variant';
import { cn } from '@/utils/cn';

const TOAST_ICONS: Record<ToastStatusType, JSX.Element> = {
  SUCCESS: <CheckIcon className="w-6 h-6 stroke-green-500" />,
  ERROR: <BanIcon className="w-6 h-6 stroke-rose-500" />,
  WARNING: <AlertTriangle className="w-6 h-6 stroke-amber-500" />,
  INFO: <InfoIcon className="w-6 h-6 stroke-blue-500" />,
};

interface ToastItemProps extends ToastType {
  index: number;
}

export default function Toast(toast: ToastItemProps) {
  const sizeClass: Record<number, string> = {
    0: '',
    1: 'scale-90',
    2: 'scale-80',
  };
  const positionClass: Record<number, string> = {
    0: '',
    1: 'translate-y-4',
    2: 'translate-y-8',
  };

  return (
    <motion.li
      role="alert"
      className={cn(
        'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7 bg-background text-foreground',
        sizeClass[toast.index],
        positionClass[toast.index]
      )}
      variants={TOAST_VARIANT}
      initial="initial"
      exit="exit"
      animate="animate"
    >
      {TOAST_ICONS[toast.status]}
      <h5 className="mb-1 font-medium leading-none tracking-tight">
        {toast.status}
      </h5>
      <div className="text-sm [&_p]:leading-relaxed">{toast.message}</div>
    </motion.li>
  );
}
