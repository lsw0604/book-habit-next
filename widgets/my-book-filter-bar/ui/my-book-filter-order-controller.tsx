import type { MyBookFilterControllerProps } from '@/features/filter-my-book/model/types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useOrderOptions } from '@/entities/my-book/lib';
import Select from '@/shared/ui/select';
import { ErrorMessage } from '@/shared/ui/error-message';

const MyBookFilterOrderController: React.FC<MyBookFilterControllerProps> = ({
  control,
}) => {
  const { orderOptions, getOrderLabel } = useOrderOptions();

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

export default MyBookFilterOrderController;
