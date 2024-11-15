import { MyBookHistoryRegistrationSchemaType } from '../schema/registration.schema';

export const defaultMyBookHistoryRegistrationValue: MyBookHistoryRegistrationSchemaType =
  {
    date: new Date(),
    memo: '',
    page: 1,
  };
