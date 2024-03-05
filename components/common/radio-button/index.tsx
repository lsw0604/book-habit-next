import { cn } from '@/lib/utils';
import ErrorMessage from '../error-message';

interface RadioButtonProps {
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  isValid?: boolean;
  useValidation?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: RadioButtonOptionProps[];
}

interface RadioButtonOptionProps {
  label: string;
  value: string;
  description?: string;
  icon?: JSX.Element;
}

export default function RadioButton({
  label,
  errorMessage,
  disabled,
  value,
  isValid,
  useValidation,
  onChange,
  options,
}: RadioButtonProps) {
  return (
    <div className="w-full h-full px-2 py-0">
      {label && <label className="ml-2 mb-2 block text-sm">{label}</label>}
      <div className="flex after:clear-both after:content-none">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-center justify-center w-full h-full cursor-pointer rounded-lg border-solid border-2 border-slate-100',
              value === option.value && 'border-solid border-rose-300 border-2'
            )}
          >
            <input
              type="radio"
              className="w-0 h-0 m-0 relative appearance-none outline-none"
              id={`radio-${option.value}`}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
            />
            <label
              className={cn(
                'h-auto w-full grid grid-rows-1 justify-center text-xl',
                !!option.description && 'text-base grid-rows-2'
              )}
              htmlFor={`radio-${option.value}`}
            >
              {option.icon && <i className="w-4 h-4">{option.icon}</i>}
              <div>{option.label}</div>
              {option.description && (
                <span className="text-xxs max-w-24 truncate">
                  {option.description}
                </span>
              )}
            </label>
          </label>
        ))}
      </div>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </div>
  );
}
