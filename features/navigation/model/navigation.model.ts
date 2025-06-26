import type { LucideIcon } from 'lucide-react';
import type { MouseEvent } from 'react';

export interface NavigationOption {
  label: string;
  href: string;
  icon: LucideIcon;
  isAuth: boolean;
}

export interface NavigationBtnProps {
  isActive: boolean;
  icon: LucideIcon;
  href: string;
  label: string;
  onClick: (e: MouseEvent) => void;
}
