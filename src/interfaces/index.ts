export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface SetNewPasswordPayload {
  password: string;
  token: string;
  uidb64: string;
}
export interface IRequestResetPasswordPayload {
  email: string;
}

export interface LoginResponse {
  email: string;
  username: string;
  tokens: TokenResponse;
}

export interface TokenResponse {
  access?: string;
  refresh?: string;
}

export interface IPermission {
  id: number;
  title: string;
  description: string;
  create_at: Date;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
}

export interface Response<T> {
  page: number;
  size_per_page: number;
  total_pages: number;
  total: number;
  results: T[];
}

export interface VerifyUserPayload {
  token: string;
}

export interface ResponseError {
  [key: string]: any;
}

export interface IRole {
  id?: number;
  title: string;
  description: string;
  permissions: IPermission[];
}

export interface PermissionPayload {
  id?: number;
  title: string;
  description: string;
}
