import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { AddMyBookHistoryType } from './schema';

export interface AddMyBookHistoryControllerProps {
  control: Control<AddMyBookHistoryType>;
}

export interface AddMyBookHistoryRegisterProps {
  register: UseFormRegister<AddMyBookHistoryType>;
}

export interface AddMyBookHistorySetValueProps {
  setValue: UseFormSetValue<AddMyBookHistoryType>;
  date: Date;
}
