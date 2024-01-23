import ErrorMessage from '@/components/common/error-message';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IconFemale, IconMale } from '@/style/icon';
import { UseFormRegisterReturn } from 'react-hook-form';

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
      <label className="ml-3 mb-2 block text-sm font-bold text-slate-500">
        성별
      </label>
      <RadioGroup
        {...register}
        className="flex h-auto w-full justify-evenly min-h-10"
      >
        <div className="flex justify-center items-center gap-2" {...register}>
          <RadioGroupItem value="male" id="male" />
          <IconMale className="w-5 h-5" />
          <label htmlFor="male">남자</label>
        </div>
        <div className="flex justify-center items-center gap-2" {...register}>
          <RadioGroupItem value="female" id="female" />
          <IconFemale className="w-5 h-5" />
          <label htmlFor="female">여자</label>
        </div>
      </RadioGroup>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}
