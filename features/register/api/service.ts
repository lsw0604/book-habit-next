import { API_ENDPOINTS, authClient } from "@/shared/api";
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