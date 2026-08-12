import { parseISO } from 'date-fns';

import { UserDTO } from '../api';
import { User } from '../model';

import { formatGender, formatProfile, formatProvider } from './user.formatter';

/**
 * API로부터 받은 UserDTO(Raw Data)를 클라이언트에서 사용하기 위한 User(ViewModel)로 변환합니다.
 * DTO의 날짜 문자열을 Date 객체로 파싱하고, 성별, 프로필 등 추가적인 데이터를 처리합니다.
 * @param dto - 변환할 UserDTO 객체.
 * @returns 변환된 User(ViewModel) 객체.
 */
export const toUserViewModel = (dto: UserDTO): User => {
  const { profile, birthday, gender, provider, ...rest } = dto;
  const formattedProfile = formatProfile(profile);
  const formattedGender = formatGender(gender);
  const formattedProvider = formatProvider(provider);

  return {
    ...rest,
    profile: formattedProfile,
    birthday: birthday ? parseISO(birthday) : null,
    gender: formattedGender,
    provider: formattedProvider,
  };
};
