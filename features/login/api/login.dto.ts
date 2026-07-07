import { UserDTO } from "@/entities/user";

export interface LoginDTO {
  user: UserDTO;
  accessToken: string;
}