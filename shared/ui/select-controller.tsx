'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import Select from '@/shared/ui/select';

export interface SelectOption<T> {
  readonly value: T;
  readonly label: string;
}

interface SelectControllerProps<T extends FieldValues, V extends string> {
  control: Control<T>;
  name: Path<T>;
  options: readonly SelectOption<V>[];
}

export function SelectController<T extends FieldValues, V extends string>({
  control,
  name,
  options,
}: SelectControllerProps<T, V>) {
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
                    <Select.Option key={String(optionValue)} value={optionValue}>
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
