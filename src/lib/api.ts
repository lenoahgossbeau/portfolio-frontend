export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ===================== AUTH =====================
export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login échoué");
  return res.json();
}

export async function logout() {
  await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
}

// ===================== PROJECTS =====================
export async function getProjects() {
  const res = await fetch(`${API_BASE_URL}/api/projects/`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

// ===================== PUBLICATIONS =====================
export async function getPublications() {
  const res = await fetch(`${API_BASE_URL}/api/publications/`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

// ===================== PROFILE =====================
export async function getProfile(token: string) {
  const res = await fetch(`${API_BASE_URL}/profiles/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Profil introuvable");
  return res.json();
}

// ===================== ACADEMIC CAREER =====================
export async function getAcademicCareer() {
  const res = await fetch(`${API_BASE_URL}/api/academic-careers/`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

// ===================== DISTINCTIONS =====================
export async function getDistinctions() {
  const res = await fetch(`${API_BASE_URL}/api/distinctions/`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

// ===================== COURS =====================
export async function getCours() {
  const res = await fetch(`${API_BASE_URL}/api/cours/`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

// ===================== DASHBOARD ADMIN =====================
export async function getDashboardStats(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Dashboard inaccessible");
  return res.json();
}