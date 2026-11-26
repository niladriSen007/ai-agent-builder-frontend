export interface LoginRequest {
  token: string;
}

export interface LoginResponse {
  userDetails: MyDetailsResponse;
  refreshToken: string;
}

export interface MyDetailsResponse {
  name: string;
  email: string;
  profilePicture: string;
  accessToken: string
}
