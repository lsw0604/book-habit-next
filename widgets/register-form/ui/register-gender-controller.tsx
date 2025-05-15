import { Controller } from 'react-hook-form';
import { RegisterControllerProps } from '../model/types';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { IconFemale, IconMale } from '@/style/icon';
import { ErrorMessage } from '@/shared/ui/error-message';

const RegisterGenderController: React.FC<RegisterControllerProps> = ({
  control,
}) => {
  return (
    <Controller
      name="gender"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>성별</Label>
          <RadioGroup
            className="flex gap-2 my-2"
            value={value}
            onValueChange={onChange}
          >
            <div className="w-full flex gap-2 justify-center">
              <RadioGroupItem className="mr-2" value="MALE" id="MALE" />
              <IconMale className="w-5 h-5" />
              <Label htmlFor="MALE">남성</Label>
            </div>
            <div className="w-full flex gap-2 justify-center">
              <RadioGroupItem className="mr-2" value="FEMALE" id="FEMALE" />
              <IconFemale className="w-5 h-5" />
              <Label htmlFor="FEMALE">여성</Label>
            </div>
          </RadioGroup>
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

export default RegisterGenderController;
