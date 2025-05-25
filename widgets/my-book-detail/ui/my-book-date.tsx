import dayjs from 'dayjs';
import { Pen } from 'lucide-react';

interface MyBookDateProps {
  createdAt: Date;
  updatedAt: Date;
}

export default function MyBookDate({ createdAt, updatedAt }: MyBookDateProps) {
  const createdAtTime = dayjs(createdAt).format('YYYY-MM-DD');
  const updatedAtTime = dayjs(updatedAt).format('YYYY-MM-DD');

  const isTime = createdAt === updatedAt;

  return (
    <div className="flex justify-between mt-4">
      <div className="ml-auto mr-2 text-xs text-muted-foreground flex items-center gap-1">
        <Pen className="w-4 h-4 text-muted-foreground" />
        {isTime ? (
          <span>생성됨 {createdAtTime}</span>
        ) : (
          <span>수정됨 {updatedAtTime}</span>
        )}
      </div>
    </div>
  );
}
