'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { InputDatepicker } from '@/shared/ui/input-datepicker';

import type { RegisterType } from '../../schemas';

export function RegisterBirthdayContainer() {
  const { control } = useFormContext<RegisterType>();

  return (
    <Controller
      name="birthday"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
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
      )}
    />
  );
}
