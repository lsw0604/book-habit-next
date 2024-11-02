import { MyBookRegistrationSchemaType } from '../schema/registration.schema';

export const defaultMyBookRegistrationValue: MyBookRegistrationSchemaType = {
  title: '',
  contents: '',
  url: '',
  isbn: [],
  datetime: '',
  authors: [],
  publisher: '',
  translators: [],
  price: 0,
  sale_price: 0,
  thumbnail: '',
  status: '',
};
