import { BACKEND_URL } from "@/config/env_variables";
import axios, { type InternalAxiosRequestConfig } from "axios";
import type { ApiResponse } from "./types";
import { useAuthStore } from "@/features/auth/store/auth.store";

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string> | null = null;

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function isAuthEndpoint(url: string | undefined) {
  return ["/auth/login", "/auth/signup", "/auth/refresh-token"].some(
    (endpoint) => url?.endsWith(endpoint),
  );
}

function hasAccessToken(payload: unknown): payload is { accessToken: string } {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "accessToken" in payload &&
    typeof payload.accessToken === "string" &&
    payload.accessToken.length > 0
  );
}

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = api
      .post<ApiResponse<unknown>>("/api/v1/auth/refresh-token", {})
      .then(({ data, status }) => {
        if (
          data.success !== true ||
          status !== 200 ||
          !hasAccessToken(data.data)
        ) {
          throw new Error("The refresh endpoint returned an invalid response.");
        }

        useAuthStore.getState().setAccessToken(data.data.accessToken);
        return data.data.accessToken;
      })
      .catch((error: unknown) => {
        useAuthStore.getState().logout();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

api.interceptors.request.use((config) => {
  if (isAuthEndpoint(config.url)) {
    return config;
  }

  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const config = error.config as RetriableRequestConfig | undefined;
    if (
      !config ||
      error.response?.status !== 401 ||
      config._retry ||
      isAuthEndpoint(config.url)
    ) {
      return Promise.reject(error);
    }

    config._retry = true;

    try {
      const accessToken = await refreshAccessToken();
      config.headers.set("Authorization", `Bearer ${accessToken}`);
      return await api.request(config);
    } catch (refreshError: unknown) {
      return Promise.reject(refreshError);
    }
  },
);