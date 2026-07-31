import { UserState } from './user.slice';

export const userSelector = <T extends { user: UserState }>(state: T) =>
  state.user;
