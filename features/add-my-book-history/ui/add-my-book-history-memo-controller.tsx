import { Controller } from 'react-hook-form';

import { Label } from '@/shared/ui/label';
import { AutoSizeTextarea } from '@/shared/ui/textarea';

import { AddMyBookHistoryControllerProps } from '../model/types';

export default function AddMyBookHistoryMemoController({
  control,
}: AddMyBookHistoryControllerProps) {
  return (
    <Controller
      control={control}
      name="memo"
      render={({ field }) => (
        <div className="w-full h-auto my-2 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <Label
            htmlFor="memo"
            className="text-lg font-semibold text-gray-800 mb-4 block text-center"
          >
            메모를 남겨보세요
          </Label>
          <AutoSizeTextarea
            {...field}
            id="memo"
            placeholder="여기에 메모를 입력하세요..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      )}
    />
  );
}
