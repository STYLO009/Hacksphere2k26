export const getToken = (): string | null => localStorage.getItem('nyaya_token');
export const setToken = (t: string): void => localStorage.setItem('nyaya_token', t);
export const clearToken = (): void => localStorage.removeItem('nyaya_token');

export const getUser = (): { name: string; email: string } | null => {
  const raw = localStorage.getItem('nyaya_user');
  return raw ? JSON.parse(raw) : null;
};
export const setUser = (u: { name: string; email: string }): void =>
  localStorage.setItem('nyaya_user', JSON.stringify(u));
export const clearUser = (): void => localStorage.removeItem('nyaya_user');

function authHeaders(): Record<string, string> {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...authHeaders(),
      ...(options.headers ?? {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? data.error ?? 'Request failed');
  return data;
}
