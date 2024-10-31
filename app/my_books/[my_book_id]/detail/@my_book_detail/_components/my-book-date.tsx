import Dayjs from 'dayjs';
import { SquarePenIcon } from 'lucide-react';

interface MyBookDateProps {
  createdAt: string;
  updatedAt: string;
}

export default function MyBookDate({ createdAt, updatedAt }: MyBookDateProps) {
  const createdAtTime = Dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss');
  const updatedAtTime = Dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss');
  const isTime = createdAt === updatedAt;

  return (
    <div className="flex justify-between mt-4 px-2">
      <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
        <SquarePenIcon className="w-4 h-4 text-muted-foreground" />
        {isTime ? (
          <span>생성됨 {createdAtTime}</span>
        ) : (
          <span>수정됨 {updatedAtTime}</span>
        )}
      </div>
    </div>
  );
}
