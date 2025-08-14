import { Controller } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import { ModeSwitch } from '@/shared/ui/mode-switch';

import {
  type MyBookUpdateControllerProps,
  MY_BOOK_STATUS_UPDATE_OPTIONS,
} from '../model';

export default function MyBookUpdateStatusController({
  control,
}: MyBookUpdateControllerProps) {
  return (
    <Controller
      control={control}
      name="status"
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <>
          <ModeSwitch
            className="mt-2"
            options={MY_BOOK_STATUS_UPDATE_OPTIONS}
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
