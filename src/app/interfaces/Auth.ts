export interface User{
    id?: string | number;
    email: string;
    password: string;
    role: string;
}

export interface UserResponse {
    token: string;
    user: User;
  }