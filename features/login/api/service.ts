import { LoginDTO } from "./login.dto";
import { authClient } from "@/shared/api/clients";
import { API_ENDPOINTS } from "@/shared/api/constant";
import { LoginType } from "../model";

export interface LoginService {
  login: (payload: LoginType) => Promise<LoginDTO>;
  kakao: (code: string) => Promise<LoginDTO>;
}

export const loginService: LoginService = {
  login: async (payload: LoginType): Promise<LoginDTO> => {
      const response: LoginDTO = await authClient.post<LoginDTO>(
        API_ENDPOINTS.AUTH.SIGNIN,
        payload
      );
      return response;
    },
    kakao: async (code: string): Promise<LoginDTO> => {
      const response: LoginDTO = await authClient.get<LoginDTO>(
        `${API_ENDPOINTS.AUTH.KAKAO}?code=${code}`
      );
      return response;
    },
}
