import type { AxiosRequestConfig } from "axios";
import { api } from "./api";
import axios from "axios";
import type { ApiResponse } from "./types";

function getApiErrorMessage(data: unknown) {
  if (typeof data !== "object" || data === null) {
    return undefined;
  }

  const response = data as Partial<ApiResponse<unknown>>;
  return typeof response.message === "string" && response.message.length > 0
    ? response.message
    : undefined;
}

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      getApiErrorMessage(error.response?.data) ||
      error.message ||
      "Request failed"
    );
  }

  if (error instanceof Error) {
    return error?.message;
  }

  return "Something Went Wrong";
}

export async function GET<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const response = await api.get<ApiResponse<T>>(url, config);

    if (
      response.data.success !== true ||
      ![200, 204].includes(response.status)
    ) {
      throw new Error(getApiErrorMessage(response.data) || "Request failed");
    }

    return response.data.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
}

export async function POST<TResponse, TRequest = unknown>(
  url: string,
  body: TRequest,
  config?: AxiosRequestConfig,
) {
  try {
    const response = await api.post<ApiResponse<TResponse>>(url, body, config);

    if (
      response.data.success !== true ||
      ![200, 201].includes(response.status)
    ) {
      throw new Error(getApiErrorMessage(response.data) || "Request failed");
    }
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
}

export async function PUT<TResponse, TRequest = unknown>(
  url: string,
  body?: TRequest,
  config?: AxiosRequestConfig,
) {
  try {
    const response = await api.put<ApiResponse<TResponse>>(url, body, config);

    if (
      response.data.success !== true ||
      ![200, 204].includes(response.status)
    ) {
      throw new Error(getApiErrorMessage(response.data) || "Request failed");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
}

export async function PATCH<TResponse, TRequest = unknown>(
  url: string,
  body?: TRequest,
  config?: AxiosRequestConfig,
) {
  try {
    const response = await api.patch<ApiResponse<TResponse>>(url, body, config);

    if (
      response.data.success !== true ||
      ![200, 204].includes(response.status)
    ) {
      throw new Error(getApiErrorMessage(response.data) || "Request failed");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
}

export async function DELETE<TResponse>(
  url: string,
  config?: AxiosRequestConfig,
) {
  try {
    const response = await api.delete<ApiResponse<TResponse>>(url, config);
    if (
      response.data.success !== true ||
      ![204].includes(response.status)
    ) {
      throw new Error(getApiErrorMessage(response.data) || "Request failed");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
}
