import * as React from 'react';

import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';

import { cn } from '../utils';

export interface LabelledSwitchProps
  extends React.ComponentPropsWithoutRef<typeof Switch> {
  label: string;
  description?: string;
}

const LabelledSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  LabelledSwitchProps
>(({ className, label, description, ...props }, ref) => {
  const id = React.useId();
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg border p-4',
        className
      )}
    >
      <div className="space-y-0.5">
        <Label htmlFor={id} className="text-base font-medium">
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch ref={ref} id={id} {...props} />
    </div>
  );
});
LabelledSwitch.displayName = 'LabelledSwitch';

export { LabelledSwitch };
