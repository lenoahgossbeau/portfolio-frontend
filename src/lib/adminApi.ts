import { API_BASE_URL, fetchWithAuth } from './api';

export interface User {
  id: number;
  email: string;
  role: string;
  status: string;
  profile?: {
    id: number;
    first_name: string;
    last_name: string;
    grade: string;
    specialite: string;
  };
}

export interface Subscription {
  id: number;
  profile_id: number;
  start_date: string;
  end_date: string;
  type: string;
  payment_method: string;
  amount?: number;
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/admin/users/`);
    if (!response.ok) return [];
    const data = await response.json();
    if (data.users && Array.isArray(data.users)) return data.users;
    if (Array.isArray(data)) return data;
    return [];
  } catch (error) {
    console.error('Exception fetchUsers:', error);
    return [];
  }
}

export async function fetchStats() {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/admin/stats`);
    if (!response.ok) return { totalUsers: 0, activeUsers: 0 };
    return response.json();
  } catch {
    return { totalUsers: 0, activeUsers: 0 };
  }
}

export async function fetchSubscriptions(): Promise<Subscription[]> {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/admin/subscriptions/`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Exception fetchSubscriptions:', error);
    return [];
  }
}

export async function createUser(userData: any) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
}

export async function deleteUser(userId: number): Promise<boolean> {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
    });
    return response.ok || response.status === 204;
  } catch (error) {
    console.error('Erreur deleteUser:', error);
    return false;
  }
}

export async function changeUserStatus(
  userId: number,
  active: boolean
): Promise<boolean> {
  try {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/admin/users/${userId}/status?active=${active}`,
      {
        method: 'PUT',
      }
    );

    if (!response.ok) {
      console.error('Erreur changeUserStatus:', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur changeUserStatus:', error);
    return false;
  }
}