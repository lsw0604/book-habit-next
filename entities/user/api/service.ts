import { API_ENDPOINTS, authClient } from "@/shared/api";

import type { AccessDTO, RefreshDTO } from "./user.dto";

export interface UserService {
  access: () => Promise<AccessDTO>;
  refresh: () => Promise<RefreshDTO>;
}

export const userService: UserService = {
  access: async (): Promise<AccessDTO> => {
    const response = await authClient.get<AccessDTO>(API_ENDPOINTS.AUTH.ACCESS)
    return response;
  },
  refresh: async (): Promise<RefreshDTO> => {
    const response = await authClient.post<RefreshDTO>(API_ENDPOINTS.AUTH.REFRESH)
    return response;
  }
};
