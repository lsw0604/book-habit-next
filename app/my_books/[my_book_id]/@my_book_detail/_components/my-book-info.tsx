'use client';

import { motion } from 'framer-motion';

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import ImageWrapper from '@/components/common/image-wrapper';
import MyBookTag from './my-book-tag';
import MyBookInfoTag from './my-book-info-tag';
import MyBookTagForm from './my-book-tag-form';
import MyBookTagToggle from './my-book-tag-toggle';
import MyBookTagButtons from './my-book-tag-buttons';

import useMyBookInfo from '@/hooks/my-book/useMyBookInfo';
import { createMarkUp } from '@/utils/create-mark-up';
import { cn } from '@/utils/class-name';

export default function MyBookInfo({
  payload,
}: {
  payload: Pick<ResponseGetMyBookDetail, 'book' | 'tag'>;
}) {
  const {
    openContent,
    openTag,
    editTag,
    openForm,
    handlers,
    navigateToTagSearch,
  } = useMyBookInfo();
  const { book, tag } = payload;

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex">
        <div className="flex w-full">
          <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
            <ImageWrapper
              src={book.thumbnail}
              alt={book.thumbnail}
              width={120}
              height={174}
              priority
            />
          </div>
          <div className="ml-4 flex flex-col grow">
            <a
              href={book.url}
              target="_blank"
              className="font-bold line-clamp-2 text-foreground text-base mt-1 hover:underline flex items-center"
            >
              {book.title}
            </a>
            <div
              onClick={handlers.openContentHandler}
              className={cn(
                'text-sm font-normal text-gray-800 cursor-pointer mt-2',
                !openContent ? 'line-clamp-6' : 'h-auto'
              )}
            >
              {book.contents === '' ? (
                '해당 책의 정보가 등록되지 않았습니다.'
              ) : (
                <p dangerouslySetInnerHTML={createMarkUp(book.contents)} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-2" />
      <div className="relative flex my-2">
        <div
          className={cn(
            'relative flex overflow-hidden',
            openTag ? 'flex-wrap' : 'flex-nowrap'
          )}
        >
          <MyBookInfoTag
            book={book}
            navigationToTagSearch={navigateToTagSearch}
          />
          {tag.map((tag) => (
            <MyBookTag tagProps={tag} key={tag.myBookTagId} editTag={editTag} />
          ))}
          <MyBookTagButtons tags={tag} handlers={handlers} />
        </div>
        <MyBookTagToggle
          openTag={openTag}
          openTagHandler={handlers.openTagHandler}
        />
      </div>
      {openForm && <MyBookTagForm />}
    </motion.div>
  );
}

MyBookInfo.Loader = function () {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex w-full">
          <Skeleton className="w-[120px] h-[174px]" />
          <div className="ml-4 flex flex-col grow">
            <Skeleton className="h-6 w-3/4 mt-1" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-full mt-1" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </div>
        </div>
      </div>
      <Separator className="mt-2" />
      <div className="flex w-full overflow-x-auto pb-2">
        <div className="overflow-auto flex gap-1 flex-nowrap w-max mt-2 no-scrollbar">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </div>
  );
};
