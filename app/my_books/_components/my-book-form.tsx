import { Controller } from 'react-hook-form';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import ErrorMessage from '@/components/common/error-message';
import useGetMyBookHook from '@/hooks/my-book/useGetMyBookHook';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ListFilterIcon } from 'lucide-react';
import Popover from '@/components/common/popover';
export default function MyBookForm() {
  const { control } = useGetMyBookHook();

  return (
    <Popover>
      <Popover.Trigger>
        <Button variant="ghost" className="rounded-full">
          <ListFilterIcon className="w-4 h-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <form className="p-4">
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="focus:ring-0 ring-offset-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ALL">전체보기</SelectItem>
                      <SelectItem value="TO_READ">서재에 저장됨</SelectItem>
                      <SelectItem value="START_READ">읽기시작함</SelectItem>
                      <SelectItem value="READING">읽는중</SelectItem>
                      <SelectItem value="READ">다읽음</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {!!error && error.message && (
                  <ErrorMessage message={error.message} />
                )}
              </div>
            )}
          />
          <Controller
            name="order"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <RadioGroup
                  className="flex gap-2 my-2"
                  value={value}
                  onValueChange={onChange}
                >
                  <div className="w-full">
                    <RadioGroupItem className="mr-2" value="desc" id="desc" />
                    <Label htmlFor="desc">최신순</Label>
                  </div>
                  <div className="w-full">
                    <RadioGroupItem className="mr-2" value="asc" id="asc" />
                    <Label htmlFor="acs">등록순</Label>
                  </div>
                </RadioGroup>
                {!!error?.message && (
                  <ErrorMessage message={error.message} className="my-2" />
                )}
              </div>
            )}
          />
        </form>
      </Popover.Content>
    </Popover>
  );
}
