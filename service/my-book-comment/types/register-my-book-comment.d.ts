type RequestRegisterMyBookComment = {
  myBookId: number;
  comment: string;
  isPublic: boolean;
};

type ResponseRegisterMyBookComment = {
  id: number;
  myBookId: number;
  comment: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};
