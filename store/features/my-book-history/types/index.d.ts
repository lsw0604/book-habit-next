type ReduxMyBookHistoryType = {
  selectedHistory?: MyBookHistoryItemType[];
  createHistory?: ReduxCreateHistoryType;
};

type ReduxCreateHistoryType = {
  date: string;
  page: number;
  memo: string;
};
