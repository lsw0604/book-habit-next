import { Controller, Control, FieldValues, Path } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import Select from '@/shared/ui/select';

interface FilterOption {
  readonly value: string;
  readonly label: string;
}

interface MyBookFilterControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: readonly FilterOption[];
}

export default function MyBookFilterController<T extends FieldValues>({
  control,
  name,
  options,
}: MyBookFilterControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const currentLabel =
          options.find(opt => opt.value === value)?.label || '';
        return (
          <div className="w-full">
            <Select.ErrorBoundary>
              <Select onChange={onChange} value={value}>
                <Select.Trigger>{currentLabel}</Select.Trigger>
                <Select.Content>
                  {options.map(({ value: optionValue, label }) => (
                    <Select.Option key={optionValue} value={optionValue}>
                      {label}
                    </Select.Option>
                  ))}
                </Select.Content>
              </Select>
            </Select.ErrorBoundary>
            {!!error && error.message && (
              <ErrorMessage>{error.message}</ErrorMessage>
            )}
          </div>
        );
      }}
    />
  );
}
