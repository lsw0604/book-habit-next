'use client';

import { Control, Controller } from 'react-hook-form';
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from 'lucide-react';
import { useDebounceCallback } from 'usehooks-ts';

import { ErrorMessage } from '@/components/common/error-message';
import { Button } from '@/components/ui/button';
import Select from '@/components/common/select';
import useAutoSubmit from '@/hooks/form/useAutoSubmit';
import useMyBookRouter from '@/hooks/my-book/useMyBookRouter';
import useMyBookParams from '@/hooks/my-book/useMyBookParams';
import useMyBookParamsForm from '@/hooks/form/my-book/useMyBookParamsForm';
import { MyBookParamsSchemaType } from '@/hooks/form/my-book/schema/params.schema';

export default function MyBookForm() {
  const { order, status } = useMyBookParams();
  const { control, watch } = useMyBookParamsForm({ order, status });
  const { pushToMyBookList } = useMyBookRouter();

  useAutoSubmit<MyBookParamsSchemaType>({
    watch,
    onSubmit: useDebounceCallback((data) => {
      pushToMyBookList(data);
    }, 500),
    dependencies: [watch, pushToMyBookList],
  });

  return (
    <form className="p-4 flex w-full max-w-96 min-w-[240px] border-1 border-gray-300 rounded-lg shadow-lg bg-popover">
      <MyBookOrderController control={control} />
      <MyBookStatusController control={control} />
    </form>
  );
}

interface ControllerProps {
  control: Control<MyBookParamsSchemaType>;
}

const MyBookStatusController = ({ control }: ControllerProps) => {
  return (
    <Controller
      name="status"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          <Select.ErrorBoundary>
            <Select onChange={onChange} value={value}>
              <Select.Trigger>
                {value === 'ALL' && '전체보기'}
                {value === 'TO_READ' && '서재에 저장됨'}
                {value === 'START_READ' && '읽기시작함'}
                {value === 'READING' && '읽는중'}
                {value === 'READ' && '다읽음'}
              </Select.Trigger>
              <Select.Content>
                <Select.Option value="ALL">전체보기</Select.Option>
                <Select.Option value="TO_READ">서재에 저장됨</Select.Option>
                <Select.Option value="START_READ">읽기시작함</Select.Option>
                <Select.Option value="READING">읽는중</Select.Option>
                <Select.Option value="READ">다읽음</Select.Option>
              </Select.Content>
            </Select>
          </Select.ErrorBoundary>
          {!!error && error.message && (
            <ErrorMessage>{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

const MyBookOrderController = ({ control }: ControllerProps) => {
  return (
    <Controller
      name="order"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="text-gray-300 mr-4">
          {value === 'desc' ? (
            <Button
              value="asc"
              onClick={() => onChange('asc')}
              type="button"
              className="p-0 rounded-full"
              variant="ghost"
            >
              <ArrowDownNarrowWideIcon />
            </Button>
          ) : (
            <Button
              value="desc"
              onClick={() => onChange('desc')}
              type="button"
              className="p-0 rounded-full"
              variant="ghost"
            >
              <ArrowUpNarrowWideIcon />
            </Button>
          )}
          {!!error && error.message && (
            <ErrorMessage>{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};
