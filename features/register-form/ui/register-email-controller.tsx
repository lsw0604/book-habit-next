import { Controller } from 'react-hook-form';
import { RegisterControllerProps } from './types';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { MailIcon } from 'lucide-react';
import { ErrorMessage } from '@/shared/ui/error-message';

const RegisterEmailController: React.FC<RegisterControllerProps> = ({
  control,
}) => {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>이메일</Label>
          <Input
            {...field}
            autoComplete="off"
            icon={<MailIcon className="w-5 h-5" />}
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

export default RegisterEmailController;
