import { GET, POST } from "@/lib/apiMethods";
import type { LoginRequest, LoginResponse, MyDetailsResponse } from "../types";

const API_PREFIX = "/api/v1"

export const loginMutation = async (
  loginData: LoginRequest,
): Promise<LoginResponse> => {
  const loginResponse = await POST<LoginResponse, LoginRequest>(
    `${API_PREFIX}/auth/login`,
    loginData,
  );

  if (!loginResponse?.userDetails || !loginResponse.refreshToken) {
    throw new Error("Login response did not include a user and access token.");
  }

  return loginResponse;
};

export const getMyDetails = async (): Promise<MyDetailsResponse> => {
  const response: MyDetailsResponse = await GET<MyDetailsResponse>(
   `${API_PREFIX}/auth/myDetails`,
    {},
  ) as MyDetailsResponse;

  if (!response?.accessToken) {
    throw new Error("Refresh response did not include an access token.");
  }
  

  return response;
};