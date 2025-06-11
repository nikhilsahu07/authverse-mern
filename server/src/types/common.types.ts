export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface DatabaseConfig {
  uri: string;
  options?: Record<string, unknown>;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface EmailConfig {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface Tokens {
  accessToken: TokenData;
  refreshToken: TokenData;
}
