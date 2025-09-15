import { parseISO } from 'date-fns';

import { UserDTO } from '../api';
import { DEFAULT_USER_PROFILE } from '../constant';
import { Gender, Provider, User } from '../model';

const stringToGender = (genderStr: string | null): Gender => {
  if (genderStr && Object.values(Gender).includes(genderStr as Gender)) {
    return genderStr as Gender;
  }
  return Gender.UNKNOWN;
};

const stringToProvider = (providerStr: string) => {
  if (Object.values(Provider).includes(providerStr as Provider)) {
    return providerStr as Provider;
  }
  return Provider.UNKNOWN;
};

export const toUserViewModel = (dto: UserDTO): User => {
  const profile = dto.profile ? dto.profile : DEFAULT_USER_PROFILE;

  return {
    id: dto.id,
    email: dto.email,
    name: dto.name,
    profile,
    birthday: dto.birthday ? parseISO(dto.birthday) : null,
    gender: stringToGender(dto.gender),
    provider: stringToProvider(dto.provider),
  };
};
