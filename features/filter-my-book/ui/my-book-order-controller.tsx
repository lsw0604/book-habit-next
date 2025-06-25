import type { MyBookFilterControllerProps } from './types';
import { Controller } from 'react-hook-form';
import { useMyBookFilterOrder } from './hooks';
import Select from '@/shared/ui/select';
import { ErrorMessage } from '@/shared/ui/error-message';

export default function MyBookOrderController({
  control,
}: MyBookFilterControllerProps) {
  const { getOrderLabel, orderOptions } = useMyBookFilterOrder();

  return (
    <Controller
      name="order"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          <Select.ErrorBoundary>
            <Select onChange={onChange} value={value}>
              <Select.Trigger>{getOrderLabel(value)}</Select.Trigger>
              <Select.Content>
                {orderOptions.map(({ value, label }) => (
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
