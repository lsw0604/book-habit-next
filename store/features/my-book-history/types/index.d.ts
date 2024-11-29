type ReduxMyBookHistoryType = {
  selectedDate?: string;
  selectedHistory?: MyBookHistoryItemType[];
};

type ReduxCreateHistoryType = {
  date: string;
  page: number;
  memo: string;
};
