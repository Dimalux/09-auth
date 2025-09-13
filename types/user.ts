// types/user.ts


export interface User {
  email: string;
  username: string;
  avatar: string;
}


export interface SignUpData {
  email: string;
  password: string;
  username: string; 
}



export interface SignInData {
  email: string;
  password: string;
}