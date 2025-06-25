import type { MyBookUpdateControllerProps } from './types';
import { Controller } from 'react-hook-form';
import { useStatusOptions } from '@/entities/my-book/ui';
import Select from '@/shared/ui/select';
import { ErrorMessage } from '@/shared/ui/error-message';

export default function MyBookUpdateStatusController({
  control,
}: MyBookUpdateControllerProps) {
  const { statusOptions, getStatusLabel } = useStatusOptions();
  return (
    <Controller
      control={control}
      name="status"
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <>
          <Select.ErrorBoundary>
            <Select value={value as string} onChange={onChange}>
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
          {!!errors?.status?.message && (
            <ErrorMessage>{errors.status.message}</ErrorMessage>
          )}
        </>
      )}
    />
  );
}
