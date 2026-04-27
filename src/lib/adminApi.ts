import { API_BASE_URL, fetchWithAuth } from './api';

export interface User {
  id: number;
  email: string;
  role: string;
  status: string;
  profile?: {
    first_name: string;
    last_name: string;
    grade: string;
    specialite: string;
  };
}

export interface Subscription {
  id: number;
  username: string;
  email: string;
  amount: number;
  startedAt: string;
  nextBillingDate: string;
  status: string;
}

// Récupérer tous les utilisateurs
export async function fetchUsers(): Promise<User[]> {
  const response = await fetchWithAuth(`${API_BASE_URL}/users/users/`);
  return response.json();
}

// Récupérer les statistiques
export async function fetchStats() {
  const response = await fetchWithAuth(`${API_BASE_URL}/admin/stats`);
  return response.json();
}

// Récupérer les abonnements (si existants)
export async function fetchSubscriptions(): Promise<Subscription[]> {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/admin/subscriptions`);
    return response.json();
  } catch {
    // Si la route n'existe pas, retourne les données mockées
    return [];
  }
}

// Créer un utilisateur
export async function createUser(userData: any) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
}