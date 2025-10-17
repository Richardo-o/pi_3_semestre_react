// src/services/api.js
export async function apiFetch(path, options = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL; // ex.: http://localhost:4000
  // pegue o token do localStorage (ou use um token fixo em env pública se quiser)
  const lsToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const envToken = process.env.NEXT_PUBLIC_STATIC_TOKEN; // opcional
  const token = lsToken || envToken;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const resp = await fetch(`${base}${path}`, { ...options, headers });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data?.error || `Erro ${resp.status}`);
  return data;
}
