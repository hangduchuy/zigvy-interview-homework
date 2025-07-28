export interface User {
    id: string;
    email: string;
    createdAt?: string;
    updatedAt?: string; 
  }
  
  export interface RegisterUserDto {
    email: string;
    password: string;
  }
  
  export interface LoginUserDto {
    email: string;
    password: string;
  }
 
  export interface AuthResponse {
    user: User;
    token: string;
  }