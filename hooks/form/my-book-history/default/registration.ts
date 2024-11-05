import dayjs from 'dayjs';
import { MyBookHistoryRegistrationSchemaType } from '../schema/registration.schema';

export const defaultMyBookHistoryRegistrationValue: MyBookHistoryRegistrationSchemaType =
  {
    date: dayjs().toDate(),
    memo: '',
    page: 1,
  };
