import { UserDTO } from "@/entities/user";

export interface RegisterDTO {
  user: UserDTO;
  accessToken: string;  
}

