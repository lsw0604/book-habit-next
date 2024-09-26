import { DotIcon, ListFilterIcon } from 'lucide-react';
import { Control, Controller, FormState } from 'react-hook-form';

import Popover from '@/components/common/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SearchSchemaType } from '@/schemas/search.schema';
import ErrorMessage from '@/components/common/error-message';

interface SearchPopoverProps {
  control: Control<SearchSchemaType>;
  formState: FormState<SearchSchemaType>;
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
        <Controller
          name="target"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="px-4 w-60">
              <Label className="text-sm font-bold">검색 유형</Label>
              <RadioGroup
                className="my-2 flex gap-2"
                value={value}
                onValueChange={onChange}
              >
                <div className="w-full">
                  <div className="w-full">
                    <RadioGroupItem className="mr-2" value="title" id="title" />
                    <Label htmlFor="title">제목</Label>
                  </div>
                  <div className="w-full">
                    <RadioGroupItem className="mr-2" value="isbn" id="isbn" />
                    <Label htmlFor="isbn">ISBN</Label>
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full">
                    <RadioGroupItem
                      className="mr-2"
                      value="person"
                      id="person"
                    />
                    <Label htmlFor="person">작가</Label>
                  </div>
                  <div className="w-full">
                    <RadioGroupItem
                      className="mr-2"
                      value="publisher"
                      id="publisher"
                    />
                    <Label htmlFor="publisher">출판사</Label>
                  </div>
                </div>
              </RadioGroup>
              {!!error?.message && (
                <ErrorMessage message={error.message} className="my-2" />
              )}
            </div>
          )}
        />
        <Controller
          name="size"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="px-4 w-60">
              <Label className="text-sm font-bold">
                페이지 크기{' '}
                <span className="text-lg font-normal text-foreground">
                  {value}
                </span>
              </Label>
              <Slider
                className="my-4"
                value={[value]}
                step={10}
                min={10}
                max={50}
                onValueChange={(val) => onChange(val[0])}
              />
              {!!error?.message && (
                <ErrorMessage message={error.message} className="my-2" />
              )}
            </div>
          )}
        />
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
                  <RadioGroupItem
                    className="mr-2"
                    value="accuracy"
                    id="accuracy"
                  />
                  <Label htmlFor="accuracy">정확순</Label>
                </div>
                <div className="w-full">
                  <RadioGroupItem className="mr-2" value="latest" id="latest" />
                  <Label htmlFor="latest">최신순</Label>
                </div>
              </RadioGroup>
              {!!error?.message && (
                <ErrorMessage message={error.message} className="my-2" />
              )}
            </div>
          )}
        />
      </Popover.Content>
    </Popover>
  );
}
