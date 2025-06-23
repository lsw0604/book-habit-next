export interface UserDTO {
  id: number;
  email: string;
  profile: string;
  name: string;
  birthday: string | null;
  gender: string | null;
  provider: string;
}
