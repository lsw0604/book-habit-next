type ReduxMyBookHistoryType = {
  selectedHistory?: MyBookHistoryItemType;
  createHistory?: ReduxCreateHistoryType;
};

type ReduxCreateHistoryType = {
  date: Date;
  page: number;
  memo?: string;
};
