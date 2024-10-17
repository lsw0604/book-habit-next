import { getTimeDescription } from '@/utils/date';

export default function MyBookCommentItem({
  comment,
  createdAt,
  updatedAt,
  isPublic,
}: MyBookCommentItemType) {
  return (
    <button className="flex flex-col gap-2 p-2 border-2 transition-all text-left text-sm w-full mb-1 rounded-md">
      <div className="flex w-full">
        <span className="text-sm font-semibold">
          {isPublic ? '공개' : '비공개'}
        </span>
        <span className="ml-auto text-xs opacity-50">
          {getTimeDescription(createdAt, updatedAt)}
        </span>
      </div>
      <div className="text-sm font-normal text-gray-800 cursor-pointer line-clamp-2">
        {comment}
      </div>
    </button>
  );
}
