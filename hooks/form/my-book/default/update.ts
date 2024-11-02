import { MyBookUpdateSchemaType } from '../schema/update.schema';

export const defaultMyBookUpdateValue: MyBookUpdateSchemaType = {
  rating: undefined,
  myBookStatus: undefined as MyBookStatusType | undefined,
};
