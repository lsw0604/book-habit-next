import { XIcon } from 'lucide-react';
import Tag from '@/components/common/tag';
import { cn } from '@/utils/class-name';
import useMyBookTagRemove from '@/hooks/my-book-tag/useMyBookTagRemove';

interface MyBookTagProps {
  editTag: boolean;
  tagProps: MyBookTagType;
}

export default function MyBookTag({ tagProps, editTag }: MyBookTagProps) {
  const { handleRemoveTag } = useMyBookTagRemove();

  return (
    <div className="py-1 pr-2">
      <Tag
        className={cn(
          'whitespace-nowrap flex gap-1',
          editTag && 'animate-pulse'
        )}
      >
        <span className="font-bold">#</span> {tagProps.tag}
        {editTag && (
          <button
            type="button"
            aria-label="태그 삭제"
            className="cursor-pointer"
            onClick={() => handleRemoveTag(tagProps.myBookTagId)}
          >
            <XIcon className="w-4 h-4 cursor-pointer" />
          </button>
        )}
      </Tag>
    </div>
  );
}
