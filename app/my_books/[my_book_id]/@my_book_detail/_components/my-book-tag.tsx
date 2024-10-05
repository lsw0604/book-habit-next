import { ChevronDownIcon, XIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Tag from '@/components/common/tag';
import { cn } from '@/utils/class-name';
import MyBookTagForm from './my-book-tag-form';
import useMyBookTagMutation from '@/queries/my-book-tag/useMyBookTagMutation';
import useToastHook from '@/hooks/toast/useToastHook';

interface MyBookTagProps {
  tags: MyBookTagType[];
}

export default function MyBookTag({ tags }: MyBookTagProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { successToast } = useToastHook();
  const { removeMyBookTag } = useMyBookTagMutation();
  const { mutate, isSuccess } = removeMyBookTag();

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const removeTag = (myBookTagId: number) => {
    mutate({ myBookTagId });
  };

  useEffect(() => {
    if (isSuccess) {
      successToast('태그가 삭제되었습니다.');
    }
  }, [isSuccess]);

  return (
    <>
      <div className="flex w-full overflow-x-auto pb-2">
        <div className="overflow-auto flex-1 flex gap-1 flex-nowrap w-max mt-2 no-scrollbar">
          {tags.length === 0 ? (
            <p className="text-gray-500 text-sm">등록된 태그가 없습니다.</p>
          ) : (
            tags.map((tag) => (
              <Tag className="whitespace-nowrap flex gap-1" key={tag.tag}>
                <span className="font-bold">#</span> {tag.tag}{' '}
                <XIcon
                  className="w-4 h-4"
                  onClick={() => {
                    removeTag(tag.myBookTagId);
                  }}
                />
              </Tag>
            ))
          )}
        </div>
        <div className="cursor-pointer" onClick={handleDropdown}>
          <ChevronDownIcon
            className={cn(
              'w-4 h-4 opacity-50 transition-transform duration-200 mt-2',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </div>
      {isOpen && <MyBookTagForm />}
    </>
  );
}
