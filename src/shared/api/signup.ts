export const API_BASE_URL = 'http://19429ba06ff2.vps.myjino.ru/api';

export type SignupCredentials = {
  email: string;
  password: string;
};

type ErrorResponse = {
  message?: string;
  error?: string;
  errors?: Array<{ message?: string; msg?: string }> | { email?: string | string[] };
};

export const getSignupErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    return getSignupErrorMessage((error as { data: unknown }).data);
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && error !== null) {
    const response = error as ErrorResponse;
    if (Array.isArray(response.errors)) {
      return response.errors[0]?.msg ?? response.errors[0]?.message ?? response.message ?? response.error ?? 'Unable to sign up';
    }

    const emailError = response.errors?.email;
    if (emailError) {
      return Array.isArray(emailError) ? emailError[0] : emailError;
    }

    return response.message ?? response.error ?? 'Unable to sign up';
  }

  return 'Unable to sign up';
};

export const signup = async (credentials: SignupCredentials): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).catch(() => {
    throw new Error('Unable to connect to the server. Please try again later.');
  });

  if (response.ok) {
    return;
  }

  const error = await response.json().catch(() => null);
  throw new Error(getSignupErrorMessage(error));
};
