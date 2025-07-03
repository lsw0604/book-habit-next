import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  iconClick?: () => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}
