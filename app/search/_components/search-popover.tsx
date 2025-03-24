import { DotIcon, ListFilterIcon } from 'lucide-react';
import { Control, Controller, FormState } from 'react-hook-form';

import Popover from '@/components/common/popover';
import Select from '@/components/common/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ErrorMessage } from '@/components/common/error-message';
import { SearchParamsType } from '@/schemas/search/params';

interface SearchPopoverProps {
  control: Control<SearchParamsType>;
  formState: FormState<SearchParamsType>;
}

interface ControllerProps {
  control: Control<SearchParamsType>;
}

export default function SearchPopover({
  control,
  formState,
}: SearchPopoverProps) {
  const { errors } = formState;
  return (
    <Popover>
      <Popover.Trigger>
        {(!!errors.query?.message ||
          !!errors.size?.message ||
          !!errors.sort?.message ||
          !!errors.target?.message) && (
          <DotIcon className="absolute left-[-1.25rem] top-[-1.25rem] w-12 h-12 stroke-red-500" />
        )}
        <Button type="button" className="rounded-full" variant="ghost">
          <ListFilterIcon className="w-4 h-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="top-12 right-0 px-2 py-4 z-9999">
        <SearchPopoverTargetController control={control} />
        <SearchPopoverSizeController control={control} />
        <SearchPopoverSortController control={control} />
      </Popover.Content>
    </Popover>
  );
}

const SearchPopoverTargetController = ({ control }: ControllerProps) => {
  return (
    <Controller
      name="target"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="px-4 w-60">
          <Label className="text-sm font-bold">검색 유형</Label>
          <Select.ErrorBoundary>
            <Select onChange={onChange} value={value}>
              <Select.Trigger>
                {value === 'title' && '제목'}
                {value === 'isbn' && 'ISBN'}
                {value === 'person' && '작가'}
                {value === 'publisher' && '출판사'}
              </Select.Trigger>
              <Select.Content>
                <Select.Option value="title">제목</Select.Option>
                <Select.Option value="isbn">ISBN</Select.Option>
                <Select.Option value="person">작가</Select.Option>
                <Select.Option value="publisher">출판사</Select.Option>
              </Select.Content>
            </Select>
          </Select.ErrorBoundary>
          {!!error?.message && (
            <ErrorMessage className="my-2">{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

const SearchPopoverSizeController = ({ control }: ControllerProps) => {
  return (
    <Controller
      name="size"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="px-4 w-60">
          <Label className="text-sm font-bold">
            페이지 크기{' '}
            <span className="text-lg font-normal text-foreground">{value}</span>
          </Label>
          <Slider
            className="my-4"
            value={[value]}
            step={10}
            min={10}
            max={50}
            onValueChange={val => onChange(val[0])}
          />
          {!!error?.message && (
            <ErrorMessage className="my-2">{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

const SearchPopoverSortController = ({ control }: ControllerProps) => {
  return (
    <Controller
      name="sort"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="px-4 w-60">
          <Label className="text-sm font-bold">정렬 유형</Label>
          <RadioGroup
            className="flex gap-2 my-2"
            value={value}
            onValueChange={onChange}
          >
            <div className="w-full">
              <RadioGroupItem className="mr-2" value="accuracy" id="accuracy" />
              <Label htmlFor="accuracy">정확순</Label>
            </div>
            <div className="w-full">
              <RadioGroupItem className="mr-2" value="latest" id="latest" />
              <Label htmlFor="latest">최신순</Label>
            </div>
          </RadioGroup>
          {!!error?.message && (
            <ErrorMessage className="my-2">{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};
