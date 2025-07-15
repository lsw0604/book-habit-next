import { type InputHTMLAttributes, forwardRef, useState } from 'react';

interface TimeInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ ...props }, ref) => {
    const [flag, setFlag] = useState<boolean>(false);
    const [] = useState();
    return <input ref={ref} {...props} type="tel" />;
  }
);

TimeInput.displayName = 'TimeInput';

export default TimeInput;
