'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/utils/class-name';

const labelVariants = cva('font-medium leading-none transition-colors', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>;

const peerDisabledCases =
  'peer-disabled:opacity-70 peer-disabled:cursor-not-allowed';
const groupDisabledCases =
  'group-has-[:disabled]:opacity-70 group-has-[:disabled]:cursor-not-allowed';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants({ size }),
      peerDisabledCases,
      groupDisabledCases,
      className
    )}
    {...props}
  />
));

Label.displayName = 'Label';

export { Label };
