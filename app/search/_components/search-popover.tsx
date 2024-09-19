import { ListFilterIcon } from 'lucide-react';

import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
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

interface SearchPopoverProps {
  size: number[];
  setSize: Dispatch<SetStateAction<number[]>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  target: string;
  setTarget: Dispatch<SetStateAction<string>>;
}

/**
 * TODO search-list 연결하기
 * TODO useForm 사용가능한지 알아보기
 */
export default function SearchPopover({
  size,
  setSize,
  sort,
  setSort,
  target,
  setTarget,
}: SearchPopoverProps) {
  const onChangeSize = useCallback(
    (value: number[]) => {
      setSize(value);
    },
    [setSize]
  );

  const onChangeSort = useCallback(
    (value: string) => {
      setSort(value);
    },
    [setSort]
  );

  const onChangeTarget = useCallback(
    (value: string) => {
      setTarget(value);
    },
    [setTarget]
  );

  return (
    <Popover>
      <Popover.Trigger>
        <Button type="button" className="rounded-full" variant="ghost">
          <ListFilterIcon className="w-4 h-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="top-12 right-0 px-2 py-4">
        <div className="px-4 w-60">
          <Label>Size : {size}</Label>
          <div className="w-full flex justify-center">
            <Slider
              className="my-4"
              defaultValue={[10]}
              value={size}
              step={10}
              min={10}
              max={50}
              onValueChange={onChangeSize}
            />
          </div>
        </div>
        <div className="px-4 w-60">
          <Label>sort</Label>
          <RadioGroup
            className="flex gap-2 my-2"
            value={sort}
            onValueChange={onChangeSort}
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
        </div>
        <div className="px-4 w-60">
          <Label>target</Label>
          <Select onValueChange={onChangeTarget} value={target}>
            <SelectTrigger className="my-2">
              <SelectValue placeholder={target} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">제목</SelectItem>
              <SelectItem value="isbn">ISBN</SelectItem>
              <SelectItem value="person">작가</SelectItem>
              <SelectItem value="publisher">출판사</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Popover.Content>
    </Popover>
  );
}
