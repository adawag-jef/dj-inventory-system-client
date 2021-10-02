export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
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
