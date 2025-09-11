// types/user.ts


export interface User {
  id: string;
  email: string;
  username?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}