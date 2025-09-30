import {
  deserializeUser,
  serializeUser,
  toUserViewModel,
} from '@/entities/user';

import type { AuthDTO } from '../api';

import { Auth, SerializedAuth } from './auth.model';

export const toAuthViewModel = (dto: AuthDTO): Auth => ({
  user: dto.user ? toUserViewModel(dto.user) : null,
  isAuthenticated: dto.isAuthenticated,
});

export const serializeAuth = (viewModel: Auth): SerializedAuth => ({
  user: viewModel.user ? serializeUser(viewModel.user) : null,
  isAuthenticated: viewModel.isAuthenticated,
});

export const deserializeAuth = (serializable: SerializedAuth): Auth => ({
  user: serializable.user ? deserializeUser(serializable.user) : null,
  isAuthenticated: serializable.isAuthenticated,
});
