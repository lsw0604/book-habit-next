import { RegisterSchemaType } from '../schema/register.schema';

export const defaultRegisterValue: RegisterSchemaType = {
  email: '',
  password: '',
  name: '',
  gender: 'MALE',
  birthday: undefined,
  checkPassword: '',
};
