export interface objInput {
  value: string;
  type: string;
}

export interface User {
  name?: string;
  email: string;
  password: string;
  [key: string]: string | undefined;
}
