'use client';

import { useCallback, MouseEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { XIcon } from 'lucide-react';

import { queriesKey, queryClient } from '@/queries';
import { myBookHistoryDeleteAPI } from '@/lib/api/myBook';

interface MyBookDetailHistoryItemXButtonProps {
  historyId: number;
  myBookId: number;
}

const { useMyBookHistoryDeleteMutationKey, useMyBookPageQueriesKey } =
  queriesKey.myBook;
const { history } = useMyBookPageQueriesKey;

export default function MyBookDetailHistoryItemXButton({
  historyId,
  myBookId,
}: MyBookDetailHistoryItemXButtonProps) {
  const { mutate } = useMutation<
    MyBookHistoryDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookHistoryDeleteMutationRequestType
  >(
    [
      useMyBookHistoryDeleteMutationKey,
      historyId.toString(),
      myBookId.toString(),
    ],
    myBookHistoryDeleteAPI,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [history, myBookId.toString()],
        });
      },
    }
  );

  const deleteHistoryHandler = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    mutate(historyId);
  }, []);

  return (
    <div className="w-8 h-auto flex justify-center items-center">
      <i className="w-8 h-4 flex justify-center items-center">
        <XIcon onClick={(e) => deleteHistoryHandler(e)} />
      </i>
    </div>
  );
}
