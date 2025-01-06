'use client';

import MyBookTagForm from './my-book-tag-form';
import MyBookTagToggle from './my-book-tag-toggle';
import MyBookTagButton from './my-book-tag-button';
import MyBookTagController from './my-book-tag-controller';
import useMyBookInfo from '@/hooks/my-book/useMyBookInfo';
import { cn } from '@/utils/class-name';

interface MyBookTagProps {
  data: Pick<ResponseGetMyBookDetail, 'tag'>;
}

export default function MyBookTag({ data }: MyBookTagProps) {
  const { tag } = data;
  const { openTag, handlers, editTag, openForm } = useMyBookInfo();

  return (
    <>
      <div className="relative flex my-2">
        <div
          className={cn(
            'relative flex overflow-hidden',
            openTag ? 'flex-wrap' : 'flex-nowrap'
          )}
        >
          {tag.map((tag) => (
            <MyBookTagButton
              tagProps={tag}
              key={`${tag.tag}-${tag.myBookTagId}`}
              editTag={editTag}
            />
          ))}
          <MyBookTagController tags={tag} handlers={handlers} />
        </div>
        <MyBookTagToggle
          openTag={openTag}
          openTagHandler={handlers.openTagHandler}
        />
      </div>
      {openForm && <MyBookTagForm />}
    </>
  );
}
