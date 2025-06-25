import type { MyBookFilterControllerProps } from './types';
import { Controller } from 'react-hook-form';
import { useMyBookFilterStatus } from './hooks';
import { ErrorMessage } from '@/shared/ui/error-message';
import Select from '@/shared/ui/select';

export default function MyBookStatusController({
  control,
}: MyBookFilterControllerProps) {
  const { getStatusLabel, statusOptions } = useMyBookFilterStatus();

  return (
    <Controller
      name="status"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          <Select.ErrorBoundary>
            <Select onChange={onChange} value={value}>
              <Select.Trigger>{getStatusLabel(value)}</Select.Trigger>
              <Select.Content>
                {statusOptions.map(({ value, label }) => (
                  <Select.Option key={value} value={value}>
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
      )}
    />
  );
}
