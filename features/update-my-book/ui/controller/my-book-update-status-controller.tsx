import { Controller, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import { ModeSwitch } from '@/shared/ui/mode-switch';

import { UPDATE_MY_BOOK_STATUS_OPTIONS } from '../../constants';
import type { UpdateMyBookType } from '../../schemas';

export function MyBookUpdateStatusController() {
  const { control } = useFormContext<UpdateMyBookType>();
  return (
    <Controller
      control={control}
      name="status"
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <>
          <ModeSwitch
            options={UPDATE_MY_BOOK_STATUS_OPTIONS}
            value={value}
            onValueChange={onChange}
          />
          {!!errors?.status?.message && (
            <ErrorMessage>{errors.status.message}</ErrorMessage>
          )}
        </>
      )}
    />
  );
}
