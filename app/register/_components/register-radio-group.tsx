import { UseFormRegisterReturn } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { ErrorMessage } from '@/components/common/error-message';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IconFemale, IconMale } from '@/style/icon';

interface RegisterRadioGroupProps {
  register: UseFormRegisterReturn;
  errorMessage?: string;
  isValid?: boolean;
  useValidation?: boolean;
}

export default function RegisterRadioGroup({
  register,
  errorMessage,
  isValid,
  useValidation,
}: RegisterRadioGroupProps) {
  return (
    <>
      <Label className="ml-3 mb-2 block text-sm font-bold text-slate-500">
        성별
      </Label>
      <RadioGroup
        {...register}
        className="flex h-auto w-full justify-evenly min-h-10"
      >
        <div className="flex justify-center items-center gap-2" {...register}>
          <RadioGroupItem value="male" id="male" />
          <IconMale className="w-5 h-5" />
          <Label htmlFor="male">남자</Label>
        </div>
        <div className="flex justify-center items-center gap-2" {...register}>
          <RadioGroupItem value="female" id="female" />
          <IconFemale className="w-5 h-5" />
          <Label htmlFor="female">여자</Label>
        </div>
      </RadioGroup>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </>
  );
}
