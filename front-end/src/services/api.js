// src/services/api.js
export async function apiFetch(path, options = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"; // ex.: http://localhost:4000
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

// Função específica para buscar dados de uma hortaliça
export async function getVegetableData(vegetableId) {
  try {
    const response = await apiFetch(`/hortalicas/${vegetableId}`);
    return response.hortalica;
  } catch (error) {
    console.error('Erro ao buscar dados da hortaliça:', error);
    throw error;
  }
}

// Função para buscar dados de sensores específicos de uma hortaliça
export async function getVegetableSensorData(vegetableId) {
  try {
    const { reading } = await apiFetch(`/api/sensores/latest?vegetableId=${vegetableId}`);
    if (!reading) return null;
    return {
      temperatura: reading.temperatura,
      umidade: reading.umidade,
      luminosidade: reading.luminosidade,
      nutrientes: reading.nutrientes,
      nivel_agua: reading.nivel_agua, // opcional se combinar com WaterLevel
      createdAt: reading.createdAt
    };
  } catch (error) {
    console.error('Erro ao buscar dados dos sensores:', error);
    throw error;
  }
}

// Função para buscar histórico de crescimento de uma hortaliça
export async function getVegetableGrowthHistory(vegetableId) {
  try {
    const { history } = await apiFetch(`/api/sensores/history?vegetableId=${vegetableId}&limit=7`);
    return history;
  } catch (error) {
    console.error('Erro ao buscar histórico de crescimento:', error);
    throw error;
  }
}