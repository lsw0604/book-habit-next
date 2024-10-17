import { ko } from 'date-fns/locale';
import { parseISO, formatDistanceToNow } from 'date-fns';

export const getTimeDescription = (createdAt: string, updatedAt: string) => {
  const createdDate = parseISO(createdAt);
  const updatedDate = parseISO(updatedAt);

  if (createdDate.getTime() === updatedDate.getTime()) {
    return `생성됨 ${formatDistanceToNow(createdDate, {
      addSuffix: true,
      locale: ko,
    })}`;
  } else if (updatedDate.getTime() > createdDate.getTime()) {
    return `업데이트됨 ${formatDistanceToNow(updatedDate, {
      addSuffix: true,
      locale: ko,
    })}`;
  } else {
    return `생성됨 ${formatDistanceToNow(createdDate, {
      addSuffix: true,
      locale: ko,
    })}`;
  }
};
