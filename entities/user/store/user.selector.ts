import { UserState } from './user.slice';

export const userSelector = <T extends { auth: UserState }>(state: T) =>
  state.auth;
