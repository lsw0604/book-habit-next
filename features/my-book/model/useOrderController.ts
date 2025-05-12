export const useOrderController = () => {
  const orderOptions = [
    { value: 'asc', label: '오름차순' },
    { value: 'desc', label: '내림차순' },
  ];

  const getOrderLabel = (value: string) => {
    return orderOptions.find(option => option.value === value)?.label || value;
  };

  return {
    orderOptions,
    getOrderLabel,
  };
};
