/**
 * API client for backend communication
 * Uses fetch with automatic auth token injection
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function api<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

// Typed API methods
export const apiClient = {
  // Users
  getMe: (token: string) => api('/users/me', { token }),
  updateMe: (token: string, data: unknown) =>
    api('/users/me', { method: 'PATCH', token, body: JSON.stringify(data) }),

  // Competitors
  getCompetitors: (token: string, params?: URLSearchParams) =>
    api(`/competitors${params ? `?${params}` : ''}`, { token }),
  getCompetitor: (token: string, id: string) =>
    api(`/competitors/${id}`, { token }),
  createCompetitor: (token: string, data: unknown) =>
    api('/competitors', { method: 'POST', token, body: JSON.stringify(data) }),
  updateCompetitor: (token: string, id: string, data: unknown) =>
    api(`/competitors/${id}`, { method: 'PATCH', token, body: JSON.stringify(data) }),
  deleteCompetitor: (token: string, id: string) =>
    api(`/competitors/${id}`, { method: 'DELETE', token }),

  // Scans
  getScans: (token: string, params?: URLSearchParams) =>
    api(`/scans${params ? `?${params}` : ''}`, { token }),
  getScan: (token: string, id: string) =>
    api(`/scans/${id}`, { token }),
  createScan: (token: string, data: unknown) =>
    api('/scans', { method: 'POST', token, body: JSON.stringify(data) }),

  // Counter-attacks
  getCounterAttacks: (token: string, params?: URLSearchParams) =>
    api(`/counter-attacks${params ? `?${params}` : ''}`, { token }),
  getCounterAttack: (token: string, id: string) =>
    api(`/counter-attacks/${id}`, { token }),
  createCounterAttack: (token: string, data: unknown) =>
    api('/counter-attacks', { method: 'POST', token, body: JSON.stringify(data) }),
  approveCounterAttack: (token: string, id: string) =>
    api(`/counter-attacks/${id}/approve`, { method: 'PATCH', token }),
  cancelCounterAttack: (token: string, id: string) =>
    api(`/counter-attacks/${id}/cancel`, { method: 'PATCH', token }),
};
