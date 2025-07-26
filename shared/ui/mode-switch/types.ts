import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface ModeOption<T extends string> {
  value: T;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

export interface ModeSwitchProps<T extends string> {
  options: ModeOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
}