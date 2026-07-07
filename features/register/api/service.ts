import { authClient } from "@/shared/api/clients";
import { API_ENDPOINTS } from "@/shared/api/constant";
import { RegisterType } from "../model";
import { RegisterDTO } from "./register.dto";

export interface RegisterService {
  register: (payload: Omit<RegisterType, 'checkPassword'>) => Promise<RegisterDTO>
}

export const registerService: RegisterService = {
  register: async (payload) => {
    const response = await authClient.post<RegisterDTO>(API_ENDPOINTS.AUTH.SIGNUP, payload)
    return response;
  }
}