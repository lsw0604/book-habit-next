import { format } from 'date-fns';
import { Pen } from 'lucide-react';

interface MyBookDateProps {
  createdAt: Date;
  updatedAt: Date;
}

export default function MyBookDate({ createdAt, updatedAt }: MyBookDateProps) {
  const createdAtTime = format(new Date(createdAt), 'yyyy-MM-dd');
  const updatedAtTime = format(new Date(updatedAt), 'yyyy-MM-dd');

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
