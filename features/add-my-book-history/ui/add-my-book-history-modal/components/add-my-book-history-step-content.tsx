import type { AddMyBookHistoryStepId } from '../../../schema';

import { AddMyBookHistoryMemoCard } from './add-my-book-history-memo-card';
import { AddMyBookHistoryMoodCard } from './add-my-book-history-mood-card';
import { AddMyBookHistoryPageCard } from './add-my-book-history-page-card';
import { AddMyBookHistoryTimeCard } from './add-my-book-history-time-card';

interface AddMyBookHistoryStepContentProps {
  stepId: AddMyBookHistoryStepId;
  date: Date;
}

export function AddMyBookHistoryStepContent({
  stepId,
  date,
}: AddMyBookHistoryStepContentProps) {
  switch (stepId) {
    case 'time':
      return <AddMyBookHistoryTimeCard date={date} />;
    case 'page':
      return <AddMyBookHistoryPageCard />;
    case 'record':
      return (
        <div className="flex flex-col gap-y-4">
          <AddMyBookHistoryMoodCard />
          <AddMyBookHistoryMemoCard />
        </div>
      );
    default:
      return null;
  }
}
