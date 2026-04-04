import { User } from "@/lib/auth-client";

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  country?: string;
  image?: string;
}

export interface UpdateProfileResponse {
  user: User;
}

export interface OnboardingCompleteResponse {
  success: boolean;
  user: User;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}
