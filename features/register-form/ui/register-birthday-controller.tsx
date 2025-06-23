import { Controller } from 'react-hook-form';
import { RegisterControllerProps } from './types';
import { Label } from '@/shared/ui/label';
import { InputDatePicker } from '@/shared/ui/date-picker';
import { ErrorMessage } from '@/shared/ui/error-message';

const RegisterBirthdayController: React.FC<RegisterControllerProps> = ({
  control,
}) => {
  return (
    <Controller
      name="birthday"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <div className="w-full relative mb-2">
            <Label>생년월일</Label>
            <InputDatePicker
              className="border-slate-500 border-2"
              value={value}
              onChange={onChange}
            />
            {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        );
      }}
    />
  );
};

export default RegisterBirthdayController;
