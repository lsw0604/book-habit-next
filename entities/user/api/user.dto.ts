export interface UserDTO {
  id: number;
  email: string;
  profile: string | null;
  name: string;
  birthday: string | null;
  gender: string | null;
  provider: string;
}

export interface AccessDTO {
  user: UserDTO;
  isAuthenticated: boolean;
}

export interface RefreshDTO {
  accessToken: string;
}