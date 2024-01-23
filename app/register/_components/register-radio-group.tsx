import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IconFemale, IconMale } from '@/style/icon';
import { UseFormRegisterReturn } from 'react-hook-form';

interface RegisterRadioGroupProps {
  register: UseFormRegisterReturn;
}

export default function RegisterRadioGroup({
  register,
}: RegisterRadioGroupProps) {
  return (
    <div className="w-full h-full">
      <RadioGroup {...register} className="flex h-full w-full justify-evenly">
        <div className="flex justify-center items-center gap-1">
          <RadioGroupItem value="male" id="male" />
          <IconMale className="w-5 h-5" />
          <Label htmlFor="male">male</Label>
        </div>
        <div className="flex justify-center items-center gap-1">
          <RadioGroupItem value="female" id="female" />
          <IconFemale className="w-5 h-5" />
          <Label htmlFor="female">female</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
