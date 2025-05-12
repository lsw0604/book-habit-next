import type { MyBookControllerProps } from '@/features/my-book/model/types';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from '@/shared/ui/select';
import { ErrorMessage } from '@/shared/ui/error-message';
import { useOrderController } from '@/features/my-book/model';

const MyBookOrderController: React.FC<MyBookControllerProps> = ({
  control,
}) => {
  const { getOrderLabel, orderOptions } = useOrderController();
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
};

export default MyBookOrderController;
