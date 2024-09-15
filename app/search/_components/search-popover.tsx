import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormRegister } from 'react-hook-form';

export default function SearchPopover({
  register,
}: {
  register: UseFormRegister<{
    search: string;
    sort: 'accuracy' | 'latest';
    size: number;
    target: 'title' | 'isbn' | 'publisher' | 'person';
  }>;
}) {
  return (
    <div className="w-full">
      <Label>Sort</Label>
      <RadioGroup
        className="flex h-auto w-full justify-evenly min-h-10"
        {...register('sort')}
      >
        <div className="flex justify-center items-center gap-2">
          <RadioGroupItem value="accuracy" id="accuracy" />
          <Label htmlFor="accuracy">정확도</Label>
        </div>
        <div className="flex justify-center items-center gap-2">
          <RadioGroupItem value="latest" id="latest" />
          <Label htmlFor="latest">최근순</Label>
        </div>
      </RadioGroup>
      <Label>Page Size</Label>
      <div className="flex h-auto w-full justify-evenly min-h-10">
        <Slider
          defaultValue={[10]}
          step={10}
          className="w-full"
          {...register('size', { valueAsNumber: true })}
          min={10}
          max={50}
        />
      </div>
      <Label className="mb-2">Target</Label>
      <div className="flex h-auto w-full justify-evenly min-h-10">
        <Select {...register('target')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="검색 종류를 선택해주세요." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="title">제목</SelectItem>
              <SelectItem value="isbn">isbn</SelectItem>
              <SelectItem value="person">작가</SelectItem>
              <SelectItem value="publisher">출판사</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
