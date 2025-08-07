import { Controller } from 'react-hook-form';

import { AddMyBookHistoryControllerProps } from '../model/types';

export default function AddMyBookHistoryMemoController({
  control,
}: AddMyBookHistoryControllerProps) {
  return (
    <Controller
      control={control}
      name="memo"
      render={({ field }) => <input {...field} />}
    />
  );
}
