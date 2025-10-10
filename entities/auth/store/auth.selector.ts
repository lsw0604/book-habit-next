import { SerializedAuth } from '../model';

export const authSelector = <T extends { auth: SerializedAuth }>(state: T) =>
  state.auth;
