export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  publications: `${API_BASE_URL}/publications/publications/`,
  projects: `${API_BASE_URL}/projects/`,
  distinctions: `${API_BASE_URL}/distinctions`,
  academic_career: `${API_BASE_URL}/academic-career`,
  subscriptions: `${API_BASE_URL}/subscriptions/`,
  adminSubscriptions: `${API_BASE_URL}/admin/subscriptions/`,  // ← NOUVEAU : pour l'admin
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  logout: `${API_BASE_URL}/auth/logout`,
  refresh: `${API_BASE_URL}/auth/refresh`,
  lang: (lang: string) => `${API_BASE_URL}/lang/${lang}`,
  health: `${API_BASE_URL}/health`,
  info: `${API_BASE_URL}/api/info`,
};

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('access_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(endpoint, { ...options, headers });
  
  if (response.status === 401) {
    localStorage.removeItem('access_token');
    window.location.href = '/auth/login';
    throw new Error('Session expirée');
  }
  
  return response;
}