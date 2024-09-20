import { apiClient } from '../api-client';

const AUTH_URL = '/api/auth';

export const loginAPI = async (payload: RequestLogin) => {
  const { data } = await apiClient.post<ResponseAuth>(
    `${AUTH_URL}/signin`,
    JSON.stringify(payload)
  );

  return data;
};

export const registerAPI = async (payload: RequestSignup) => {
  const { data } = await apiClient.post<ResponseAuth>(
    `${AUTH_URL}/signup`,
    JSON.stringify(payload)
  );

  return data;
};

export const logoutAPI = async () => {
  const { data } = await apiClient.get<ResponseLogout>(`${AUTH_URL}/logout`);
  return data;
};

export const refreshTokenAPI = async () => {
  const { data } = await apiClient.get<ResponseAuth>(`${AUTH_URL}/refresh`);
  return data;
};
