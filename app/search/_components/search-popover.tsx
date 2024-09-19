import { ListFilterIcon } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';

import Popover from '@/components/common/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { SearchType } from '@/schemas/search.schema';

interface SearchPopoverProps {
  control: Control<SearchType>;
}

export default function SearchPopover({ control }: SearchPopoverProps) {
  return (
    <Popover>
      <Popover.Trigger>
        <Button type="button" className="rounded-full" variant="ghost">
          <ListFilterIcon className="w-4 h-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="top-12 right-0 px-2 py-4">
        <div className="px-4 w-60">
          <Label>검색 유형</Label>
          <Controller
            name="target"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="my-2">
                  <SelectValue placeholder={value} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">제목</SelectItem>
                  <SelectItem value="isbn">ISBN</SelectItem>
                  <SelectItem value="person">작가</SelectItem>
                  <SelectItem value="publisher">출판사</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <Controller
          name="size"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="px-4 w-60">
              <Label>페이지 크기 {value}</Label>
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
          <Label>정렬 유형</Label>
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
