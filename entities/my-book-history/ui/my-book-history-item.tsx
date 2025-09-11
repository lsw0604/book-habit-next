'use client';

import { ChevronRightIcon } from 'lucide-react';
import { memo, useCallback } from 'react';

import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';

import {
  type MyBookHistory,
  type SerializedMyBookHistory,
  serializeMyBookHistory,
} from '../model';

import {
  MyBookHistoryBadge,
  MyBookHistoryMemo,
  MyBookHistoryReadPage,
  MyBookHistoryReadTime,
  MyBookHistoryDateLabel,
} from './components';

interface MyBookHistoryItemProps {
  history: MyBookHistory;
  onClick?: (history: SerializedMyBookHistory) => void;
}

function MyBookHistoryItemComponent({
  history,
  onClick,
}: MyBookHistoryItemProps) {
  const openDetailModal = useCallback(() => {
    onClick?.(serializeMyBookHistory(history));
  }, [history, onClick]);

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
      <CardHeader className="px-4 flex flex-row items-center justify-between">
        <MyBookHistoryBadge history={history} />
        <ChevronRightIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <MyBookHistoryReadPage history={history} />
          <MyBookHistoryReadTime history={history} />
        </div>
        <MyBookHistoryMemo
          history={history}
          maxLength={70}
          variant="truncated"
        />
      </CardContent>
      <CardFooter className="px-4 bg-transparent flex items-center justify-between">
        <MyBookHistoryDateLabel history={history} />
      </CardFooter>
    </Card>
  );
}

export const MyBookHistoryItem = memo(MyBookHistoryItemComponent);
