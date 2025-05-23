import type { MyBookFilterControllerProps } from '@/features/filter-my-book/model';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useStatusOptions } from '@/entities/my-book/lib';
import Select from '@/shared/ui/select';
import { ErrorMessage } from '@/shared/ui/error-message';

const MyBookFilterStatusController: React.FC<MyBookFilterControllerProps> = ({
  control,
}) => {
  const { filterOptions, getFilterLabel } = useStatusOptions();
  return (
    <Controller
      name="status"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          <Select.ErrorBoundary>
            <Select onChange={onChange} value={value}>
              <Select.Trigger>{getFilterLabel(value)}</Select.Trigger>
              <Select.Content>
                {filterOptions.map(({ value, label }) => (
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

export default MyBookFilterStatusController;
