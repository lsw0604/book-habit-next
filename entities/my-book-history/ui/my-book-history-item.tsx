'use client';

import { format } from 'date-fns';
import {
  BookOpenIcon,
  ChevronRightIcon,
  Clock1Icon,
  MessageSquareTextIcon,
} from 'lucide-react';
import { memo } from 'react';

import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';

import {
  truncateMemo,
  calculatePages,
  parseMoodLabel,
  generateReadingCommentary,
} from '../lib';
import {
  type MyBookHistory,
  type SerializedMyBookHistory,
  serializeMyBookHistory,
} from '../model';

interface MyBookHistoryItemProps {
  history: MyBookHistory;
  onClick?: (history: SerializedMyBookHistory) => void;
}

function MyBookHistoryItemComponent({
  history,
  onClick,
}: MyBookHistoryItemProps) {
  const pagesRead = calculatePages(history.startPage, history.endPage);
  const formattedStartTime = format(history.startTime, 'HH:mm');
  const formattedEndTime = format(history.endTime, 'HH:mm');
  const commentary = generateReadingCommentary(history);
  const { emoji, label } = parseMoodLabel(history.readingMood);

  const openDetailModal = () => {
    onClick?.(serializeMyBookHistory(history));
  };

  return (
    <Card
      className="w-full overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer gap-0 border"
      onClick={openDetailModal}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          openDetailModal();
        }
      }}
    >
      {/* Card Header with Mood */}
      <CardHeader className="px-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <Badge variant="outline">{label}</Badge>
        </div>
        <ChevronRightIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      </CardHeader>
      {/* Card Content with Stats */}
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Pages Read */}
          <div className="bg-transparent border rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">
                읽은 페이지
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">
                {pagesRead}
                <span className="text-lg font-normal">p</span>
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                {history.startPage}p - {history.endPage}p
              </span>
            </div>
          </div>
          {/* Reading Time */}
          <div className="bg-transparent border rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Clock1Icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">
                독서 시간
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">
                {history.readingMinutes}
                <span className="text-lg font-normal">분</span>
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                {formattedStartTime} ~ {formattedEndTime}
              </span>
            </div>
          </div>
        </div>
        {/* Memo Section - Only show if memo exists */}
        <div className="mt-4 bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <MessageSquareTextIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">메모</span>
          </div>
          <p className="text-sm text-foreground line-clamp-2">
            {truncateMemo(history.memo)}
          </p>
        </div>
      </CardContent>
      {/* Card Footer with Commentary */}
      <CardFooter className="px-4 bg-transparent flex items-center justify-between">
        <p className="text-sm text-muted-foreground italic pl-2 border-l-2">
          {commentary}
        </p>
      </CardFooter>
    </Card>
  );
}

export const MyBookHistoryItem = memo(MyBookHistoryItemComponent);
