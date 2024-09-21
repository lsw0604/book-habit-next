import { ListFilterIcon } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';

import Popover from '@/components/common/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SearchSchemaType } from '@/schemas/search.schema';

interface SearchPopoverProps {
  control: Control<SearchSchemaType>;
}

export default function SearchPopover({ control }: SearchPopoverProps) {
  return (
    <Popover>
      <Popover.Trigger>
        <Button type="button" className="rounded-full" variant="ghost">
          <ListFilterIcon className="w-4 h-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="top-12 right-0 px-2 py-4 z-9999">
        <div className="px-4 w-60">
          <Label className="text-sm font-bold">검색 유형</Label>
          <Controller
            name="target"
            control={control}
            render={({ field: { onChange, value } }) => (
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
                      value="author"
                      id="author"
                    />

                    <Label htmlFor="author">작가</Label>
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
            )}
          />
        </div>
        <Controller
          name="size"
          control={control}
          render={({ field: { onChange, value } }) => (
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
            </div>
          )}
        />
        <div className="px-4 w-60">
          <Label className="text-sm font-bold">정렬 유형</Label>
          <Controller
            name="sort"
            control={control}
            render={({ field: { onChange, value } }) => (
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
            )}
          />
        </div>
      </Popover.Content>
    </Popover>
  );
}
