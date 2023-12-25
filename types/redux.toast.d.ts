type ToastType = {
  id: string;
  message: string;
  status: StatusType;
};

type RootToastType = {
  toast: ToastType[];
};
