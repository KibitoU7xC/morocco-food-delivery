/**
 * API Client Configuration
 * Handles requests to the Laravel backend API with Bearer token authentication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

interface RequestOptions extends RequestInit {
  data?: unknown;
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { data, headers: customHeaders, ...customOptions } = options;

  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('auth_token');
  }

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(data instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(customHeaders as Record<string, string> || {}),
  };

  const config: RequestInit = {
    ...customOptions,
    headers,
    ...(data ? { body: data instanceof FormData ? data : JSON.stringify(data) } : {}),
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `Request failed with status ${response.status}` };
      }
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    return await response.json() as T;
  } catch (error) {
    // Re-throw so caller can handle or trigger simulation fallback
    throw error;
  }
}
