import { authClient } from "@/shared/api/clients";
import { AccessDTO, RefreshDTO } from "./user.dto";
import { API_ENDPOINTS } from "@/shared/api/constant";

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
