import type { RegisterControllerProps } from '../model/types';
import { Controller } from 'react-hook-form';
import { UserIcon } from 'lucide-react';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { ErrorMessage } from '@/shared/ui/error-message';

const RegisterNameController: React.FC<RegisterControllerProps> = ({
  control,
}) => {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>이름</Label>
          <Input
            {...field}
            autoComplete="off"
            icon={<UserIcon className="w-5 h-5" />}
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

export default RegisterNameController;
