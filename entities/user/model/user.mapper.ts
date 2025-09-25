import { parseISO } from 'date-fns';

import { UserDTO } from '../api';

import { Gender, Provider } from './user.enum';
import type { User, SerializedUser } from './user.model';

const DEFAULT_USER_PROFILE = '/public/images/profile.webp';

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

/**
 * API로부터 받은 UserDTO(Raw Data)를 클라이언트에서 사용하기 위한 User(ViewModel)로 변환합니다.
 * DTO의 날짜 문자열을 Date 객체로 파싱하고, 성별, 프로필 등 추가적인 데이터를 처리합니다.
 * @param dto - 변환할 UserDTO 객체.
 * @returns 변환된 User(ViewModel) 객체.
 */
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

/**
 * User(ViewModel)을 Redux 스토어에 저장하기 위해 직렬화 가능한 객체(SerializedUser)로 변환합니다.
 * ViewModel의 Date 객체를 ISO 문자열로 변환합니다.
 * @param viewModel - 직렬화할 User(ViewModel) 객체.
 * @returns 직렬화된 User 객체.
 */
export const serializeUser = (viewModel: User): SerializedUser => ({
  id: viewModel.id,
  email: viewModel.email,
  gender: viewModel.gender,
  name: viewModel.name,
  profile: viewModel.profile,
  provider: viewModel.provider,
  birthday: viewModel.birthday ? viewModel.birthday.toISOString() : null,
});

/**
 * Redux 스토어에서 가져온 직렬화된 User 객체를 클라이언트에서 사용하기 위한 User(ViewModel)로 변환합니다.
 * 직렬화된 객체의 날짜 문자열을 Date 객체로 파싱합니다.
 * @param serializable - 역직렬화할 User 객체.
 * @returns 변환된 User(ViewModel) 객체.
 */
export const deserializeUser = (serializable: SerializedUser): User => ({
  id: serializable.id,
  email: serializable.email,
  name: serializable.name,
  profile: serializable.profile,
  gender: serializable.gender,
  provider: serializable.provider,
  birthday: serializable.birthday ? parseISO(serializable.birthday) : null,
});
