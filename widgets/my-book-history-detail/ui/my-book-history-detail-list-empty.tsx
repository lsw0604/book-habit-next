import { ClipboardList } from 'lucide-react';

interface MyBookHistoryListEmptyProps {
  selectedDate: Date | null;
}

const MESSAGE_NOT_SELECTED_DATE = '해당 날짜에 등록된 기록이 없습니다.';
const MESSAGE_NOT_EXIST_HISTORY = '날짜를 선택해 주세요.';

export function MyBookHistoryDetailListEmpty({
  selectedDate,
}: MyBookHistoryListEmptyProps) {
  return (
    <div className="flex h-[248px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-8 text-center">
      <ClipboardList className="h-10 w-10 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">
        {selectedDate ? MESSAGE_NOT_SELECTED_DATE : MESSAGE_NOT_EXIST_HISTORY}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        하단의 &quot;독서 기록하기&quot; 버튼을 눌러 활동을 추가해 보세요.
      </p>
    </div>
  );
}
