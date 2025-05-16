import { MyBookStatus } from '@/entities/my-book/model';

export const useStatusController = () => {
  const statusOptions = [
    { value: MyBookStatus.ALL, label: '전체보기' },
    { value: MyBookStatus.WANT_TO_READ, label: '읽기전' },
    { value: MyBookStatus.CURRENTLY_READING, label: '읽는중' },
    { value: MyBookStatus.READ, label: '다읽음' },
  ];

  const getStatusLabel = (value: string) => {
    return statusOptions.find(option => option.value === value)?.label || value;
  };

  return {
    statusOptions,
    getStatusLabel,
  };
};
