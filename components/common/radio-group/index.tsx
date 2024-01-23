import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorMessage from '../error-message';

interface RadioGroupProps {
  label?: string;
  register: UseFormRegisterReturn;
  options: RadioOptionProps[];
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

interface RadioOptionProps {
  label: string;
  value: string;
  description?: string;
  icon?: JSX.Element;
}

export default function RadioGroup({
  label,
  options,
  register,
  errorMessage,
  isValid,
  useValidation,
}: RadioGroupProps) {
  return (
    <form {...register}>
      {label && <label>{label}</label>}
      <div className="w-full h-auto">
        {options.map((option) => (
          <div key={option.value}>
            <input type="radio" {...register} />
            {option.icon && <i>{option.icon}</i>}
            <label htmlFor={option.value}>
              <span>{option.label}</span>
              {option.description && <span>{option.description}</span>}
            </label>
          </div>
        ))}
      </div>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </form>
  );
}
