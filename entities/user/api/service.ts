import { API_ENDPOINTS, authClient } from "@/shared/api";

import type { AccessDTO } from "./user.dto";

export interface UserService {
  access: () => Promise<AccessDTO>;
  refresh: () => Promise<void>;
}

export const userService: UserService = {
  access: async (): Promise<AccessDTO> => {
    const response = await authClient.get<AccessDTO>(API_ENDPOINTS.AUTH.ACCESS)
    return response;
  },
  refresh: async (): Promise<void> => {
    await authClient.post<void>(API_ENDPOINTS.AUTH.REFRESH)
  }
};
