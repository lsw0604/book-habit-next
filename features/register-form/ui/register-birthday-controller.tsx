import type { RegisterControllerProps } from './types';
import { Controller } from 'react-hook-form';
import { InputDatepicker } from '@/shared/ui/input-datepicker';

export default function RegisterBirthdayController({
  control,
}: RegisterControllerProps) {
  return (
    <Controller
      name="birthday"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <div className="w-full relative mb-2">
            <InputDatepicker
              id="birthday"
              label="생년월일"
              value={value}
              onChange={onChange}
              error={!!error}
              errorMessage={error?.message}
            />
          </div>
        );
      }}
    />
  );
}
