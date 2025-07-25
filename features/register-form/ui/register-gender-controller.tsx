import type { RegisterControllerProps } from './types';
import { Controller } from 'react-hook-form';
import { Label } from '@/shared/ui/label';
import { ErrorMessage } from '@/shared/ui/error-message';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { IconFemale, IconMale } from '@/style/icon';

export default function RegisterGenderController({
  control,
}: RegisterControllerProps) {
  return (
    <Controller
      name="gender"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label className="text-xs ml-1 font-bold">성별</Label>
          <RadioGroup
            className="flex gap-2 my-2"
            value={value}
            onValueChange={onChange}
          >
            <div className="w-full flex gap-2 justify-center">
              <RadioGroupItem id="MALE" className="mr-2" value="MALE" />
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
}
