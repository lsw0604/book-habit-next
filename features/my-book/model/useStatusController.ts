export const useStatusController = () => {
  const statusOptions = [
    { value: 'ALL', label: '전체보기' },
    { value: 'WANT_TO_READ', label: '읽기전' },
    { value: 'CURRENTLY_READING', label: '읽는중' },
    { value: 'READ', label: '다읽음' },
  ];

  const getStatusLabel = (value: string) => {
    return statusOptions.find(option => option.value === value)?.label || value;
  };

  return {
    statusOptions,
    getStatusLabel,
  };
};
