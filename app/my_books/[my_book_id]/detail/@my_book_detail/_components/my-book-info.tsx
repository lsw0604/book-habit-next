import { motion } from 'framer-motion';

import { Separator } from '@/components/ui/separator';
import ImageWrapper from '@/components/common/image-wrapper';
import MyBookInfoTag from './my-book-info-tag';

import useMyBookInfo from '@/hooks/my-book/useMyBookInfo';
import { createMarkUp } from '@/utils/create-mark-up';
import { cn } from '@/utils/class-name';

interface MyBookInfoProps {
  data: Pick<ResponseGetMyBookDetail, 'book' | 'tag'>;
}

export default function MyBookInfo({ data }: MyBookInfoProps) {
  const { openContent, handlers } = useMyBookInfo();

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
              src={data.book.thumbnail}
              alt={data.book.thumbnail}
              width={120}
              height={174}
              priority
            />
          </div>
          <div className="ml-4 flex flex-col grow">
            <a
              href={data.book.url}
              target="_blank"
              className="font-bold line-clamp-2 text-foreground text-base mt-1 hover:underline flex items-center"
            >
              {data.book.title}
            </a>
            <div
              onClick={handlers.openContentHandler}
              className={cn(
                'text-sm font-normal text-gray-800 cursor-pointer mt-2',
                !openContent ? 'line-clamp-6' : 'h-auto'
              )}
            >
              {data.book.contents === '' ? (
                '해당 책의 정보가 등록되지 않았습니다.'
              ) : (
                <p dangerouslySetInnerHTML={createMarkUp(data.book.contents)} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-2" />
      <MyBookInfoTag data={data} />
    </motion.div>
  );
}
